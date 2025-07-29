import { useRef, useState,useEffect } from "react";

export function Refs (){

    const observerRef = useRef(null)
    let [link1Hidden, setLink1Hidden] = useState(false)

    useEffect(()=>{

        observerRef.current = new IntersectionObserver(() => {

        },{
            threshold: 0.5,
            root: null
        })
        observerRef.current.observe()

    },[])


    return(<>
        <section className="section_links">
            <div className={`link_cont link1_cont ${link1Hidden ? 'hide_link1_cont' : ''}`}>
                <div className="link link1"></div>
            </div>
            <div className="link_cont link2_cont ">
                <div className="link link2"></div>
            </div>
        </section>
    </>)
}