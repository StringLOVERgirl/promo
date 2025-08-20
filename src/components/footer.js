// select ref prps 
// unmove select можно в футерх хелпер 
//  логику трека в хелпер
import { useEffect,useRef,useState } from "react"
import { Toppanel } from "./toppanel"

export function Footer (){


    let [browser,setBrowser] = useState(null)

    useEffect(() => {
      if (navigator.userAgent.includes("Firefox")) {
          setBrowser('Firefox');
      }
    }, [])


    const selectRef = useRef(
      {
        first:null,
        middle:null,
        last:null
      })

    const distanceRef = useRef(
      {
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
    }}

      const unmove = () => {
        setstate(classtypes[3])
      }
  
      
    useEffect(()=>{
      
      function setDistanceSelect(el){
        let rec = selectRef.current[el].getBoundingClientRect(selectRef.current[el])
        let distance = Math.floor(rec.left)
        distanceRef.current[el] = distance 
      }
  
      for (let key in selectRef.current){
        setDistanceSelect(key)
      }
      //end of select 

      window.addEventListener('resize',()=>{
        for (let key in selectRef.current){
          setDistanceSelect(key)
        }
      })

    },[])

  return (
    <>
      <div className='footer_area'></div>

      <div className='footer'>

        <div className='footer_bg'></div>

        <div className='decor_shadow'></div>

        <Toppanel></Toppanel>

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
          <a onMouseEnter={select} className={state[0]} ref={(el) => selectRef.current.first = el}>2025 Year</a>
          <a onMouseEnter={select} className={state[1]} ref={(el) => selectRef.current.middle = el}>Our Products</a>
          <a onMouseEnter={select} className={state[2]} ref={(el) => selectRef.current.last = el}>In process</a>
        </nav>

        {/* собственность */}
        <div className='bottom_cont'>
          <p className='bottom_text'> Design and Development by Megan </p>
        </div>

        {/* вращенеи */}
        <div className='middle'>
          {Array.from({ length: 14 }).map((_, i) => {
            return <span style={{ '--i': `${i + 1}` }}
              className={`threedspan ${browser == 'Firefox' ? 'firefox_span' : ''}`}
              key={'3span' + i}>megan</span>
          })}
        </div>

        {/* end of footer */}
      </div>

    </>
  )
}