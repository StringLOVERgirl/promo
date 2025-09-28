import hiddenvideo from '../assets/locomotive_mtl_logo.jpeg'


export function Work({toobserve, i}) {

    const des = [
        ['Design Agencies', 'Web & Interactive', 'Photo & Video', 'Lottie'],
        ['Business & Corporate', 'Technolog','Mobile & Apps' , 'Scrolling'],
        ['Games & Entertainment','GSAP','Three.js','Gestures / Interaction']
    ]

    const colors = [
        ['#000','#ffffff'], 
        ['#000000', '#E2E3E6'], 
        ['#000','#2779a7','#9C9C9C']
    ]


    return(
        <>
           <div ref={toobserve} style={{ ['--translate']: '100%'}}>
               <div className={`title_des titledes${i + 1}`}>
                   <span>color palette</span>
               </div>
           </div>

           <div className={`colors_cont colorscont${i}`} ref={toobserve}>
               {colors[i].map((e, index) => 
                 <div 
                style={{background: e, '--translateColor': index}} 
                className={`des_color_div`}>
                   <span className={`des_color_text`}>{e}</span>
                 </div>
               )}
           </div>

           <div className={`des_main desmain${i + 1}`}>
               {des[i].map(e => <span className="des_text">{e}</span>)}
           </div>

           <div className={`des_inverse desinverse${i + 1}`}>
               <img src={hiddenvideo}></img>
           </div>
        </>
    )
}