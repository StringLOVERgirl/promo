export function mouseout(inverseRef,el,event){
    inverseRef.current[el].style.setProperty(`--animation`, 'hideinvers 0.3s forwards')
}

export function mouseenter(inverseRef,el,event){
    inverseRef.current[el].style.setProperty(`--animation`, 'appearinvers 0.5s forwards')
}

export function moveInverse (inverseRef,el,event) {
console.log(event)
let pageY = event.clientY + event.targetScroll;
//    позиция курсора 
const parentRect = inverseRef.current[el].getBoundingClientRect();
const parentTop = parentRect.top + event.targetScroll; // Координата top родителя относительно всей страницы
const parentLeft = parentRect.left ; // Координата top родителя относительно всей страницы
const newy = (pageY - parentTop ) *0.5 + 'px';


const newx =  event.clientX - parentLeft  + 'px';
console.log(newx, event.clientX, parentLeft+parentRect.width)
// inverseRef.current[el].style.setProperty(`--y`, newy)
inverseRef.current[el].style.transform = `translate3d(${newx}, ${newy}, 0)`
}
