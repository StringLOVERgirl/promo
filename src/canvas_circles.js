import { useRef, useEffect, useState } from "react"
export function Canvas({parentRef, lenis}){

  
    const intersectionRef = useRef(null)
    const circlesRef = useRef(null)
    const [isAnimating, setIsAnimating] = useState('')
    const stopObserverRef = useRef(false)
    const canvasContRef = useRef(null)

  

  

   
    useEffect(()=>{


  


          lenis.current.on('scroll', event => {
    console.log('lenis scroll')
    })
    

   

    },[])


    useEffect(()=>{
        intersectionRef.current = new IntersectionObserver((elements)=>{
            if(elements[0].isIntersecting){
                // drawCircle(contextRef.current,sizeRef.current)
                if(!stopObserverRef.current){
                stopObserverRef.current = true
                setIsAnimating('animateCircles')
                }
            } else {
                // cancelAnimationFrame(animatingIdRef.current);
                if (stopObserverRef.current){
                    stopObserverRef.current = false
                setIsAnimating('animateCirclesBack')
                }
            }
        },{
            threshold: 0.6  
            ,
            root: null
        })

        intersectionRef.current.observe(canvasContRef.current)
    },[])

    

    

    
    return(<>
        <section className="canvas_section">
            <div className="circles_bg_cont">
                <div className="bg_circles_cont"
                    ref={canvasContRef}>
                    <div className={`circles ${isAnimating}`}
                        ref={circlesRef}></div>
                </div>
            </div>
        </section>
    </>)
}