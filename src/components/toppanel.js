import label from '../assets/412027575_11590607.png'
import m83 from '../assets/M83 - By The Kiss.mp3'
import revenant from '../assets/The_Revenant_Theme_2.mp3'
import { useState, useRef } from 'react'

export function Toppanel({}){


// можно вынести логику мызки и топ панель в отдельный комопонет 
let [isPlaying, setIsPlaying] = useState(false)
// const m83Ref = useRef(null)
// const revenantRef = useRef(null)
const tracksRef = useRef({m83:null, revenant:null
})

const currentTrackRef = useRef('void')

const newTrack = () => {
  currentTrackRef.current = null
}

const play = () => {

  const entry = Object.entries(tracksRef.current)

  if (currentTrackRef.current == 'void' || !currentTrackRef.current ) {
    let track_ndex = Math.floor(Math.random() * (entry.length-1 - 0 + 1)) + 0
    currentTrackRef.current = entry[track_ndex][1]
    }

      if (!isPlaying) {
        currentTrackRef.current.play()
        setIsPlaying(!isPlaying)
      } else {
        currentTrackRef.current.pause()
        setIsPlaying(!isPlaying)
      }
}
//end of music logic 


    return (
        <div className='toppanel_outter'>
      
        <div className='toppanel_inner'>
  
          <button className={`audio_control  ${isPlaying ? 'active' : '' }`}
          onClick={play}>
  
              <audio src={m83} ref={(el)=> tracksRef.current.m83 = el} onEnded={newTrack}></audio>
              {/* <audio src={toALPD} ref={(el)=> tracksRef.current.toALPD = el} onEnded={newTrack}></audio> */}
              {/* <audio src={br2049} ref={(el)=> tracksRef.current.br2049 = el} onEnded={newTrack}></audio> */}
              <audio src={revenant} ref={(el)=> tracksRef.current.revenant = el} onEnded={newTrack}></audio>
  
              <img className='label' role='img' aria-label='декоративная картинка-кнопка для музыки' style={{filter:'hue-rotate(324deg)brightness(0.6)'}} src={label}></img>
  
          </button>
          
  
  
          <div className='running_line_footer'>
     {/* возвращаем два одинаковых блока */}
             {[1,2].map(()=> {return(
               [`${"\u00A0"}`,'·',`${"\u00A0"}Dynamic${"\u00A0"}`,'·',
                  `${"\u00A0"}Clean${"\u00A0"}`,
                  '·',`${"\u00A0"}Creative${"\u00A0"}`,`·${"\u00A0"}`,
                  `Elegant${"\u00A0"}`,`·`,`${"\u00A0"}Advanced${"\u00A0"}`,`·`,`${"\u00A0"}Interractive${"\u00A0"}`]
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
  
    )
}