// select ref prps 
// unmove select можно в футерх хелпер 
//  логику трека в хелпер
import { useEffect, useState } from "react"
import { Toppanel } from "./toppanel"

export function Footer () {


    let [browser, setBrowser] = useState(null)

    useEffect(() => {
      if (navigator.userAgent.includes("Firefox")) {
          setBrowser('Firefox');
      }
    }, [])

  
  
    const classtypes = [
      ['center', 'right', 'right'],
      ['', 'center', ''],
      ['left', 'left', 'center'],
      [' ', ' ', ' ']
    ]

    let [state, setstate] = useState(['','',''])
  
      const unmove = () => {
        setstate(classtypes[3])
      }
  
      
  return (
    <>
      <div className='footer_area'></div>

      <div className='footer'>

        <div className='footer_bg'></div>

        <div className='decor_shadow'></div>

        <Toppanel></Toppanel>

        {/* стрелка наверх */}
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

        <div className='a_cont' onMouseLeave={unmove}>
          <span onMouseEnter={() => setstate(classtypes[0])} className={state[0]}>2025 Year</span>
          <span onMouseEnter={() => setstate(classtypes[1])} className={state[1]}>Demonstrating</span>
          <span onMouseEnter={() => setstate(classtypes[2])} className={state[2]}>In process</span>
        </div>

        {/* собственность */}
        <div className='bottom_cont'>
          <p className='bottom_text'> Design and Development by Megan </p>
        </div>

        {/* вращение */}
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