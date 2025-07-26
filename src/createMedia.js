export const src = [
    [
       'assets/11_3D_Column.png',
       'assets/Lifestyle_04.png'
     ]
   ,
    [  'assets/Front(1).mp4',
       'assets/Front(2).mp4',
       'assets/Front(3).mp4',
       'assets/Front(4).mp4',
       'assets/Front.mp4'
     ]
 ]

 export function collectMedia(links, ref){
    return links.flatMap((tags, indexOutter) => {
       console.log(tags)
   
       return tags.map((element, indexInner) => {
         if (indexOutter == 0) {
   
           let imgElement = <img
             src={element}
             alt='img'
             key={'img' + indexInner}
             ref={ref}></img>
           return imgElement
         } else {
           let videoElement = <video src={element}
             key={'video' + indexInner}
             ref={ref}></video>
           return videoElement
         }
       })
   
     })
   
   }

 