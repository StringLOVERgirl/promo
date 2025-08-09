import { useRef, useState,useEffect, useLayoutEffect } from "react";

export function Refs ({lenis, distancee}){


    const textRef = useRef(null)

    let [text, isText] = useState('')
    const textFlag = useRef(false)

    const textObserver = useRef(new IntersectionObserver(arr => {
        console.log(arr[0].intersectionRatio)
        let vars = [
            {
                name:'--translateY',
                value: 0
             },{
                name:'--translateX',
                value: 0
             },{
                name:'--scaleX',
                value: 1.2
             }, {
                name: '--scale',
                value: 1
             }] 
        if (arr[0].intersectionRatio > 0.7){
          textFlag.current = true  
          vars.forEach(e=>textRef.current.style.setProperty(e.name, e.value))
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
        targetValue: 130,
        // ускоряем но есть ограничтиель до 100
        // УМЕНЬШАЕТ ШАГ который отвечате за отношение 1 процент прокрутки к 1 пикселю
        step:null,
        distance:[]
    })

    const addBgRefs = (el) => {
        if (!bgRefs.current.includes(el)&& el){
            bgRefs.current.push(el)
        }
    }

    const setMetrics = (el,i) => {
        let rec = el.getBoundingClientRect()
        parallaxMetrics.current.distance[i] = rec.top - window.innerHeight + window.scrollY
    }

    const link_cont = useRef(null)

    const parallax = (varbg,i) => {
        // можно накинуть - 100 дабы инвертировать и больше закос под атачмент фиксд 
        let value = (window.scrollY - parallaxMetrics.current.distance[i]) / parallaxMetrics.current.step - 10 
        if (value > 100 ){ value = 100} 
        // убираем выше нижний рвыок 
        // ограничтиель до 100
        value +="%"
        link_cont.current.style.setProperty(varbg,value)
        flag.current=false
    }

const flag = useRef(false)
    useLayoutEffect(()=>{
        console.log('hhhhhhhhhhhhhhhhhhh')
    
        bgRefs.current.forEach((e,i)=>setMetrics(e,i))
        console.log(parallaxMetrics.current.distance)
        parallaxMetrics.current.scrollWay = window.innerHeight*2
        parallaxMetrics.current.step = parallaxMetrics.current.scrollWay / parallaxMetrics.current.targetValue 

        console.log(parallaxMetrics.current.scrollWay )


        lenis.current.on('scroll', event => {
            if (!flag.current){
                flag.current=true
            parallaxMetrics.current.distance.forEach((e,i)=>{
        if (event.targetScroll >= parallaxMetrics.current.distance[i] - 100
            //  - 100 чтобы начиналс движение немного спустя как появится в поле видимости 
            //  что бы юзер расссмотрел что сверху
            && event.targetScroll <= parallaxMetrics.current.distance[i]+parallaxMetrics.current.scrollWay 
            ){
                requestAnimationFrame(()=>{
                parallax('--bg'+(i+1),i)
                console.log('prarl')
                })
        } else{
            flag.current = false
        }
    })
    }
        })


    
        if(textObserver.current && textRef.current){
            textObserver.current.observe(textRef.current)
        }

        return(()=>{
            if(textObserver.current){
                textObserver.current.disconnect()
            }
            }
        )

    },[distancee])

    return (<>

        <section className="section_links">

            <div className="h1cont" ref={textRef}>

               <div className="decor_snow_outter">
                  <div className="decor_snow_inner">
                    <div className="decor_snow"></div>
              </div> 
               </div>
                

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

                <div className="description_cont">

                    <div className="description des_top_cont">
                        <span>Digital Design Agency</span>
                    </div>

                    <div className="description des_bottom_cont">
                        <a href="https://locomotive.ca/en" target="_blank">Canada - Montréal</a>
                    </div>

<div className="w_cont">
                    <a className="w_link" target="_blank" href="https://www.awwwards.com/locomotive/">
                <svg className="awwwards" width="50" height="28" viewBox="0 0 30 16">
                    <path d="m18.4 0-2.803 10.855L12.951 0H9.34L6.693 
                    10.855 3.892 0H0l5.012 15.812h3.425l2.708-10.228 2.709 
                    10.228h3.425L22.29 0h-3.892ZM24.77 13.365c0 1.506 1.12 
                    2.635 2.615 2.635C28.879 16 30 14.87 30 
                    13.365c0-1.506-1.12-2.636-2.615-2.636s-2.615 1.13-2.615 2.636Z">
                    </path>
                </svg>
                </a>
                </div>

                </div>

            

            </div>

            <div className="workds_cont" ref={link_cont}>


               {/* <div className="counter_cont">
                 <span className="counter_text dynamic" ref={counterRef}>{counter} -</span>
                 <span className="counter_text total">3</span>
               </div> */}

               {['k72', 'WEBISOFT', 'HAVEN'].map((e, i) => {
                   return <>
                       <div className={`link_cont linkcont${i + 1}`}>


                        <div className={`work_descr_cont des${i+1}`}>
                            {/* фон цифры при появлении секции */}
                            <div className={`title_des titledes${i+1}`}></div>
                            <div className={`des_main desmain${i+1} ${null}`}></div>
                            <div className={`des_inverse desinverse${i+1} ${null}`}></div>
                            {/* <span className={`counter_text`}>{i+1}</span> */}
                        </div> 
                        {/* цифра сбоку */}

                           <div className={`link_inner_cont inner${i + 1}`} ref={addCounterRef}>
                               <a className={`links_title title${i + 1}`}>{e}</a>
                               {/* имя проекта */}
                           </div>
   
                           <div className={`linkbg link${i + 1}bg`} ref={addBgRefs}></div>
                       </div>
                   </>
               })}

            </div>
           

         {/*  4 контейнера  */}
        </section>
    </>)
}