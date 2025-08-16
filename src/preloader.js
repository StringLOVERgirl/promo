import { useEffect, useState } from "react"

export function Preloader({displayloader, precent}){


    const [animationKey, setAnimationKey] = useState(0);
    useEffect(()=>{
        setAnimationKey(prevKey => prevKey + 1);
},[precent])

    return(
        <>
        <div className={`preloader ${displayloader}`}>
            <div className="spin"></div>
            <p key={animationKey} className={`precentage`}>{precent}</p>
        </div>
        </>
    )
}