function mediaTemplate(data, result) {
    const { title, image, likes, photographerId, date } = data;
    const { name } = result;
    const fullname = name.split(" ");
    console.log(title)
    const picture = `assets/photographers/${fullname[0]}/${image}`;

    function getMediaCardDOM() {

        const article = document.createElement( 'article' );  
        const card_div = document.createElement( 'div' );
        pgPrice.classList.add("display");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const p = document.createElement( 'p' );   
        p.textContent = title;
        article.appendChild(img);
        article.appendChild(p);
        
        return (article);

       
            
    }
    return {getMediaCardDOM}


}