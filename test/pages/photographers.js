let UnSeulPhotographeMedias
let photographers
import getPhotographers from "../pages/index"

  // id = 7
  async function getPhotographersByid(ident) { 
    photographers = await getPhotographers(); // Toutes les infos des photographes
    //console.log(photographers); // Toutes les infos des photographes
    const UnSeulPhotographe = photographers.photographers.find(photographer => photographer.id == ident); //filter, map ou find
    
    console.log(UnSeulPhotographe);
    const UnSeulPhotographeMedias = photographers.media.filter(media => media.photographerId == ident); 
    console.log(UnSeulPhotographeMedias)
    console.log(UnSeulPhotographe)
    return UnSeulPhotographe;
  }
  
  async function displayData(photographer) {
   // console.log(photographer);
      const singlephotographersSection = document.querySelector(".container");
      const photographerModel =  singlephotographerTemplate(photographer);
      //console.log(photographerModel)
      const singleuserCardDOM = photographerModel.getSingleUserCardDOM();
      //console.log(singlephotographersSection)
      singlephotographersSection.appendChild(singleuserCardDOM);

      /*const mediaSection = document.querySelector(".photograper_media");
      const mediaModel =  mediaTemplate(photographer);
      //console.log(photographerModel)
      const singleuserCardDOM = photographerModel.getSingleUserCardDOM();
      //console.log(mediaSection)
      mediaSection.appendChild(singleuserCardDOM);*/
  }
 
  
  async function init() {
    // Récupère les datas des photographes
    photographers = await getPhotographers();
    var parameter = location.search.split('=');
    //console.log((parameter[1]))
    let singlePhotographer = await getPhotographersByid((parameter[1]));
    console.log(singlePhotographer);
    displayData(singlePhotographer);
  }
  
  init();
  