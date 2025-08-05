export function createObserver(callBack,callBack2,object = {}){

     const observer = new IntersectionObserver((trackarray)=>{
        // console.log(trackarray)
        if (trackarray[0].isIntersecting){
            callBack()
        } else if (trackarray[0].intersectionRatio < 0.3 && trackarray[0].intersectionRatio >= 0.2) {
            if(callBack2){
            callBack2()}
        }

    }, object) 

    return observer   
}