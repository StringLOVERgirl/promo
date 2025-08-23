import { useRef, useState,useEffect, useLayoutEffect } from "react";
import { LinkCont } from "./components/linkcont";
import { H1cont } from "./components/h1cont";

// скролвей расчтиывается как началао от экрана плюс высота страницы плюс высота элемента

// на мобильном пересчет дистанции паралакс при ресайзе  и вылезает за цвет название номер текста уменьшить фонт 

// узнать как меняется дистанс это при ресайзе?
// 
// по компоненту на каждый
export function Refs ({lenis}){
    

    const observingText = useRef([])
    const textRef = useRef(null)
    // эти ооставить в родительском копоненте передаать ссылку на реф 
const inverseRef = useRef([])
// передавать ад реф как пропс чтобы добавлять туда рефы 
const rec = useRef([null,null,null])
const bgRefs = useRef([])
    const link_cont = useRef(null)
    let [porog, setporog] = useState(window.innerWidth > 600 ? 0.7 : 0.5)


    const textobserv = useRef(new IntersectionObserver(elements=>{
        elements.forEach(e=>{
            if (e.isIntersecting){
                console.log(e)
                e.target.style.setProperty('--translate',0)
            }
        })
    }, {
        threshold: 0.5,
        root:null
    }))


    useEffect(()=>{
        observingText.current.forEach(e=>textobserv.current.observe(e))
    },[])
    
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
        if (arr[0].intersectionRatio > porog){
          vars.forEach(e=>textRef.current.style.setProperty(e.name, e.value))
        } 
        // else if (arr[0].intersectionRatio == 0 && textFlag.current){
        //   textRef.current.style.setProperty('--translateY', '100%')
        //   textRef.current.style.setProperty('--scaleX', 0)
        // }
    },{
        root: null,
        threshold: porog,
    }))

    
// parallax

    
    const parallaxMetrics = useRef({
        scrollWay: null,
        targetValue: 30,
        // ускоряем но есть ограничтиель до 100
        // УМЕНЬШАЕТ ШАГ который отвечате за отношение 1 процент прокрутки к 1 пикселю
        step:null,
        distance:[]
    })


    const setMetrics = (el,i) => {
        let rec = el.getBoundingClientRect()
        // расстояние до элмента топ + скрол игрик 
        // вычитание высоты экрана для получения координаты скола когда элмент появится снизу
        parallaxMetrics.current.distance[i] = rec.top - window.innerHeight + window.scrollY
    }


    const parallax = (varbg,i) => {
        const speed = 30
        let value = (window.scrollY - parallaxMetrics.current.distance[i]) / parallaxMetrics.current.step - speed
        if (value > 0 ){ value = 0} 
        if (value < -30 ){ value = -30} 
        // убираем выше нижний рвыок 
        // ограничтиель до 100
        // value-=30
        value +="%"
        // менять на тразишн добавлять оберточны элемент делать этот в 130 процентов высоты от того
        // link_cont.current.style.setProperty(varbg,value)
        bgRefs.current[i].style.transform = `translateY(${value})`;
        flag.current=false
    }

const flag = useRef(false)

    useLayoutEffect(()=>{
        console.log(observingText.current)

        console.log('hhhhhhhhhhhhhhhhhhh')
    
        bgRefs.current.forEach((e,i)=>setMetrics(e,i))
        console.log(parallaxMetrics.current.distance)
        parallaxMetrics.current.scrollWay = window.innerHeight*2
        parallaxMetrics.current.step = parallaxMetrics.current.scrollWay / parallaxMetrics.current.targetValue 

        console.log(parallaxMetrics.current.scrollWay )

    
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


    useEffect(()=>{
        lenis.current.on('scroll', event => {
            // if (!flag.current) {
                // flag.current = true
                parallaxMetrics.current.distance.forEach((e, i) => {
                    if (event.targetScroll >= parallaxMetrics.current.distance[i]
                        //  - 100 чтобы начиналс движение немного спустя как появится в поле видимости 
                        //  что бы юзер расссмотрел что сверху
                        && event.targetScroll <= parallaxMetrics.current.distance[i] + parallaxMetrics.current.scrollWay
                    ) {
                        requestAnimationFrame(() => {
                            parallax('--bg' + (i + 1), i)
                            console.log('prarl')
                        })
                    } 
                    // else {
                        // flag.current = false
                    // }
                })
            // }
        })
    },[])



function setDistanceInverse(){
    rec.current = rec.current.map((_,i)=>inverseRef.current[i].getBoundingClientRect())
console.log(rec.current)
}
//конец эти оставить
    

useEffect(()=>{

    function resizedistance(){
        setporog(window.innerWidth > 600 ? 0.7 : 0.5)
        bgRefs.current.forEach((e,i)=>setMetrics(e,i))
        setDistanceInverse()
    }

    window.addEventListener('resize',resizedistance
)
},[])

// осталось логику смещение реализовать через переменные и настроить инверсию
    return (<>

        <section className="section_links">

            <H1cont textRef={textRef}></H1cont>


            <div className="workds_cont" ref={link_cont}>

                {[1, 2, 3].map((_, i) => <LinkCont bgRefs={bgRefs}
                    observingText={observingText}
                    inverseRef={inverseRef}
                    i={i}></LinkCont>)}


                {/* end of works cont */}
            </div>

        </section>
    </>)
}