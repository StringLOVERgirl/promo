export function Header ({setMenu,setLink}) {

  function showmenu() {
    setMenu('showmenu')
  }

  function showlink() {
    setLink('showlink')
  }
    return(
         <>
         <header>
            <div className="rights_cont">
              <span className="rights">℗</span>
            </div>


            <div className="header_center_cont">

               <div className="header_text_cont">
                 <span className="header_text">design, expression {"\u00A0"}</span>
               </div>

               <div className="header_mini_bg" role="img" aria-aria-label="декоративная мини-картинка"></div>
                 <div className="header_text_cont">
                   <span className="header_text ">{"\u00A0"}Development</span>
                 </div>
               </div>

               <div className="header_right_cont">
                  <div className="menu_icon">
                     <div className='icon' onClick={()=>{showmenu(); showlink()}}></div>
               </div>
               {/* enf of header center cont */}
            </div>
         </header>
        </>)
}