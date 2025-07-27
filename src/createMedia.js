export const src = [
    [
       'assets/11_3D_Column.png',
       'assets/Lifestyle_04.png',
       'assets/06_3D_BTCFlower.png'
     ]
   ,
    [  'assets/Front(1).mp4',
       'assets/Front(2).mp4',
       'assets/Front(3).mp4',
       'assets/Front(4).mp4',
       'assets/Front.mp4',
       `assets/bag.webm` ,
       `assets/beer.webm` ,
       `assets/clock.webm` ,
       `assets/dice.webm `,
       `assets/drink.webm `
     ]
 ]

 export function collectMedia(links, ref, updateprecentage){
    return links.flatMap((tags, indexOutter) => {
       console.log(tags)
       const listeneralready = (event) => {
        if (event.target.dataset.processed){
            return //  т е если сработал обработчик
            // в юс эффект, то по онлоаду ничего не надо делать 
            // мало ли вдруг сработает даже уже если загружена 
            // а в другом- если он срабоает (в эффекте) первый то онлоад 
            // тут нам не нужен но что бы эфектовыский не сработал ставим тру
        } else {
            event.target.dataset.processed = 'true'
            updateprecentage()}
    } 
   
       return tags.map((element, indexInner) => {
         if (indexOutter == 0) {   
      
           let imgElement = <img
             src={element}
             alt='img'
              onLoad={listeneralready}
             onError={listeneralready}
             key={'img' + indexInner}
             ref={ref}></img>
           return imgElement
         } else {
           let videoElement = <video src={element}
             key={'video' + indexInner}
             ref={ref}
             onCanPlayThrough={listeneralready}
             onError={listeneralready}
             ></video>
           return videoElement
         }
       })
   
     })
   
   }

 