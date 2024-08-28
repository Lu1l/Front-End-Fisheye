function singlephotographerTemplate(data) {
    const { name, portrait, country , city,tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getSingleUserCardDOM() {
        
        const profile = document.createElement( 'div' );
       /* article.addEventListener('click', function() { 
            //alert('Erreur');
            RedirectionJavascript();
          }, false);*/
       // const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h1 = document.createElement( 'h1' );
        const location = document.createElement( 'p' );
        const pgTagline = document.createElement( 'p' );     
        h1.textContent = name;
        pgTagline.textContent = tagline;
        location.textContent = country+", "+city;
        location.classList.add("countryCity");
       // profile.classList.add("tabclas");
       // console.log(article.ariaSelected); // true
        // article.setAttribute("aria-quelquechose", "nanani")
        //article.ariaSelected = "true";
        //console.log(article.ariaSelected); // false
        //profile.appendChild(img);
        profile.appendChild(h1);
        profile.appendChild(location);
        profile.appendChild(pgTagline);
        return (profile);


        //


       /* function RedirectionJavascript(){

            document.location.href= "photographer.html?id="+id;
            
            }*/
    }
    return {getSingleUserCardDOM}


}