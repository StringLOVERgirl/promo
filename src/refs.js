import { useRef, useState,useEffect } from "react";

export function Refs (){



    const textRef = useRef(null)

    let [text, isText] = useState('')
    let [inverse, isInverse] = useState('')
    const textFlag = useRef(false)

    const textObserver = useRef(new IntersectionObserver(arr => {
        console.log(arr[0].intersectionRatio)
        if (arr[0].intersectionRatio > 0.7){
          textFlag.current = true  
          textRef.current.style.setProperty('--translateY', 0)
          textRef.current.style.setProperty('--scaleX', 1.2)
        } 
        // else if (arr[0].intersectionRatio == 0 && textFlag.current){
        //   textRef.current.style.setProperty('--translateY', '100%')
        //   textRef.current.style.setProperty('--scaleX', 0)
        // }
    },{
        root: null,
        threshold: 0.7,
    }))

    const titleRefs = useRef([])


    let [animteCounterBg, setAnimteCounterBg] = useState('')

    const addCounterRef = (el) => {
        if (!titleRefs.current.includes(el)){
            titleRefs.current.push(el)
        }
    }

// parallax
    const bgRefs = useRef([])
    
    const parallaxMetrics = useRef({
        scrollWay: null,
        targetValue: null,
        distance:{
            distance1:null,
            distance2:null,
            distance3:null,
        },
    })

    const addBgRefs = (el) => {
        if (!bgRefs.current.includes(el)){
            bgRefs.current.push(el)
        }
    }

    const setMetrics = (el) => {

    }

    const parallax = (el) => {

    }


    useEffect(()=>{

        if(textObserver.current && textRef.current){
            textObserver.current.observe(textRef.current)
        }

        return(()=>{
            if(textObserver.current){
                textObserver.current.disconnect()
            }
            }
        )

    },[])

    return (<>

        <section className="section_links">

            <div className="h1cont" ref={textRef}>

                <div className="top_line_inspired">
                    {/* нужно для микс бленд контейнер и псевдоэлемент с фоном а нимаицей ховер */}
                    <div className={`inspiredcont ${text}`}>
                       <h2 className={`links_text inspired ${text}`}>inspired by</h2>
                    </div>
                    <div className={`logo ${text}`}></div>
                </div>
                
                <div className="lokomotive_cont">
                    <h2 className={`links_text locomotive ${text}`}>Locomotiv</h2>
                </div>

                <div className="e_cont">
                   <h2 className={`links_text e ${text}`}>e</h2>
                </div>

            </div>

            <div className="workds_cont">


               {/* <div className="counter_cont">
                 <span className="counter_text dynamic" ref={counterRef}>{counter} -</span>
                 <span className="counter_text total">3</span>
               </div> */}

               {['k72', 'WEBISOFT', 'HAVEN'].map((e, i) => {
                   return <>
                       <div className={`link_cont linkcont${i + 1}`}>


                        <div className={`counter_cont counter${i+1}`}>
                            {/* фон цифры при появлении секции */}
                            <span className={`counter_text`}>{i+1}</span>
                            <div className={`counterbg bg${i+1} ${animteCounterBg}`} ref={addBgRefs}></div>
                            {/* <span className={`counter_text`}>{i+1}</span> */}
                        </div> 
                        {/* цифра сбоку */}

                           <div className={`link_inner_cont inner${i + 1}`} ref={addCounterRef}>
                               <a className={`links_title title${i + 1}`}>{e}</a>
                               {/* имя проекта */}
                           </div>
   
                           <div className={`linkbg link${i + 1}bg`}></div>
                       </div>
                   </>
               })}

            </div>
           

         {/*  4 контейнера  */}
        </section>
    </>)
}