
// на фон канаваса можно докинуть синус через перлин 
// накинуть сайз на вторую строку
// ухожу с сайта браузера взвращаюсбь строка леьтит почему 
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
  const sizeRef = useRef(0)
  const velocityRef = useRef(1)

  const обнуление = (transRef) => {
    const width = Math.floor(sizeRef.current.clientWidth)
    if (transRef.current >= width
      || transRef.current <= -width){
        transRef.current = 0
    }
  }

  function translate() {

    обнуление(translateRef)
    обнуление(translateRef2)

    const line = lineRefs.current.line
    // console.log(line)
    const line2 = lineRefs.current.line2
    if (!scrollDirection.current){
      translateRef.current -= 1.5 + velocityRef.current/3
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current += 1.5 + velocityRef.current/3
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
    } else {
      translateRef.current += 1.5 - velocityRef.current/3
      line.style.setProperty('--translateLine1', translateRef.current + 'px')

      translateRef2.current -= 1.5 - velocityRef.current/3
      line2.style.setProperty('--translateLine2', translateRef2.current + 'px')
    }

    // console.log(scrollDirection.current)

    requestAnimationFrame(() => translate())
  }


  const updateDirection = ({ targetScroll }, state) => {

    if (preScrollRef.current > targetScroll) {
      state.current = true
    } else if (targetScroll > preScrollRef.current) { state.current = false }
    preScrollRef.current = targetScroll

  }

  const velocityDebaunceRef = useRef(false)
  useEffect(() => {
    // line1Ref.current.style.setProperty('--translateLine1', '0%')
    lenis.current.on('scroll', event => {
      updateDirection(event, scrollDirection)
      // console.log(event.velocity)
      if (!velocityDebaunceRef.current){
        velocityDebaunceRef.current = true
      velocityRef.current = event.velocity
    setTimeout(()=>{
      velocityDebaunceRef.current=false
      velocityRef.current = 0
    },200)}
    })
    translate()

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
            <p ref={sizeRef}>
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
            <p>
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
