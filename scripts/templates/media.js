function photographerTemplate(data) {
    const { name, portrait, price, country , city,tagline,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        article.addEventListener('click', function() { 
            //alert('Erreur');
            RedirectionJavascript();
          }, false);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const pgTagline = document.createElement( 'p' );   
        const pgPrice = document.createElement( 'p' ); 
        h2.textContent = name;
        pgTagline.textContent = tagline;
        pgPrice.textContent = price+" €"+"/jour";
        pgPrice.classList.add("price");
        h3.textContent = country+", "+city;
        h3.classList.add("countryCity");

        article.classList.add("tabclas");
        console.log(article.ariaSelected); // true
        // article.setAttribute("aria-quelquechose", "nanani")
        article.ariaSelected = "true";
        console.log(article.ariaSelected); // false

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pgTagline);
        article.appendChild(pgPrice);
        return (article);

        function RedirectionJavascript(){

            document.location.href= "photographer.html?id="+id;
            
            }
    }
    return {getUserCardDOM}


}