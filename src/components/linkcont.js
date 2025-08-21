import { Cube } from "./cube"
import hiddenvideo from '../assets/locomotive_mtl_logo.jpeg'
import { mouseenter, mouseout, moveInverse } from "./linkcont_funcs";

export function LinkCont({bgRefs, observingText, inverseRef, i }) {

    const addBgRefs = (el) => {
        if (!bgRefs.current.includes(el)&& el){
            bgRefs.current.push(el)
        }
    }

    const addDesRef = (el)=>{
        if (!inverseRef.current.includes(el)){
            inverseRef.current.push(el)
        }
    }

    function toobserve(el){
        if (!observingText.current.includes(el)){
            observingText.current.push(el)
        }
    }

    const titles = ['k72', 'WEBISOFT', 'HAVEN']

    const links = [
        'https://k72.ca/en',
        'https://webisoft.com/',
        'https://havenstudios.com/en'
    ]

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

    return <div className={`link_cont linkcont${i + 1}`}>

        <Cube i={i}/>
        {/* <Cube i={i}/> */}
        {/* <Cube i={i}/> */}

        {/* массив с доминирующими цветами так же сделать почеркивание с тем же цветом под названием цвета  */}

        {/* сюда тоже аргумент */}
        <div style={{ [`--x`]: 0, [`--y`]: 0 }} 
            className={`work_descr_cont des${i + 1}`} 
            data-id={i} 
            onMouseLeave={(event) => mouseout(inverseRef, event.currentTarget.dataset.id, event)} 
            onMouseEnter={(event) => mouseenter(inverseRef, event.currentTarget.dataset.id, event)} 
            onMouseMove={(event) => moveInverse(inverseRef, event.currentTarget.dataset.id, event)} 
            ref={addDesRef}>
            {/* фон цифры при появлении секции */}
            <div ref={toobserve} style={{ ['--translate']: '100%' }}>
                <div className={`title_des titledes${i + 1}`} ><span >color
                    palette</span></div>
            </div>

            <div className={`colors_cont colorscont${i}`} ref={toobserve} style={{ ['--translate']: '100%' }}>
                {colors[i].map((e, i) => <div 
                    style={{ background: e, '--translateColor': i }} 
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

            {/* end of work_descr_cont */}
        </div>

        <div className={`link_inner_cont inner${i + 1}`} 
          ref={toobserve} 
          style={{ ['--translate']: '100%' }}>

            <a href={links[i]} target="_blank" className={`links_title title${i + 1}`}>
                {/* ссылка */}
                {titles[i]}
            </a>
            {/* имя проекта */}
        </div>

        <div className={`bgcont bgcont${i + 1}`} ref={addBgRefs}>
            <div className={`linkbg link${i + 1}bg`}></div>
        </div>

    </div>
}