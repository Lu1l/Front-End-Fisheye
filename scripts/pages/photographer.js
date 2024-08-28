

let photographers
let UnSeulPhotographeMedias

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const response = await fetch('../data/photographers.json');
  
    let json = await response.json();    
    // console.log(json);
  
    // et bien retourner le tableau photographers seulement une fois récupéré
    return json;
    
  }

  // id = 7
  async function getPhotographersByid(ident) { 
    photographers = await getPhotographers(); // Toutes les infos des photographes
   // console.log(photographers); // Toutes les infos des photographes
    const UnSeulPhotographe = photographers.photographers.find(photographer => photographer.id == ident); //filter, map ou find
    console.log(UnSeulPhotographe);
    const UnSeulPhotographeMedias = photographers.media.filter(media => media.photographerId == ident); 
    console.log(UnSeulPhotographeMedias);
    
    
  }
  
  async function displayData(photographer) {
    const singlephotographersSection = document.querySelector(".photographer_card");
 
      const photographerModel = singlephotographerTemplate(photographer);
      console.log(photographerModel)
      const singleuserCardDOM = photographerModel.getSingleUserCardDOM();
      
      singlephotographersSection.appendChild(singleuserCardDOM);
      
    
  }
 
  
  async function init() {
    // Récupère les datas des photographes
     photographers  = await getPhotographers();
    var parameter = location.search.split('=');
    console.log(typeof Number(parameter[1]))
    let singlePhotographer = await getPhotographersByid(Number(parameter[1]));
  
    await displayData(singlePhotographer);
  }
  
  init();
  