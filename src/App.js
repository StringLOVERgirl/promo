import React, { useCallback, useEffect, useState, useRef, memo, use } from 'react'
import Lenis from '@studio-freight/lenis'; // Импортируем Lenis благодаря importmap
import { createObserver } from './observer';
import { Preloader } from './preloader';
import { src,collectMedia } from './createMedia';
import { Runningline } from './running_line';
import { Canvas } from './canvas_circles';
import { Refs } from './refs'
import label from './assets/laberl_audio.jpeg'
import m83 from './assets/M83 - By The Kiss.mp3'
import video from './assets/0_Sun_Egg_3840x2160 (online-video-cutter.com) (1).mp4'
import revenant from './assets/Ryuichi_Sakamoto_-_The_Revenant_Main_Theme_(SkySound.cc).mp3'
import br2049 from'./assets/2049.mp3'
import toALPD from './assets/Flight to LAPD.mp3'
import { Header } from './header';


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

let [browser,setBrowser] = useState(null)
let [isPlaying, setIsPlaying] = useState(false)
// const m83Ref = useRef(null)
// const revenantRef = useRef(null)
const tracksRef = useRef({m83:null, 
})

const currentTrackRef = useRef('void')
const prevTrackRef = useRef(null)

const newTrack = () =>{
  currentTrackRef.current = null
}

const play = () => {

  const entry = Object.entries(tracksRef.current)

  if (currentTrackRef.current == 'void' || !currentTrackRef.current ){
    let track_ndex = Math.floor(Math.random() * (entry.length-1 - 0 + 1)) + 0
    currentTrackRef.current = entry[track_ndex][1]
    console.log(111)
    }

      if (!isPlaying){
        console.log(currentTrackRef.current)
        currentTrackRef.current.play()
        setIsPlaying(!isPlaying)
      } else {
        currentTrackRef.current.pause()
        setIsPlaying(!isPlaying)
      }
}

const videoRef = useRef(null)
const selectRef = useRef(
  {
    first:null,
    middle:null,
    last:null
  }
  )
  const distanceRef = useRef({
    first:null,
    middle:null,
    last:null
  })

  const acontRef = useRef(null)


  function select(event){
    console.log(event.clientX, selectRef.current.first, selectRef.current )
    if (event.clientX < distanceRef.current.middle){
      console.log(1111)
      selectRef.current.first.classList.add('right','center')
      selectRef.current.middle.classList.remove('center','left')
      selectRef.current.middle.classList.add('right')
      selectRef.current.last.classList.add('right')
    } 
    if (event.clientX < distanceRef.current.last
      && event.clientX > distanceRef.current.middle){    
        console.log(22222)    
        selectRef.current.first.classList.remove('center','left','right')
        selectRef.current.middle.classList.remove('right','left')
      selectRef.current.middle.classList.add('center')
      selectRef.current.last.classList.remove('left','center','right')
    } 
    if (event.clientX > distanceRef.current.last){
      console.log(3333)
      selectRef.current.first.classList.add('left')
      selectRef.current.middle.classList.remove('right','center')
      selectRef.current.middle.classList.add('left')
      selectRef.current.last.classList.add('center','left')

    } 
    
    }

    const unmove = () => {
      for (let key in selectRef.current){
          console.log(selectRef.current[key])
          selectRef.current[key].classList.remove('left')
          selectRef.current[key].classList.remove('right')
          selectRef.current[key].classList.remove('center')
    }}

    
  useEffect(()=>{
    
    function setDistanceSelect(el){
      let rec = selectRef.current[el].getBoundingClientRect(selectRef.current[el])
      let distance = Math.floor(rec.left)
      console.log(distance)
      distanceRef.current[el] = distance 
    console.log('distance to ' +el +' is' +distance)
    }

for (let key in selectRef.current){
setDistanceSelect(key)
}

console.log(selectRef.current)



    // videoRef.current.playbackRate = 0.9

    if (navigator.userAgent.includes("Firefox")) {
      setBrowser('Firefox')
    }

    if (mediaRefs.current) {
    
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

  }
  },[])

const cp_pointRef = useRef(null)
const decorRef = useRef('')

const transs = useRef(null)
  return (
    <div className="App" data-lenis
    ref={appRef}>
      <Preloader displayloader={isPreloader}
      precent={precentage}
       refs={mediaRefs}></Preloader>


          <Header >

           </Header>
           <div className="cp_point"
     ref={cp_pointRef}></div>

{/* <div className="decor_cont" ref={decorRef}>
  <div className="decor_inner">
    <span className="decor_text">Promo</span>
  </div>
  
  <div className="decor_inner">
    <span className="decor_text">Work</span>
  </div>
</div> */}






        <div className={`content ${isContent}`}>


          <Runningline lenis={lenisRef}
          cppoint={cp_pointRef}
          decor={decorRef}
          trans={transs}
           >

           </Runningline>
        {/* <Child></Child> */}
        {/* <Canvas lenis={lenisRef} parentRef={appRef}></Canvas> */}
        {elements}
        <Refs trans={transs} lenis={lenisRef} ></Refs>

       
      </div>
<div className='footer_area'>
  {/* <div className='footer_bg'>
  </div> */}
</div>
      <div className='footer'>
      <div className='footer_bg'>
      {/* <video className='sun'  */}
      {/* // ref={videoRef} autoPlay muted loop src={video}></video> */}
      {/* {[1,2,3].map((e,i)=><div style={{'--i':(i+1/2)+"s"}} className={`circle_animation circle${i}`} key={'circle'+i}></div>)} */}
      </div>
        <div className='decor_snow'></div>
{/* аудиопанель */}
<div className='toppanel_outter'>
  <div className='toppanel_inner'>

    <button className={`audio_control  ${isPlaying ? 'active' : '' }`}
     onClick={play}>
      <audio src={m83} ref={(el)=> tracksRef.current.m83 = el} onEnded={newTrack}></audio>
      {/* <audio src={toALPD} ref={(el)=> tracksRef.current.toALPD = el} onEnded={newTrack}></audio> */}
      {/* <audio src={br2049} ref={(el)=> tracksRef.current.br2049 = el} onEnded={newTrack}></audio> */}
      {/* <audio src={revenant} ref={(el)=> tracksRef.current.revenant = el} onEnded={newTrack}></audio> */}
      

                    <img className='label' src={label}></img>
     </button>


     <div className='rinning_line_footer'>
      {[1,2].map(()=> {return(
      [`${"\u00A0"}`,'·',`${"\u00A0"}Dynamic${"\u00A0"}`,'·',
      `${"\u00A0"}Clean${"\u00A0"}`,
      '·',`${"\u00A0"}Creative${"\u00A0"}`,`·${"\u00A0"}`,
  `Elegant${"\u00A0"}`,`·`,`${"\u00A0"}Advanced${"\u00A0"}`].map((e,i)=>{
        return <p className={`bottom-line-elements ${e.includes('·')?'':"text_line_bottom"}`} key={i+'line+bottom'}>{e}</p>})

      )}
      
      )}
  
    </div>

  </div>
</div>

{/* стрелка навернх */}
<a  href='#' aria-label='скрол наверх'>
  <div className='arrow_cont'> 
  <svg class="arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 20L12 4" stroke="currentColor" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="0.2" stroke-linecap="rund" stroke-linejoin="round"/>
</svg>      
</div>
</a>

{/* проекты */}
<div className='nav_cont'>
  <nav className='footer_nav'>
    <div className='h2_cont'>
      <h2 className='origin_h2'>VOID</h2>
    <h2 className='fake_h2'>VOID
        {/* <h2 className='fake_h2 d'>D</h2> */}
</h2>
  
    </div>
    {/* <h2 className='origin_h2'>projects</h2>
    <h2 className='fake_h2'>projects</h2> */}

  </nav>
</div>

<nav className='a_cont' ref={acontRef} onMouseMove={select} onMouseLeave={unmove}>
    <a style={{'--i':1}} ref={(el)=>selectRef.current.first = el}>Our Products</a>
    <a style={{'--i':1}} ref={(el)=>selectRef.current.middle = el}>2025 Year</a>
    <a style={{'--i':1}} ref={(el)=>selectRef.current.last = el}>In process</a>
    </nav>

{/* собственность */}
<div className='bottom_cont'>
  <p className='bottom_text'>
Design and Development by Megan </p>
</div>

{/* вращенеи */}
<div className='middle'>
  {Array.from({length:14}).map((_,i)=>{ return <span style={{ '--i': `${i+1}` }} 
     className={`threedspan ${browser == 'Firefox' ? 'firefox_span':'' }`}
    key={'3span'+i}>megan</span>  
  })}
  {/* <span style={{ '--i': "1" }} className='threedspan el1'>megan</span>
  <span style={{ '--i': "2" }} className='threedspan el2'>megan</span>
  <span style={{ '--i': "3" }} className='threedspan el3'>megan</span>
  <span style={{ '--i': "4" }} className='threedspan el4'>megan</span>
  <span style={{ '--i': "5" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "6" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "7" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "8" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "9" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "10" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "11" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "12" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "13" }} className='threedspan el5'>megan</span>
  <span style={{ '--i': "14" }} className='threedspan el5'>megan</span> */}
</div>
</div>

    </div>
  );
}

export default App;
