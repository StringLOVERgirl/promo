import { useRef, useState,useEffect } from "react";

export function Refs (){

    const observerRef = useRef(null)
    const cont1Ref = useRef(null)
    const cont2Ref = useRef(null)
    const zeroRef = useRef(null)
    let [link1Hidden, setLink1Hidden] = useState(false)

    useEffect(()=>{

        observerRef.current = new IntersectionObserver((massiv) => {
            if(massiv[0].isIntersecting){
                console.log('zero')
             setLink1Hidden(true)
            }  else {
                setLink1Hidden(false)
            }
        }, {
            threshold: 0.25,
            root: null
        })

        if (zeroRef.current){
            console.log('zero')
          observerRef.current.observe(zeroRef.current)
        }

        return(()=>{
            observerRef.current.disconnect()
        })

    },[])


    return(<>
        <section className="section_links">
            <div className={`link_cont link1_cont ${link1Hidden ? 'hide_link1_cont' : ''}`}
            
            >
                <div className="link link1"></div>
    
            </div>
            <div className="link_cont link2_cont "
            
               >
                <div className="link link2"></div>
            </div>
            <div className="element_zero"
            ref={zeroRef}></div>
        </section>
    </>)
}