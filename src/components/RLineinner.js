export function RLInner({lineRefs, sizeRefs, cp}){

    return <div className={`top_line_outter ${cp}`}>

    <div className="line_bg">

      <div className={`line_cont line1`}
        ref={(el) => lineRefs.current.line = el}>
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <p ref={i == 0 ? (el) => sizeRefs.current.line = el : null}>
              REACT{"\u00A0"}·{"\u00A0"}JS{"\u00A0"}·{"\u00A0"}2025 YEAR{"\u00A0"}·{"\u00A0"}
            </p>
          )
        })}
      </div>

      <div className="line_cont line2"
        ref={(el) => lineRefs.current.line2 = el}
      >
        {[1,2,3].map((_,i)=>
         <p ref={i==0?(el) => sizeRefs.current.line2 = el:null}>
         {"\u00A0"}·{"\u00A0"}DESIGN{"\u00A0"}·{"\u00A0"}DEVELOPMENT
         {"\u00A0"}·{"\u00A0"}PROMO
       </p>
       )}
      </div>
      

      {/* // end of line bg  */}
    </div>
    {/* end of line outter */}
  </div>

}