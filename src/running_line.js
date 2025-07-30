
// на фон канаваса можно докинуть синус через перлин 
// накинуть сайз на вторую строку - решено
// ухожу с сайта браузера взвращаюсбь строка леьтит почему  - решено
import { useEffect, useRef, useState } from "react";

export function Runningline({ lenis }) {
// console.log(video)
  const prevScrollRef = useRef(0)
  const scrollDirection = useRef(false)
  const translateRef = useRef(0)
  const translateRef2 = useRef(0)

  const lineRefs = useRef({line:null, line2:null})
  const sizeRefs = useRef({line:null,line2:null})
  const velocityRef = useRef(1)
  const lastTimeRef = useRef(0)
  // let [velocity,setVelocity] = useState (1)
  

  const обнуление = (transRef,line) => {
    if (transRef.current){

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
     
    const speed =index * (delta/16) * 0.8// т е кадр в 1 милесекунд (60 кадров в секунду)
    // 1000 / 60 =16 с небольшим 
    // и поэтому обычно это будет ну примерно 1 
    
    

    обнуление(translateRef,'line')
    обнуление(translateRef2,'line2')

    const line = lineRefs.current.line
    // console.log(velocity)
    const line2 = lineRefs.current.line2

    if (!scrollDirection.current){

      translateRef.current -= speed 
      + velocityRef.current
      /4
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current += speed 
      + velocityRef.current
      /4
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')

    } else {

      translateRef.current += speed 
      + velocityRef.current // знак заменен на плюс т к модуль это помогло 
      /4
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current -= speed 
      + velocityRef.current // знак заменен на плюс т к модуль это помогло 
      /4  
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
      
    }

    // console.log(scrollDirection.current)
    lastTimeRef.current = currentTime;
    velocityRef.current = 1

    requestAnimationFrame(translate)
  }


  const updateDirection = ({ targetScroll }, state) => {

    if (prevScrollRef.current > targetScroll) {
      state.current = true
    } else if (targetScroll > prevScrollRef.current) { state.current = false }
    prevScrollRef.current = targetScroll // in any case
    // scroll direction + prevscroll logic

  }

  // const debaunceRef = useRef(false)
  useEffect(() => {

    lenis.current.on('scroll', event => {

      requestAnimationFrame(() => {

        velocityRef.current = Math.abs(event.targetScroll - prevScrollRef.current) / 2
        if (velocityRef.current == 0) { velocityRef.current = 1 }
       

        // setTimeout(()=>{
        //   velocityRef.current = 1

        //   // debaunceRef.current = false
        // },300)
        // это вы ше так мы обновляем 
        updateDirection(event, scrollDirection)

        // setVelocity(velocityRef.current) // отладка

      }) // emd of raf inner
    }) // end of raf outter or timeout
    requestAnimationFrame(translate)

  }, [])


  return (
    <>
      <div className="running_line_cont">
        {/* <video className="video" muted autoPlay loop src='assets/63fca69523dfba725518d390_68399bcc53dcba2367185502_hero-4k-transcode.webm' */}
{/* ></video> */}
        <div className="line_bg">
           <p className="velocity"
           >
            {/* {velocity} */}
            </p>
          <div className={`line_cont line1`}
            ref={(el)=>lineRefs.current.line = el}
            >
            <p ref={(el)=>sizeRefs.current.line = el}>
              REACT{"\u00A0"}·{"\u00A0"}JS{"\u00A0"}·{"\u00A0"}2025 YEAR{"\u00A0"}·{"\u00A0"}
            </p>
            <p>
            REACT{"\u00A0"}·{"\u00A0"}JS{"\u00A0"}·{"\u00A0"}2025 YEAR{"\u00A0"}·{"\u00A0"}
            </p>
            <p>
            REACT{"\u00A0"}·{"\u00A0"}JS{"\u00A0"}·{"\u00A0"}2025 YEAR{"\u00A0"}·{"\u00A0"}
            </p>
          </div>
          <div className="line_cont line2"
            ref={(el)=>lineRefs.current.line2 = el}
            >
            <p ref={(el)=>sizeRefs.current.line2 = el}>
              {"\u00A0"}·{"\u00A0"}DESIGN{"\u00A0"}·{"\u00A0"}DEVELOPMENT
              {"\u00A0"}·{"\u00A0"}PROMO
            </p>
            <p>
              {"\u00A0"}·{"\u00A0"}DESIGN{"\u00A0"}·{"\u00A0"}DEVELOPMENT
              {"\u00A0"}·{"\u00A0"}PROMO
            </p>
            <p>
              {"\u00A0"}·{"\u00A0"}DESIGN{"\u00A0"}·{"\u00A0"}DEVELOPMENT
              {"\u00A0"}·{"\u00A0"}PROMO
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
