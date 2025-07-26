import React, { useCallback,useEffect,useState,useRef,memo } from 'react'
import Lenis from '@studio-freight/lenis'; // Импортируем Lenis благодаря importmap


 const Child = memo(function ({func}){

   const src = [
      [
         'assets/11_3D_Column.png',
         'assets/Lifestyle_04.png'
       ]
     ,
      [  'assets/Front(1).mp4',
         'assets/Front(2).mp4',
         'assets/Front(3).mp4',
         'assets/Front(4).mp4',
         'assets/Front.mp4'
       ]
   ]

   let mediaRefs = useRef([])

const addRef = useCallback((element)=>{
    if (!mediaRefs.current.includes(element)){
      mediaRefs.current.push(element)
    }
   },[])


   let elements = src.flatMap((tags, indexOutter) => {
     console.log(tags)

     return tags.map((element,indexInner) => {
       if (indexOutter == 0) {
        
         let imgElement = <img 
         src={element} 
         alt='img' 
         style={{border:'solid'}} 
         key = {'img'+indexInner}
         ref={addRef}></img>
         return imgElement
       } else {
         let videoElement = <video src={element} style={{border:'solid'}} key = {'video'+indexInner}
         ref={addRef}></video>
         return videoElement
       }
     })
   })

    console.log(elements, mediaRefs.current[0])

    useEffect(()=>{console.log(mediaRefs.current[0])},[])
    
console.log('render child')



  return(<>
  {elements}
  <p>100%</p>
  <button style={{width: '100px', height:'25px'}} onClick={func}></button>
  </>)
})

function App() {

  // let isActive = useRef({img:'hidden',video:'hidden'})
  let [isActive, setIsActive] = useState({img:'hidden',video:'hidden'})
  console.log(isActive)


  const bgRef = useRef()

  let [count,setCount] = useState(0)
  let [prokladka,setProkladka] = useState('bella')
  console.log('render',count, prokladka)

let newCount = useCallback( ()=>{
setCount(prevcount=>prevcount+1)},[]) // пустой значит функция не меняется (не имеет зависимостей)


useEffect(()=>{
  setIsActive({...isActive,img:''})

  const observer = new IntersectionObserver((trackarray)=>{
    console.log(trackarray)
    if (trackarray[0].isIntersecting){
      setIsActive(prevState => ({...prevState,img:''})) 
      // такое обновление позволяет получить извне даже внутри замыкание 
      // актуальные данные - магия реакта
      
      // спред создает новый объект
      // ссылка на него старая (на момент вызова обзервера замыкается им) 
      // утрачивается актульаность (меняется), что делат не доступным использование 
      // в ситуациях когда рпоисхоидт замыкания (например в функциях)
      // isActive.current.img = '' // в таком бы случае объект
      // реф (и ссылка на него) не изменился,
      // и обсервер работал бы с актулаьными значениями
      // (но не было бы рендера при изменении его и классы бы не менеялись)
      console.log(isActive)
      // lenis.resize();

      // так что вывод в консоль бесплезен в данном случае (как и в случае
      // с состоянием обычным)
    }
  })
  observer.observe(bgRef.current)

  const lenis = new Lenis({
    duration: 2,
    smooth: true,
});

lenis.on('scroll', event => {
    console.log(Math.floor(event.scroll))
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
setTimeout(()=>requestAnimationFrame(raf) ,1000)
requestAnimationFrame(raf) 



},[])

  return (
    <div className="App" 
    data-lenis
    style={{height: '300svh'}}
    >
      <div  className={`bg ${isActive.img}`}
      ref={bgRef}></div>
      <button onClick={()=>setProkladka(prokladka =='bella'?'ola':'bella')}>prokladka</button>
      <Child func={newCount}></Child>
    </div>
  );
}

export default App;
