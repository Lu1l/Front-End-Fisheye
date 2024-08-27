let  photographers
let UnSeulPhotographeMedias

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const response = await fetch('../data/photographers.json');
  
    let json = await response.json();    
    
  
    // et bien retourner le tableau photographers seulement une fois récupéré
    return json;
    
  }

  // id = 7
  async function getPhotographersByid(ident) { 
    
    const UnSeulPhotographe = photographers.photographers.find(photographer => photographer.id == ident); //filter, map ou find
    console.log(UnSeulPhotographe);
    const UnSeulPhotographeMedias = photographers.media.filter(media => media.photographerId == ident); 
    console.log(UnSeulPhotographeMedias);
       
  }
   
  async function init() {
    // Récupère les datas des photographes
    photographers = await getPhotographers();
    var parameter = location.search.split('=');
    getPhotographersByid(parameter[1]);
  }
  
  init();
  