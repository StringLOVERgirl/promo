import { Cube } from './cube'
import { mouseenter, mouseout, moveInverse } from '../js/linkcont_funcs'
import { Work } from './work_description'

export function LinkCont({bgRefs, observingText, inverseRef, i}) {

    const titles = ['k72', 'WEBISOFT', 'HAVEN']

    const links = [
        'https://k72.ca/en',
        'https://webisoft.com/',
        'https://havenstudios.com/en'
    ]

    const addBgRefs = (el) => {
        if (!bgRefs.current.includes(el)&& el) {
            bgRefs.current.push(el)
        }
    }

    const addDesRef = (el) => {
        if (!inverseRef.current.includes(el)) {
            inverseRef.current.push(el)
        }
    }

    function toobserve(el) {
        if (!observingText.current.includes(el)) {
            observingText.current.push(el)
        }
    }


    return(
    
    <div className={`link_cont linkcont${i + 1}`}>

        <Cube i={i}></Cube>

        <div style={{[`--x`]: 0, [`--y`]: 0}} 
       className={`work_descr_cont des${i + 1}`} 
       data-id={i} 
       onMouseLeave={(event) => mouseout(inverseRef, event.currentTarget.dataset.id)} 
       onMouseEnter={(event) => mouseenter(inverseRef, event.currentTarget.dataset.id)} 
       onMouseMove={(event) => moveInverse(inverseRef, event.currentTarget.dataset.id, event)} 
       ref={addDesRef}>
            <Work toobserve={toobserve} i={i}></Work>
            {/* end of work_descr_cont */}
        </div>

        <div className={`link_inner_cont inner${i + 1}`} ref={toobserve}>
           <a href={links[i]} target="_blank" className={`links_title title${i + 1}`}>
               {/* ссылка */}
               {titles[i]}
           </a>
        </div>

        <div className={`bgcont bgcont${i + 1}`} ref={addBgRefs}>
            <div className={`linkbg link${i + 1}bg`} role="img" aria-label="фото проекта студии локомотив"></div>
        </div>

    </div>
    )
}