import { useRef, useEffect } from "react"

export function Canvas(parentRef){

    const canvasRef = useRef(null)
    const observerRef = useRef(null)
    const size = useRef({
        width: 0,
        height: 0
    })

    useEffect(()=>{

        observerRef.current = new ResizeObserver(e => {
            const canVas = e[0]
            console.log(canVas)
        })

        observerRef.current.observe()

    },[])

    

    
    return(<>
    <canvas ref={canvasRef}></canvas>
    </>)
}