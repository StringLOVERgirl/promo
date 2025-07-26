export function createObserver(callBack){

     const observer = new IntersectionObserver((trackarray)=>{
        console.log(trackarray)
        if (trackarray[0].isIntersecting){
            callBack()
        }

    }) 

    return observer   
}