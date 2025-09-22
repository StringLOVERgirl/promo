import React, { useCallback, useEffect, useState, useRef} from 'react'
import Lenis from '@studio-freight/lenis'; // Импортируем Lenis благодаря importmap
import { createObserver } from './observer';
import { Preloader } from './preloader';
import { src,collectMedia } from './js/createMedia';
import { Runningline } from './components/running_line';
import { Refs } from './components/refs'
import m83 from './assets/M83 - By The Kiss.mp3'
import video from './assets/0_Sun_Egg_3840x2160 (online-video-cutter.com) (1).mp4'
import br2049 from'./assets/2049.mp3'
import toALPD from './assets/Flight to LAPD.mp3'
import { Header } from './components/header';
import {Menu} from './components/menu'
import { Footer } from './components/footer';





function App() {

  // console.log('App is on render')

  const appRef = useRef(null)

  const mediaRefs = useRef([])

  let [isContent, setIsContent] = useState('hide_content')

  let [isPreloader,setIsPreloader] = useState('')


  const addRef = useCallback((element) => {
    if (!mediaRefs.current.includes(element)) {
      mediaRefs.current.push(element)
    }
  } ,[]) // обернули т к это реф при каждом рендере будет пересоздаваться 
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
    await new Promise((resolve) => setTimeout(resolve,delay*100))
    // console.log(loadedMedia.current + 'is current' ,typeof loadedMedia.current)
    // console.log('no await')
    let newpercent = Math.floor(delay/totalCount.current * 100)
    if (newpercent >= 100){
      setprecentage(99)
      setTimeout(() => {
        setIsContent('')
        setIsPreloader('hide_preloader')
      },100)
      return
    }

    setprecentage(newpercent)

  },[]) 
  
  let elements = collectMedia(src,addRef,updateprecentage)

  totalCount.current = elements.length 

const lenisRef = useRef(new Lenis({
  duration: 2,
  smooth: true,
}))

  useEffect(() => {
    totalCount.current = elements.length 
    // чобы не пересоздаваось каждый раз 

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])






    if (mediaRefs.current) {
    
    mediaRefs.current.forEach(el => {

      if (el.tagName === 'IMG') {
        if (el.complete && el.dataset.processed !== 'true') { 
// // вторая проверка нужна на случай если онлоад сработает первый и не вызвалос
// // дважды
          el.dataset.processed = 'true';
          updateprecentage();
        }}

    });

  }
  

const cp_pointRef = useRef(null)

let [menu, setMenu] = useState('hidemenu')

let [link,setLink] = useState('hidelink')


  return (
    <div className="App" data-lenis
    ref={appRef}>

      <Preloader displayloader={isPreloader}
       precent={precentage}
       refs={mediaRefs}></Preloader>
<Menu menu={menu} setMenu={setMenu} setLink={setLink} link={link}></Menu>
          <Header setMenu={setMenu} setLink={setLink}></Header>

           <div className="cp_point"
     ref={cp_pointRef}></div>

        <main className={`content ${isContent}`}>

          <Runningline lenis={lenisRef}
          cppoint={cp_pointRef}          
           >

           </Runningline>

        {elements}
        
        <Refs lenis={lenisRef}></Refs>

       
      </main>

     <Footer></Footer>

    </div>
  );
}

export default App;
