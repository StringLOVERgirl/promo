import React, { useCallback, useEffect, useState, useRef, memo, use } from 'react'
import Lenis from '@studio-freight/lenis'; // Импортируем Lenis благодаря importmap
import { createObserver } from './observer';
import { Preloader } from './preloader';
import { src,collectMedia } from './createMedia';
import { Runningline } from './running_line';
import { Canvas } from './canvas_circles';


const Child = memo(function () {

  let [isActive, setIsActive] = useState({ img: 'hidden', video: 'hidden' })
  console.log(isActive)

  const bgRef = useRef()

  useEffect(() => {

    const observer = createObserver(() =>
      setIsActive(prevState => ({ ...prevState, img: '' }))
    )

    observer.observe(bgRef.current)

  }, [])

  console.log('render child')

  return (<>
    <div className={`bg ${isActive.img}`} ref={bgRef}></div>
  </>)
})


function App() {

  console.log('App is on render')

  const appRef = useRef(null)

  const mediaRefs = useRef([])

  let [isContent, setIsContent] = useState('hide_content')

  let [isPreloader,setIsPreloader] = useState('')


  const addRef = (element) => {
    if (!mediaRefs.current.includes(element)) {
      mediaRefs.current.push(element)
    }
  }  // обернули т к это реф при каждом рендере будет пересоздаваться 
  // значит рефы потеряют ссылку

  const totalCount = useRef()
  const loadedMedia = useRef(0)
  let [precentage, setprecentage] = useState(0)

  const updateprecentage = useCallback(async ()=>{
// колбек нужен в купе с состоянием или прпосами которые могут измениться 
// и что бы то к чему прявязан эт а функция получило доступ 
// к функции с реальынм состоянми данными
    loadedMedia.current+=1
    let delay = loadedMedia.current
    await new Promise((resolve)=>setTimeout(resolve,delay*100))

    console.log(loadedMedia.current + 'is current' ,typeof loadedMedia.current)
    console.log('no await')
    let newpercent = Math.floor(delay/totalCount.current * 100)
    console.log('new percent '+newpercent)
    if (newpercent >= 100){
      setprecentage(99)
      setTimeout(()=>{
        setIsContent('')
        setIsPreloader('hide_preloader')
      },100)
      return
    }

    setprecentage(newpercent)

  },[]) // в колбеке потому при рендере чтобы не пресоздавался 
  // и хуй знает еще почему чтобы не разрывалась ссылка может быть тк 
  // это ставится на онлоад элементам 
  // все что ставится функциональное в реф или обработчики соыбтий - должно 
  // быть обернуто в юс колбек

  let elements = collectMedia(src,addRef,updateprecentage)
  console.log(elements[0])

  // totalCount.current = elements.length 

const lenisRef = useRef(new Lenis({
  duration: 2,
  smooth: true,
}))

  useEffect(() => {
    totalCount.current = elements.length 
    // чобы не пересоздаваось каждый раз 


    console.log(mediaRefs.current[0])

    // lenisRef.current = new Lenis({
    //   duration: 2,
    //   smooth: true,
    // });

    // lenis.on('scroll', event => {
    //   if (!animationFlagRef.current){
    //     animationFlagRef.current = true
    //   }
    // })

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])

  useEffect(()=>{
    mediaRefs.current.forEach(el => {
      if (el.tagName === 'IMG') {
        if (el.complete && el.dataset.processed !== 'true') { 
// вторая проверка нужна на случай если онлоад сработает первый и не вызвалос
// дважды
          el.dataset.processed = 'true';
          updateprecentage();
        }
      } else if (el.tagName === 'VIDEO') {
        if (el.readyState >= 4 && el.dataset.processed !== 'true') {
          el.dataset.processed = 'true';
          updateprecentage();
        }
      }
    });
  },[])


  return (
    <div className="App" data-lenis
    ref={appRef}>
      <Preloader displayloader={isPreloader}
      precent={precentage}
       refs={mediaRefs}></Preloader>
        <div className={`content ${isContent}`}>
        <Runningline lenis={lenisRef}></Runningline>
        <Child></Child>
        <Canvas lenis={lenisRef} parentRef={appRef}></Canvas>
        {elements}
      </div>
    </div>
  );
}

export default App;
