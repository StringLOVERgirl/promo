import { useRef, useState,useEffect, useLayoutEffect } from "react";
import hiddenvideo from './assets/locomotive_mtl_logo.jpeg'


// на мобильном пересчет дистанции паралакс при ресайзе  и вылезает за цвет название номер текста уменьшить фонт 

// узнать как меняется дистанс это при ресайзе?
// 
// по компоненту на каждый
export function Refs ({lenis}){
    
    const observingText = useRef([])
    function toobserve(el){
        if (!observingText.current.includes(el)){
            observingText.current.push(el)
        }
    }

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
    

    const textRef = useRef(null)


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

    


    // const addCounterRef = (el) => {
    //     if (!titleRefs.current.includes(el)){
    //         titleRefs.current.push(el)
    //     }
    // }

// parallax
    const bgRefs = useRef([])
    
    const parallaxMetrics = useRef({
        scrollWay: null,
        targetValue: 30,
        // ускоряем но есть ограничтиель до 100
        // УМЕНЬШАЕТ ШАГ который отвечате за отношение 1 процент прокрутки к 1 пикселю
        step:null,
        distance:[]
    })

    // используется в одном месте 
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
        const speed = 30
        let value = (window.scrollY - parallaxMetrics.current.distance[i]) / parallaxMetrics.current.step - speed
        if (value > 0 ){ value = 0} 
        if (value < -30 ){ value = -30} 
        // убираем выше нижний рвыок 
        // ограничтиель до 100
        // value-=30
        value +="%"
        // менять на тразишн добавлять оберточны элемент делать этот в 130 процентов высоты от того
        link_cont.current.style.setProperty(varbg,value)
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
    // выннести в рефы 
const des = [['Design Agencies', 'Web & Interactive', 'Photo & Video', 'Lottie'],
['Business & Corporate', 'Technolog','Mobile & Apps' , 'Scrolling'],
['Games & Entertainment','GSAP','Three.js','Gestures / Interaction']]

const colors = [['#000','#ffffff'], 
['#000000', '#E2E3E6'], 
['#000','#2779a7','#9C9C9C']]

// эти ооставить в родительском копоненте передаать ссылку на реф 
const inverseRef = useRef([])
// передавать ад реф как пропс чтобы добавлять туда рефы 
const addDesRef = (el)=>{
    if (!inverseRef.current.includes(el)){
        inverseRef.current.push(el)
    }
}

let rec = useRef([null,null,null])



function setDistanceInverse(){
    rec.current = rec.current.map((_,i)=>inverseRef.current[i].getBoundingClientRect())
console.log(rec.current)
}
//конец эти оставить
    
// в хелпер 3 функции
    function mouseout(el){
        inverseRef.current[el].style.setProperty(`--animation`, 'hideinvers 0.3s forwards')
    }

    function mouseenter(el){
        inverseRef.current[el].style.setProperty(`--animation`, 'appearinvers 0.5s forwards')
    }

const moveInverse = (el,event) => {

   let pageY = event.clientY + window.scrollY;
//    позиция курсора 
   const parentRect = inverseRef.current[el].getBoundingClientRect();
   const parentTop = parentRect.top + window.scrollY; // Координата top родителя относительно всей страницы
   const parentLeft = parentRect.left ; // Координата top родителя относительно всей страницы
   const newy = pageY - parentTop + 'px';
   
   
   const newx =  event.clientX - parentLeft  + 'px';
   console.log(newx, event.clientX, parentLeft+parentRect.width)
    inverseRef.current[el].style.setProperty(`--y`, newy)
    inverseRef.current[el].style.setProperty(`--x`, newx)

}

useEffect(()=>{

    function resizedistance(){
        bgRefs.current.forEach((e,i)=>setMetrics(e,i))
        setDistanceInverse()
    }

    window.addEventListener('resize',resizedistance
)
},[])

const links = [
    'https://k72.ca/en',
    'https://webisoft.com/',
    'https://havenstudios.com/en'
]
// осталось логику смещение реализовать через переменные и настроить инверсию
    return (<>

        <section className="section_links">

            <div className="h1cont" ref={textRef}>
            <span class="ball"></span>
  <span class="ball"></span>
  <span class="ball"></span>
  <span class="ball"></span>
  <span class="ball"></span>
  <span class="ball"></span>
               <div className="decor_snow_outter">
                  <div className="decor_snow_inner">
                  <div className="decor_snow"></div>
              </div> 

            </div>
                

                <div className="top_line_inspired">
                    {/* нужно для микс бленд контейнер и псевдоэлемент с фоном а нимаицей ховер */}
                    <div className='inspiredcont'>
                       <h2 className='links_text inspired'>inspired by</h2>
                    </div>
                    <div className='logo'></div>
                </div>
                
                <div className="lokomotive_cont">
                    <h2 className='links_text locomotive'>Locomotiv</h2>
                </div>

                <div className="e_cont">
                   <h2 className='links_text e'>e</h2>
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
{/*  */}
            <div className="workds_cont" ref={link_cont}>

               {// должеен принимать обязательно аргумент индекса и для контента 
            //    строковые массивы в компоненте 
               ['k72', 'WEBISOFT', 'HAVEN'].map((e, i) => {
                   return <>
                       <div className={`link_cont linkcont${i + 1}`}>

                       <div className="cube">
                        <div className="cube_inner_cont">
                            {/* в куб передавать аргумент-пропс  */}
                           {Array.from({length:6}).map((_,i_side)=>{return <div className={`side side${i_side+1} side${i+1}-`+(i_side+1)}></div>})}
                        </div>
                            </div>

{/* массив с доминирующими цветами так же сделать почеркивание с тем же цветом под названием цвета  */}

{/* сюда тоже аргумент */}
                        <div  style={{[`--x`]:0, [`--y`]:0}} className={`work_descr_cont des${i+1}`} data-id={i} onMouseLeave={(event)=>mouseout(event.currentTarget.dataset.id,event)} onMouseEnter={(event)=>mouseenter(event.currentTarget.dataset.id,event)} onMouseMove={(event)=>moveInverse(event.currentTarget.dataset.id,event)} ref={addDesRef}>
                            {/* фон цифры при появлении секции */}
                            <div ref={toobserve} style={{['--translate']:'100%'}}>
                            <div className={`title_des titledes${i+1}`} ><span >color
palette</span></div>
</div>
<div className={`colors_cont colorscont${i}`} ref={toobserve} style={{['--translate']:'100%'}}>
{colors[i].map((e,i)=><div style={{background:e, '--translateColor':i}} className={`des_color_div`} ><span className={`des_color_text`}>{e}</span></div>)}
</div>
                            <div className={`des_main desmain${i+1}`}>
                                {des[i].map(e=><span className="des_text">{e}</span>)}
                            </div>
                            <div className={`des_inverse desinverse${i+1}`} >
                                <img src={hiddenvideo}></img>
                            </div>
                        </div> 
                        {/* цифра сбоку */}

                           <div className={`link_inner_cont inner${i + 1}`} ref={toobserve} style={{['--translate']:'100%'}}>
                            
                                  <a href={links[i]} target="_blank" className={`links_title title${i + 1}`}  >{e}</a>
                               {/* имя проекта */}
                           </div>
                            <div className={`bgcont bgcont${i+1}`} ref={addBgRefs}>
                                <div className={`linkbg link${i + 1}bg`}></div>

                            </div>
                       </div>
                   </>
               })}
{/* end of works cont */}
            </div>
           

         {/*  4 контейнера  */}
        </section>
    </>)
}