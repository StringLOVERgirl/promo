export function refsObserver(textRef, porog) {

    return new IntersectionObserver(arr => {

       console.log(arr[0].intersectionRatio)
       let vars = [
            {
               name:'--translateY',
               value: 0
            },{
               name:'--translateX',
               value: 0
            },{
               name:'--scaleX',
               value: 1.2
            }, {
               name: '--scale',
               value: 1
            }] 
       if (arr[0].intersectionRatio > porog) {
         vars.forEach(e => textRef.current.style.setProperty(e.name, e.value))
       } 
       }, {
         root: null,
         threshold: porog,
       }
    )
}