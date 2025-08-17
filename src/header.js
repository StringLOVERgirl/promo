export function Header ({setMenu,setLink}){

  function showmenu(){
    setMenu('showmenu')
  }

  function showlink(){
    setLink('showlink')
  }
    return(
        <>
          <header>

<div className="header_left_cont">
   
</div>

  <div className="header_center_cont">

    <div className="header_text_cont">
            <span className="header_text">design, expression {"\u00A0"}</span>
            </div>


            <div className="header_mini_bg"></div>
                        <div className="header_text_cont">

            <span className="header_text ">{"\u00A0"}Development</span>
            </div>

        </div>
    
    

  {/* end of headet text cont */}

  <div className="header_right_cont">
    <div className="menu_desc">
    <span className="more">something more</span>
    <span className="cllickbelow">click below</span>
    </div>
  <div className="menu_icon">
<div className='icon' onClick={()=>{showmenu(); showlink()}}></div>
  </div>
  </div>

</header>
</>
    )
}