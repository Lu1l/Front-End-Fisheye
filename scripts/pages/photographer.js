let UnSeulPhotographeMedias
let photographers
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
    //console.log(photographers); // Toutes les infos des photographes
    const UnSeulPhotographe = photographers.photographers.find(photographer => photographer.id == ident); //filter, map ou find
    
    
    const UnSeulPhotographeMedias = photographers.media.filter(media => media.photographerId == ident); 
   
  
    //return UnSeulPhotographe;
    return [UnSeulPhotographe, UnSeulPhotographeMedias]
    /*= return {UnSeulPhotographe, UnSeulPhotographeMedias} Objet*/
  }


  async function displayData(photographer, medias) {
   // console.log(photographer);
   const singlephotographersSection = document.querySelector(".container"); 

   const photographerModel =  singlephotographerTemplate(photographer);
      //console.log(photographerModel)
      const singleuserCardDOM = photographerModel.getSingleUserCardDOM();
      //console.log(singlephotographersSection)
      singlephotographersSection.appendChild(singleuserCardDOM);
      for (let i in medias){
        //dans cette boucle,call media model + mediacardom + mediasection.appendChild
        const mediaSection = document.querySelector(".photograper_media");
        const mediaModel =  mediaTemplate(medias[i], photographer);
        //console.log("PHOTOGRAPH => ",photographer)
        const MediaCardDOM = mediaModel.getMediaCardDOM();
        //console.log(mediaSection)
        mediaSection.appendChild(MediaCardDOM);
      }
      
  }
 
  
  async function init() {
    // Récupère les datas des photographes
    photographers = await getPhotographers();
    var parameter = location.search.split('=');
    //console.log((parameter[1]))
    let getSinglePhotographer = await getPhotographersByid((parameter[1]));
    let singlePhotographer = getSinglePhotographer[0];
    let singlePhotographermedia = getSinglePhotographer[1];

    /*createLightbox();

    const closeBtn = document.querySelector('#lightbox .close');
    closeBtn.addEventListener('click', () => {
        document.getElementById('lightbox').style.display = 'none';
    });*/
    displayData(singlePhotographer, singlePhotographermedia); //undefined document non found
  }
  
  init();
  