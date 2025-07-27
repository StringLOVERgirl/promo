import { useRef, useEffect, useState } from "react"
export function Canvas({parentRef, lenis}){

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const observerRef = useRef(null)
    const intersectionRef = useRef(null)
    const animatingIdRef = useRef(null)
    const [isAnimating, setIsAnimating] = useState('')

    const sizeRef = useRef({
        width: 0,
        height: 0
    })

    let circleMetrics = useRef({
        radius: 0,
        otherkey: 0
    })

    function setCanvassize(){

        let newWidth = window.innerWidth
        let newHeight = window.innerHeight

        sizeRef.current.width = newWidth
        sizeRef.current.height = newHeight

        canvasRef.current.width = newWidth
        canvasRef.current.height = newHeight
    }

    function drawCircle(context, size){
        console.log(lenis.current.isScrolling,'1')
        context.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
        console.log('cricle' +context,size)
        let index = Math.max(size.width, size.height)

        if (circleMetrics.current.radius >= index/2){
            circleMetrics.current.radius = 0
        } else {
            circleMetrics.current.radius++}

        context.beginPath()
        context.strokeStyle = 'black'
        context.arc(
            size.width/2,
            size.height/2, 
            circleMetrics.current.radius, 
            0, 
            Math.PI*2)
        context.stroke()

        animatingIdRef.current = requestAnimationFrame(() => drawCircle(context, size))
    }

    useEffect(()=>{


        contextRef.current = canvasRef.current.getContext('2d')

        setCanvassize()
        // drawCircle(contextRef.current,sizeRef.current)
        console.log('sizeref width is '+sizeRef.current.width)
// contextRef.current = 0
        observerRef.current = new ResizeObserver(e => {
            const canVas = e[0].target
            console.log(canVas)
            requestAnimationFrame(()=>{
            setCanvassize()})
        })

        observerRef.current.observe(parentRef.current)

          lenis.current.on('scroll', event => {
    console.log('lenis scroll')
    })
    

        return(()=>{
            observerRef.current.disconnect() 
        })

    },[])


    useEffect(()=>{
        intersectionRef.current = new IntersectionObserver((elements)=>{
            if(elements[0].isIntersecting){
                // drawCircle(contextRef.current,sizeRef.current)
                setIsAnimating('animateCircles')
            } else {
                // cancelAnimationFrame(animatingIdRef.current);
            }
        },{
            threshold: 0.5
        })

        intersectionRef.current.observe(canvasRef.current)
    },[])

    
    // animatingFlag
    

    

    
    return(<>
    <section className="canvas_section">
    <div className="canvas_cont">
        <div className={`circles ${isAnimating}`}></div>
        <canvas ref={canvasRef}></canvas>
    </div>
    </section>
    </>)
}