function mediaTemplate(data, result) {
    const { title, image, likes, photographerId, date,video } = data;
    const { name } = result;
    const fullname = name.split(" ");
   


    
    function getMediaCardDOM() {
        const article = document.createElement( 'article' ); 
        if(video){
            const ctr_video = document.createElement( 'video' );
            ctr_video.controls = true;
            const src = `assets/photographers/${fullname[0]}/${video}`;
            const media_video = document.createElement( 'source' );
            media_video.classList.add("set");
            media_video.setAttribute("src", src)
            
            ctr_video.appendChild(media_video);
            article.appendChild(ctr_video)
            //creer un element video 
            //creer les attributs
            //créer une source une source 
            //créer les attributs
            //mettre la source dans la video
            //mettre la video dans l'article
        } 
      
        if(image){
            const src = `assets/photographers/${fullname[0]}/${image}`;
            const img = document.createElement( 'img' );
            img.classList.add("set");
            img.setAttribute("src", src)
            article.appendChild(img);
        }
    
        const p = document.createElement( 'p' );   
        p.textContent = title;
        article.appendChild(p);
       
      /*
       const article = document.createElement( 'article' ); 
       const display = document.createElement( 'div' );
       display.classList.add("display");
       const media = document.createElement( 'div' );
       media.classList.add("card");
       const display = document.createElement( 'div' );
       media-img.classList.add("media-img");
       const img = document.createElement( 'img' );
       img.setAttribute("src", picture)
       const name_div = document.createElement( 'div' );
       name_div.classList.add("name");
       const title = document.createElement( 'p' );
       const like = document.createElement( 'p' );
       const heart = document.createElement( 'i' );
       heart.classList.add("fa","fa-heart");
       */
     return (article);
            
    }
    return {getMediaCardDOM}


}