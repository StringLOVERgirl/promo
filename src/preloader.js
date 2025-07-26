import { useEffect, useState, useRef } from "react"

export function Preloader({refs, contentState}){


    const preloaderRef = useRef()

    let [isPreloader,setIsPreloader] = useState('')

    useEffect(()=>{    
        console.log(refs.current)
        setTimeout(()=>{
            setIsPreloader('hide_content')
            contentState('')
        },5000)

  
        
    },[])


    return(
        <>
        <div className={`preloader ${isPreloader}`}
        ref={preloaderRef}>
            <div className="spin"></div>
            <p className="precentage">100%</p>
        </div>
        </>
    )
}