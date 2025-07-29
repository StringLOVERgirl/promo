
// на фон канаваса можно докинуть синус через перлин 
// накинуть сайз на вторую строку - решено
// ухожу с сайта браузера взвращаюсбь строка леьтит почему  - решено
import { useEffect, useRef } from "react";
// import video from 'assets/63fca69523dfba725518d390_68399bcc53dcba2367185502_hero-4k-transcode.webm'

export function Runningline({ lenis }) {
// console.log(video)
  const preScrollRef = useRef(0)
  const scrollDirection = useRef(false)
  const translateRef = useRef(0)
  const translateRef2 = useRef(0)
  // const line1Ref = useRef(null)
  // const line2Ref = useRef(null)
  const lineRefs = useRef({line:null, line2:null})
  // const sizeRef = useRef(0)
  const sizeRefs = useRef({line:null,line2:null})
  const velocityRef = useRef(1)
  const lastTimeRef = useRef(0)

  const обнуление = (transRef,line) => {
    const width = Math.floor(sizeRefs.current[line].clientWidth)
    if (transRef.current >= width
      || transRef.current <= -width){
        transRef.current = 0
    }
  }

  function translate(currentTime) { // нужен аргумент т к обернутый во раф по умолчанию
    // дает аргумент времене currentTime 

    const index = window.innerWidth / 1280
    // вычисляем отношение ширины к ширине монитроа на котором 1.5  была хорошая 
    // скорость и индексируем скорость во сколько ширина больше или меньше 
    // во столько же и сокрость - чтобы всегда была равной
  
    let delta = !lastTimeRef.current ? 16 : currentTime - lastTimeRef.current
    //   if (!lastTimeRef.current){
    //  delta = 16 
    // } else 
    // currentTime - lastTimeRef.current
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
    console.log(speed - velocityRef.current/3.5)
    const line2 = lineRefs.current.line2
    if (!scrollDirection.current){
      translateRef.current -= speed 
      + velocityRef.current
      /3.5*index
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current += speed 
      + velocityRef.current
      /3.5*index
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
    } else {
      translateRef.current += speed 
      - velocityRef.current
      /3.5*index
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current -= speed 
      - velocityRef.current
      /3.5*index
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
    }

    // console.log(scrollDirection.current)
    lastTimeRef.current = currentTime;

    requestAnimationFrame(translate)
  }


  const updateDirection = ({ targetScroll }, state) => {

    if (preScrollRef.current > targetScroll) {
      state.current = true
    } else if (targetScroll > preScrollRef.current) { state.current = false }
    preScrollRef.current = targetScroll

  }

  const velocityDebaunceRef = useRef(false)
  useEffect(() => {

    lenis.current.on('scroll', event => {

      updateDirection(event, scrollDirection)
      // console.log(event.velocity)
      if (!velocityDebaunceRef.current){

            velocityDebaunceRef.current = true
            velocityRef.current = event.velocity

            setTimeout(()=>{
              velocityDebaunceRef.current=false
              velocityRef.current = 0
            },300) // ограничитель на срабатывания дерганий при скорости скролла
         }
    })
    // translate(currentTime)
    requestAnimationFrame(translate)

  }, [])


  return (
    <>
      <div className="running_line_cont">
        {/* <video className="video" muted autoPlay loop src='assets/63fca69523dfba725518d390_68399bcc53dcba2367185502_hero-4k-transcode.webm' */}
{/* ></video> */}
        <div className="line_bg">
          <div className={`line_cont line1`}
            // ref={line1Ref}
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
            // ref={line2Ref}
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
