import { useState } from 'react'

export function MenuMain({link}) {

    const links = [
        { name: `${"\u00A0"}running line`, link: "https://running-line.vercel.app/", alttext: `infinite${"\u00A0"}·${"\u00A0"}video${"\u00A0"}·${"\u00A0"}transition${"\u00A0"}·${"\u00A0"}hover${"\u00A0"}·${"\u00A0"}` },
        // { name: `${"\u00A0"}the boys`, link: "https://the-boys-css3d.vercel.app/", alttext:`canvas${"\u00A0"}·${"\u00A0"}sinus${"\u00A0"}${"\u00A0"}animation${"\u00A0"}·${"\u00A0"}mousemove${"\u00A0"}·${"\u00A0"}3d css${"\u00A0"}·${"\u00A0"}` },
        { name: `${"\u00A0"}canvas`, link: "https://find-the-lock.vercel.app/", alttext: `unfinished${"\u00A0"}·${"\u00A0"}mousemove${"\u00A0"}·${"\u00A0"}random position${"\u00A0"}·${"\u00A0"}` }
      //   { name: `${"\u00A0"}another canvas`, link: "", alttext: "" },
      ]

    let [opacity, setopacity] = useState(null)

    function showalt(i) {
       setopacity(i)
    }

    function hidealt() {
       setopacity(null)
    }

    return(
       <div className="menu_main">

          {links.map((e,i) => (
              <div
             className={`menu_link_cont`}
             onMouseEnter={() => showalt(i)}
             onMouseLeave={hidealt}>

                <div className="menu_link_inner_cont">
                  <a className={`menu_link ${link}`}
                 style={{transition: `transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${(i / 1.5 + 3) / 7}s`}}
                 href={e.link}
                 target="_blank">
                    {e.name}
                  </a>
                </div>

                <div className={`alt_link_cont`}
               style={{ opacity: opacity == i ? 1 : 0 }}>
                  {[1, 2].map(_ => (
                    <div className="alt_inner_cont">
                      <span className="alt_text">{e.alttext}</span>
                    </div>))
                  }
                  {/* end of alt link cont */}
                </div>
              {/* end of menu link cont */}
              </div>

          ))}
          {/* end of menu main */}
       </div>
    )
}