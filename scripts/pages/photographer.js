let UnSeulPhotographeMedias;
let photographers;
async function getPhotographers() {
  const response = await fetch("../data/photographers.json");

  let json = await response.json();

  return json;
}

async function getPhotographersByid(ident) {
  photographers = await getPhotographers();
  const UnSeulPhotographe = photographers.photographers.find(
    (photographer) => photographer.id == ident
  );

  const UnSeulPhotographeMedias = photographers.media.filter(
    (media) => media.photographerId == ident
  );

  return [UnSeulPhotographe, UnSeulPhotographeMedias];
}

async function displayData(photographer, medias) {
  const singlephotographersSection = document.querySelector(".container");

  const photographerModel = singlephotographerTemplate(photographer);

  const singleuserCardDOM = photographerModel.getSingleUserCardDOM();

  singlephotographersSection.appendChild(singleuserCardDOM);
  for (let i in medias) {
    const mediaSection = document.querySelector(".photograper_media");
    const mediaModel = mediaTemplate(medias[i], photographer);

    const MediaCardDOM = mediaModel.getMediaCardDOM();

    mediaSection.appendChild(MediaCardDOM);
  }
}

async function init() {
  photographers = await getPhotographers();
  var parameter = location.search.split("=");
  let getSinglePhotographer = await getPhotographersByid(parameter[1]);
  let singlePhotographer = getSinglePhotographer[0];
  let singlePhotographermedia = getSinglePhotographer[1];
  displayData(singlePhotographer, singlePhotographermedia);
}

init();
