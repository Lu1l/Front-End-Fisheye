
function singlephotographerTemplate(data) {
    const { name, portrait, country, city, tagline, price, likes } = data;
    
    const picture = `assets/photographers/${portrait}`;

    function getSingleUserCardDOM() {
        const articles = document.createElement('article');
        articles.classList.add("container");
        articles.setAttribute("aria-label", `Profil de ${name}`);

        const profile = document.createElement('div');
        profile.classList.add('photographer_card');
        profile.setAttribute("tabindex", "0");

        const button = document.createElement('button');
        button.addEventListener('click', function() { 
            displayModal();
        }, false);
        button.classList.add("contact_button");
        button.textContent = "Contactez moi";
        button.setAttribute("aria-label", `Contacter ${name}`);
        button.setAttribute("tabindex", "0");

        const img = document.createElement('img');
        img.classList.add("photographer_cover");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.setAttribute("tabindex", "0");

        const h1 = document.createElement('h1');
        h1.setAttribute("tabindex", "0");

        const location = document.createElement('p');
        location.setAttribute("tabindex", "0");
        location.setAttribute("aria-label", `Localisation: ${country}, ${city}`);

        const pgTagline = document.createElement('p');
        pgTagline.setAttribute("tabindex", "0");
        pgTagline.setAttribute("aria-label", `Slogan: ${tagline}`);

        h1.textContent = data.name;
        pgTagline.textContent = tagline;
        location.textContent = country + ", " + city;
        location.classList.add("countryCity");

        profile.appendChild(h1);
        profile.appendChild(location);
        profile.appendChild(pgTagline);

        articles.appendChild(profile);
        articles.appendChild(button);
        articles.appendChild(img);

        const div = document.createElement('div');
        div.classList.add('f');
        div.setAttribute("aria-label", "Informations du photographe");
        div.setAttribute("tabindex", "0");

        const pricePerDay = document.createElement('p');
        pricePerDay.textContent = price + "€/Jour";
        pricePerDay.setAttribute("tabindex", "0");
        pricePerDay.setAttribute("aria-label", `Prix par jour: ${price} euros`);

        const likesElement = document.createElement('p');
        const globalLikes = getGlobalLikes();
        likesElement.textContent = `${globalLikes} ♥`;
        likesElement.setAttribute("tabindex", "0");
        likesElement.setAttribute("aria-label", `Nombre total de likes: ${globalLikes}`);

       
      
        document.body.appendChild(div);

        return (articles);
    }

   function displayModal() {
      const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }
  
    function closeModal() {
      const modal = document.getElementById("contact_modal");
      modal.style.display = "none";
  }
  
    return {getSingleUserCardDOM}


}

// Modify this function to get the global likes from media.js
function getGlobalLikes() {
    // Assuming there's a function in media.js to get the global likes
    return typeof getGlobalLikesFromMedia === 'function' ? getGlobalLikesFromMedia() : 0;
}
