var  photographers;

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    const response = await fetch('../data/photographers.json');
  
    let json = await response.json();    
     console.log(json);
  
    // et bien retourner le tableau photographers seulement une fois récupéré
    return json;
    
  }

  async function getPhotographersByid(ident) {
    const { name, portrait, price, country , city,tagline,id } = photographers;
    console.log(photographers.name);
  }
 
  
  async function init() {
    // Récupère les datas des photographes
    photographers = await getPhotographers();

    var parameter = location.search.split('=');
    getPhotographersByid(parameter[1]);
  }
  
  init();
  