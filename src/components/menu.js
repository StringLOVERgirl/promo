import { useEffect, useRef, useState } from "react";

export function Menu ({menu, setMenu, setLink, link}){

    const links = [
      { name: `${"\u00A0"}the boys`, link: "https://the-boys-css3d.vercel.app/", alttext:`canvas${"\u00A0"}·${"\u00A0"}sinus${"\u00A0"}${"\u00A0"}animation${"\u00A0"}·${"\u00A0"}mousemove${"\u00A0"}·${"\u00A0"}3d css${"\u00A0"}·${"\u00A0"}` },
      { name: `${"\u00A0"}canvas`, link: "", alttext: `unfinished${"\u00A0"}·${"\u00A0"}mousemove${"\u00A0"}·${"\u00A0"}random position${"\u00A0"}·${"\u00A0"}` },
      { name: `${"\u00A0"}running line`, link: "", alttext: `infinite${"\u00A0"}·${"\u00A0"}video${"\u00A0"}·${"\u00A0"}transition${"\u00A0"}·${"\u00A0"}hover${"\u00A0"}·${"\u00A0"}` },
    //   { name: `${"\u00A0"}another canvas`, link: "", alttext: "" },
    ]

    const instruments = [['transition / transform', 'flex', 'pseudo3d', 'hover', 
    'before & after', 'keyframes', 'css variables', 'mix-blend-mode'],[
    'react hooks / props / components', 'map', 'raf', 'loops',
     'getBoundingClientRect', 'intobesrver'],
     ['parallax transform', 'interractive running lines ',  
     'mouse-tracking elements', 'lenis scroll', 'preloader', 'git / github'] ]

    let [opacity,setopacity] = useState(null)


    function hidemenu(){
        setMenu('hidemenu')
    }
  

    function showalt(i){
        // event.currentTarget.style.setProperty('--opacity',1)
        setopacity(i)
    }

   function hidelink() {
  setLink('hidelink')
   }
    function hidealt(){
        setopacity(null)
    }

    return (
      <>
        <section className={`menu_section ${menu}`}>
          <div
            className="cross_cont"
            onClick={() => {
              hidemenu();
              hidelink();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="2" y2="22" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          </div>

          <div className="menu_outter">
            <div className="menu_header">
              <div className="logo_menu_cont"></div>
              <div className="close_menu_cont"></div>
            </div>

            <div className="menu_main">
              {links.map((e, i) => (
                <div
                  className={`menu_link_cont`}
                  onMouseEnter={() => showalt(i)}
                  onMouseLeave={hidealt}
                >
                  <div className="menu_link_inner_cont">
                    <a
                      style={{
                        transition: `transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${
                          (i / 1.5 + 3) / 7
                        }s`,
                      }}
                      className={`menu_link ${link}`}
                      href={e.link}
                      target="_blank"
                    >
                      {e.name}
                    </a>
                  </div>

                  <div
                    style={{ opacity: opacity == i ? 1 : 0 }}
                    className={`alt_link_cont`}
                  >
                    {[1, 2].map((_) => (
                      <div className="alt_inner_cont">
                        <span className="alt_text">{e.alttext}</span>
                      </div>
                    ))}
                    {/* end of alt link cont outter */}
                  </div>
                  {/* end of menu link cont */}
                </div>
              ))}
              {/* end of menu main */}
            </div>

{/* footer menu */}
            <div className="menu_footer_cont">
              {instruments.map((el, i) => {
                return (
                  <div className="menu_footer">
                    {el.map((e) => (
                      <span className="menu_footer_text">
                        {e}
                        {"\u00A0"}
                        {"\u00A0"}
                      </span>
                      // end of inner loop
                    ))}
                  </div>
                  // end of return
                );
                // end of outter loop
              })
            //   end of block
              }
              {/* end of menu outter */}
            </div>
            
          </div>
        </section>
      </>
    );
}