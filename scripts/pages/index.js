async function getPhotographers() {
  const response = await fetch("../data/photographers.json");

  let json = await response.json();
  console.log(json);

  return json;
}
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();

  displayData(photographers);
}

init();
