function photographerTemplate(data) {
    const { name, portrait, price, country, city, tagline, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("aria-label", `Carte du photographe ${name}`);
        article.setAttribute("tabindex", "0");
        article.addEventListener('click', function() { 
            redirectToPhotographerPage(id);
        }, false);
        
      
        article.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                redirectToPhotographerPage(id);
            }
        }, false);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("aria-label", `Nom du photographe: ${name}`);

        const h3 = document.createElement('h3');
        h3.textContent = `${country}, ${city}`;
        h3.setAttribute("aria-label", `Localisation: ${country}, ${city}`);
        h3.classList.add("countryCity");

        const pgTagline = document.createElement('p');   
        pgTagline.textContent = tagline;
        pgTagline.setAttribute("aria-label", `Slogan: ${tagline}`);

        const pgPrice = document.createElement('p'); 
        pgPrice.textContent = `${price} €/jour`;
        pgPrice.setAttribute("aria-label", `Tarif: ${price} euros par jour`);
        pgPrice.classList.add("price");

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pgTagline);
        article.appendChild(pgPrice);

        return article;
    }

    function redirectToPhotographerPage(photographerId) {
        document.location.href = `photographer.html?id=${photographerId}`;
    }

    return { getUserCardDOM };
}
