import React, { useCallback, useEffect, useState, useRef, memo } from 'react'
import Lenis from '@studio-freight/lenis'; // Импортируем Lenis благодаря importmap
import { createObserver } from './observer';
import { Preloader } from './preloader';
import { src,collectMedia } from './createMedia';


const Child = function () {

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
}


function App() {

  console.log('render')

  const mediaRefs = useRef([])

  let [isContent, setIsContent] = useState('hide_content')

  const addRef = useCallback((element) => {
    if (!mediaRefs.current.includes(element)) {
      mediaRefs.current.push(element)
    }
  }, [])


  let elements = collectMedia(src,addRef)
  console.log(elements[0])

  
  // src.flatMap((tags, indexOutter) => {
  //   console.log(tags)

  //   return tags.map((element, indexInner) => {
  //     if (indexOutter == 0) {

  //       let imgElement = <img
  //         src={element}
  //         alt='img'
  //         key={'img' + indexInner}
  //         ref={addRef}></img>
  //       return imgElement
  //     } else {
  //       let videoElement = <video src={element}
  //         key={'video' + indexInner}
  //         ref={addRef}></video>
  //       return videoElement
  //     }
  //   })

  // })



  useEffect(() => {

    console.log(mediaRefs.current[0])

    const lenis = new Lenis({
      duration: 2,
      smooth: true,
    });

    // lenis.on('scroll', event => {
    //     console.log(Math.floor(event.scroll))
    // })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])


  return (
    <div className="App" data-lenis>
      <Preloader contentState={setIsContent}
       refs={mediaRefs}></Preloader>
      <div className={`content ${isContent}`}>
        <Child></Child>
        {elements}
      </div>
    </div>
  );
}

export default App;
