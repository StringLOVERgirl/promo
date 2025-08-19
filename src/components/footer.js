// select ref prps 
// unmove select можно в футерх хелпер 
//  логику трека в хелпер
import { useEffect,useRef,useState } from "react"
import label from '../assets/412027575_11590607.png'

import m83 from '../assets/M83 - By The Kiss.mp3'
import revenant from '../assets/The_Revenant_Theme_2.mp3'

export function Footer (){


    let [browser,setBrowser] = useState(null)
    useEffect(() => {
      if (navigator.userAgent.includes("Firefox")) {
          setBrowser('Firefox');
      }
  }, [])



let [isPlaying, setIsPlaying] = useState(false)
// const m83Ref = useRef(null)
// const revenantRef = useRef(null)
const tracksRef = useRef({m83:null, revenant:null
})

const currentTrackRef = useRef('void')

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
//end of music logic 




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
  
  
  const classtypes = [
    ['right center', 'right', 'right'],
    ['', 'center', ' '],
    ['left', 'left', 'right center'],
    [' ', ' ', ' ']
  ]

  let [state, setstate] = useState(['','',''])
  

  function select(event){
    console.log(event.clientX, selectRef.current.first, selectRef.current )
    if (event.clientX < distanceRef.current.middle){
      console.log(1111)
      setstate(classtypes[0])
    } 
    if (event.clientX < distanceRef.current.last
          && event.clientX > distanceRef.current.middle){    
        console.log(22222)    
        setstate(classtypes[1])

    } 
    if (event.clientX > distanceRef.current.last){
      console.log(3333)
      setstate(classtypes[2])
    } 
    }


      const unmove = () => {
      setstate(classtypes[3])
    }
  
      
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
  //end of select 
  console.log(selectRef.current)

  window.addEventListener('resize',()=>{
    for (let key in selectRef.current){
      setDistanceSelect(key)
      }
  })

},[])

    return(
        <>

     <div className='footer_area'></div>

<div className='footer'>

   <div className='footer_bg'></div>

   <div className='decor_shadow'></div>

   <div className='toppanel_outter'>
      
      <div className='toppanel_inner'>

        <button className={`audio_control  ${isPlaying ? 'active' : '' }`}
        onClick={play}>

            <audio src={m83} ref={(el)=> tracksRef.current.m83 = el} onEnded={newTrack}></audio>
            {/* <audio src={toALPD} ref={(el)=> tracksRef.current.toALPD = el} onEnded={newTrack}></audio> */}
            {/* <audio src={br2049} ref={(el)=> tracksRef.current.br2049 = el} onEnded={newTrack}></audio> */}
            <audio src={revenant} ref={(el)=> tracksRef.current.revenant = el} onEnded={newTrack}></audio>

            <img className='label' style={{filter:'hue-rotate(324deg)brightness(0.6)'}} src={label}></img>

        </button>
        


        <div className='rinning_line_footer'>
   {/* возвращаем два одинаковых блока */}
           {[1,2].map(()=> {return(
             [`${"\u00A0"}`,'·',`${"\u00A0"}Dynamic${"\u00A0"}`,'·',
                `${"\u00A0"}Clean${"\u00A0"}`,
                '·',`${"\u00A0"}Creative${"\u00A0"}`,`·${"\u00A0"}`,
                `Elegant${"\u00A0"}`,`·`,`${"\u00A0"}Advanced${"\u00A0"}`]
                // есть массив выше - собирем массив по элементам в отдельные блоки по типам - текст или точка
                .map((e,i)=>{
                     return <p className={`bottom-line-elements ${e.includes('·')?'':"text_line_bottom"}`} 
                     key={i+'line+bottom'}>{e}</p>
                })
             )}      
           )} 
           {/* end of running line */}
        </div>
        {/* end of to panel inner */}
      </div>
      {/* end of top panel outter */}
   </div>

   {/* стрелка навернх */}
   <a href='#' aria-label='скрол наверх'>
     <div className='arrow_cont'>
       <svg className="arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 20L12 4" stroke="currentColor" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round" />
         <path d="M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="0.2" stroke-linecap="rund" stroke-linejoin="round" />
       </svg>
     </div>
   </a>


   <div className='footer_blur_cont'>
     <div className='void_cont'>
       <h2 className='origin_h2'>VOID</h2>
       <h2 className='fake_h2'>VOID</h2>
     </div>
   </div>

  <nav className='a_cont' onMouseLeave={unmove}>
     <a onMouseEnter={select} className={state[0]} ref={(el)=>selectRef.current.first = el}>2025 Year</a>
     <a onMouseEnter={select} className={state[1]} ref={(el)=>selectRef.current.middle = el}>Our Products</a>
     <a onMouseEnter={select} className={state[2]} ref={(el)=>selectRef.current.last = el}>In process</a>
  </nav>

  {/* собственность */}
  <div className='bottom_cont'>
    <p className='bottom_text'> Design and Development by Megan </p>
  </div>

  {/* вращенеи */}
  <div className='middle'>
    {Array.from({length:14}).map((_,i)=>{ return <span style={{ '--i': `${i+1}` }} 
       className={`threedspan ${browser == 'Firefox' ? 'firefox_span':'' }`}
      key={'3span'+i}>megan</span>  
    })}
  </div>

{/* end of footer */}
</div>

        </>
    )
}