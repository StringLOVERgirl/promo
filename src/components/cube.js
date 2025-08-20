export function Cube({i}) {

    return <div className="cube">
        <div className="cube_inner_cont">
            {/* в куб передавать аргумент-пропс  */}
            {Array.from({ length: 6 }).map((_, i_side) => { return <div 
              className={`side side${i_side + 1} side${i + 1}-` + (i_side + 1)}></div> 
            })
            }
        </div>
    </div>
}