function mediaTemplate(data, result) {
    const { title, image, likes, photographerId, date } = data;
    const { name } = result;
    const fullname = name.split(" ");
    console.log(title)
    const picture = `assets/photographers/${fullname[0]}/${image}`;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );  
        const img = document.createElement( 'img' );
        img.classList.add("set");
        img.setAttribute("src", picture)
        const p = document.createElement( 'p' );   
        p.textContent = title;
        article.appendChild(img);
        article.appendChild(p);
        return (article);

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
       heart.classList.add("fa");
       heart.classList.add("fa-heart");
        */
            
    }
    return {getMediaCardDOM}


}