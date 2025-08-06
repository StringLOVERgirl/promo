import { useRef, useState,useEffect } from "react";

export function Refs (){


    useEffect(()=>{


 

    },[])

    return (<>

        <section className="section_links">

            <div className="h1cont">
                <h2 className="h2links">locomotiv</h2>
            </div>

            {[1, 2, 3].map((_, i) => {
                return <>
                    <div className={`link_cont linkcont${i + 1}`}>
                        <div className={`link_inner_cont inner${i + 1}`}>
                            <a className={`links link${i + 1}`}></a>
                        </div>

                        <div className={`linkbg link${i + 1}bg`}></div>
                    </div>
                </>
            })}
           

         {/*  4 контейнера  */}
        </section>
    </>)
}