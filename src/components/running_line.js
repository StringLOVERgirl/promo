import { useEffect, useRef, useState } from "react";
import { RLInner } from "./RLineinner";

export function Runningline({ lenis,cppoint }) {
  const prevScrollRef = useRef(0)
  const scrollDirection = useRef(false)
  const translateRef = useRef(0)
  const translateRef2 = useRef(0)

  const lineRefs = useRef({line:null, line2:null})
  const sizeRefs = useRef({line:null,line2:null})
  const velocityRef = useRef(1)
  const lastTimeRef = useRef(0)  

  const restart = (transRef,line) => {
    if (transRef.current && sizeRefs.current){

    const width = Math.floor(sizeRefs.current[line].clientWidth)
    if (transRef.current >= width
      || transRef.current <= -width){
        transRef.current = 0
    }
  }
  }

  
  function translate(currentTime) { // нужен аргумент т к обернутый во раф по умолчанию
    // дает аргумент времене currentTime 

    const index = window.innerWidth / 1280
    // вычисляем отношение ширины к ширине монитроа на котором 1.5  была хорошая 
    // скорость и индексируем скорость во сколько ширина больше или меньше 
    // во столько же и сокрость - чтобы всегда была равной
  
    let delta = !lastTimeRef.current ? 16 : currentTime - lastTimeRef.current

    if (currentTime - lastTimeRef.current > 300) {
      delta = 100
    } // а тут мы вычисляем если разница большая то пересчет времени 
    // не 16 ограничтиель потому что бразер не всегда иделально рисует может тормозноуть
    // быть заержка в анмиции
    // а когда уходим браузер не обновляет время анмиция застыает
    // и перескакивает на значение времени реальное 
    // узнаем сколько прошло делить на кадры корректируем 
    // на один кадр и в слеюущем вызове уже будет снова умножить на один тк перезаписали
    // в конце функции реф на актульное 
    // console.log(delta, currentTime)
     
    const speed =index * (delta/16) * 0.8
    // т е кадр в 1 милесекунд (60 кадров в секунду)
    // 1000 / 60 =16 с небольшим 
    // и поэтому обычно это будет ну примерно 1 
    
    

    restart(translateRef,'line')
    restart(translateRef2,'line2')

    const line = lineRefs.current.line
    const line2 = lineRefs.current.line2

    if (!scrollDirection.current) {

      translateRef.current -= speed 
      + velocityRef.current
      /5
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current += speed 
      + velocityRef.current
      /5
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')

    } else {

      translateRef.current += speed 
      + velocityRef.current // знак заменен на плюс т к модуль это помогло 
      /5
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current -= speed 
      + velocityRef.current // знак заменен на плюс т к модуль это помогло 
      /5
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
      
    }

    lastTimeRef.current = currentTime;
    velocityRef.current = 1

    requestAnimationFrame(translate)
  }


  const updateDirection = ({ targetScroll }, state) => {

    if (prevScrollRef.current > targetScroll) {
      state.current = true
    } else if (targetScroll > prevScrollRef.current) { 
      state.current = false 
    }
    
    prevScrollRef.current = targetScroll // in any case
    // scroll direction + prevscroll logic
  }

  useEffect(() => {

    lenis.current.on('scroll', event => {

      requestAnimationFrame(() => {

        if (event.targetScroll < 4) {
          setCp('')
        } 

        velocityRef.current = Math.abs(event.targetScroll - prevScrollRef.current) / 2
        
        if (velocityRef.current == 0) { 
          velocityRef.current = 1 
        }
       
        updateDirection(event, scrollDirection)
       }) // emd of raf inner
    }) // end of listener
    requestAnimationFrame(translate)
  }, [])

  const observerRef = useRef(null)
  let [cp,setCp] = useState('')

   observerRef.current = new IntersectionObserver((ar) => {
    if (ar[0].isIntersecting) {
      null
    } else {
      setCp('cp')    
    }
   },{threshold: 0.5, root: null
   })


const outter = useRef(null)


useEffect(()=>{

  if (cppoint.current && observerRef.current) {
    console.log(cppoint.current)
    observerRef.current.observe(cppoint.current)
    }
  
  return(()=>{
    observerRef.current.disconnect()
  })
},[])


  return (
    <>
      <div className="running_line_cont" ref={outter}>

        <div className="decor_cont">

          <div className="decor_inner">
            <span className="decor_text">Scroll</span>
          </div>

          <div className="decor_inner">
            <span className="decor_text">Slow</span>
          </div>
          {/* end of decor cont  */}
        </div>

        <div className='aside_cont'>
          <span className='aside_text'>void</span>
        </div>

        <RLInner 
           lineRefs={lineRefs} 
           sizeRefs={sizeRefs} 
           cp={cp}>
        </RLInner>

        <p className="velocity">{/* {velocity} */}</p>

     {/* end of running line cont */}
      </div>

    </>
  );
}
