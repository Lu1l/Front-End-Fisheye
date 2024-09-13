function singlephotographerTemplate(data) {
    const { name, portrait, country , city,tagline } = data;
    console.log(data)
    const picture = `assets/photographers/${portrait}`;

    function getSingleUserCardDOM() {
        const articles = document.createElement('article');
        articles.classList.add("container");
        const profile = document.createElement( 'div');
        profile.classList.add('photographer_card');
        const button = document.createElement('button');
        button.addEventListener('click', function() { 
          //alert('Erreur');
           displayModal();
        }, false);
        button.classList.add("contact_button");
        button.textContent = "Contactez moi";
        const img = document.createElement( 'img' );
        img.classList.add("photographer_cover");
        img.setAttribute("src", picture);
        const h1 = document.createElement( 'h1' );
        const location = document.createElement( 'p' );
        const pgTagline = document.createElement( 'p' );     
        h1.textContent = data.name;
        pgTagline.textContent = tagline;
        location.textContent = country+", "+city;
        location.classList.add("countryCity");
        profile.appendChild(h1);
        profile.appendChild(location);
        profile.appendChild(pgTagline);
        articles.appendChild(profile);
        articles.appendChild(button);
        articles.appendChild(img);
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

/* 
function singlephotographerTemplate(data) {
    const { name, portrait, country , city,tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    const preparé = getSingleUserCardDOM(data)

  
  
  
    return preparé

}

export function getSingleUserCardDOM(data) {
  const articles = document.createElement('article');
  articles.classList.add("container");
  const profile = document.createElement( 'div');
  profile.classList.add('photographer_card');
  const button = document.createElement('button');
  button.addEventListener('click', function() { 
    //alert('Erreur');
     displayModal(variableModal);
  }, false);
  button.classList.add("contact_button");
  button.textContent = "Contactez moi";
  const img = document.createElement( 'img' );
  img.classList.add("photographer_cover");
  img.setAttribute("src", picture);
  const h1 = document.createElement( 'h1' );
  const location = document.createElement( 'p' );
  const pgTagline = document.createElement( 'p' );     
  h1.textContent = data.name;
  pgTagline.textContent = tagline;
  location.textContent = country+", "+city;
  location.classList.add("countryCity");
  profile.appendChild(h1);
  profile.appendChild(location);
  profile.appendChild(pgTagline);
  articles.appendChild(profile);
  articles.appendChild(button);
  articles.appendChild(img);
  return (articles);
}


export function displayModal(modal) {
modal.style.display = "block";
}

export function closeModal(modal) {
  modal.style.display = "none";
}



*/