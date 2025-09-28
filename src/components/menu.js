import { MenuMain } from "./menu_main";

export function Menu ({menu, setMenu, setLink, link}) {

    const instruments = [['transition / transform', 'flex', 'pseudo3d', 'hover', 
    'before & after', 'keyframes', 'css variables', 'mix-blend-mode'],[
    'react hooks / props / components', 'map', 'raf', 'loops',
     'getBoundingClientRect', 'intobesrver'],
     ['parallax transform', 'interractive running lines ',  
     'mouse-tracking elements', 'lenis scroll', 'preloader', 'git / github'] ]

    function hidemenu() {
        setMenu('hidemenu')
    }

    function hidelink() {
       setLink('hidelink')
    }


    return (
      <>
        <section className={`menu_section ${menu}`}>

          <div className="cross_cont"
         onClick={() => {
          hidemenu()
          hidelink()
         }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="2" y2="22" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          </div>


          <div className="menu_outter">

            <div className="menu_header">
              <div className="logo_menu_cont"></div>
              <div className="close_menu_cont"></div>
            </div>

          <MenuMain link={link}></MenuMain>

            {/* footer menu */}
            <div className="menu_footer_cont">
              {instruments.map(el => {
                return (
                  <div className="menu_footer">
                    {el.map(e => (
                      <span className="menu_footer_text">
                        {e}{"\u00A0"}{"\u00A0"}
                      </span>
                    ))}
                  </div>
                )
                // end of outter loop
              })}
              {/* end of menu footer cont */}
            </div>
          {/* end of menu outter */}
          </div>
        </section>
      </>
    );
}