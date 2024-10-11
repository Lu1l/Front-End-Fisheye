let mediaData = [];
let currentIndex = 0;
let likedMedia = new Set();
let fullname = [];
let total;

function getPhotographerId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get('id'));
}

function mediaTemplate(data, photographerName) {
  const { id, title, image, likes, video } = data;
  const { name } = photographerName;
  fullname = name.split(" ");

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card");
    let mediaElement;

    if (video) {
      const ctr_video = document.createElement("video");
      ctr_video.controls = true;
      ctr_video.classList.add("vid");
      const src = `assets/photographers/${fullname[0]}/${video}`;
      const media_video = document.createElement("source");
      media_video.setAttribute("src", src);
      ctr_video.appendChild(media_video);
      article.appendChild(ctr_video);
      mediaElement = ctr_video;
    }

    if (image) {
      const src = `assets/photographers/${fullname[0]}/${image}`;
      const img = document.createElement("img");
      img.classList.add("set");
      img.setAttribute("src", src);
      img.setAttribute("alt", title);
      article.appendChild(img);
      mediaElement = img;
    }

    const title_like = document.createElement("div");
    title_like.classList.add("title-like");
    const p = document.createElement("p");
    p.textContent = title;

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");
    const likeCount = document.createElement("span");
    likeCount.textContent = likes;
    likeCount.classList.add("like-count");

    const heart = document.createElement("i");
    heart.classList.add("fa", "fa-heart");
    if (likedMedia.has(id)) {
      heart.classList.add("liked");
    }

    heart.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentLikes = parseInt(likeCount.textContent);
      if (likedMedia.has(id)) {
        likedMedia.delete(id);
        heart.classList.remove("liked");
        likeCount.textContent = currentLikes - 1;
      } else {
        likedMedia.add(id);
        heart.classList.add("liked");
        likeCount.textContent = currentLikes + 1;
      }
      updateTotalLikes();
    });

    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(heart);
    p.appendChild(likeContainer);
    article.appendChild(p);

    if (mediaElement) {
      mediaElement.addEventListener("click", () => openModal(id));
    }

    return article;
  }

  return { getMediaCardDOM };
}

function updateTotalLikes() {
  const totalLikesElement = document.getElementById('totalLikes');
  if (totalLikesElement) {
    let total = 0;
    mediaData.forEach(media => {
      total += likedMedia.has(media.id) ? media.likes + 1 : media.likes;
      console.log("total de like",total);
    });
    
   
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fa', 'fa-heart');
    
    totalLikesElement.innerHTML = ''; 
    totalLikesElement.textContent = total + ' '; 
    totalLikesElement.appendChild(likeIcon);
    console.log("nombre de like total",totalLikesElement)
  }
}


async function init() {
  const photographerId = getPhotographerId();
  const data = await loadData();
  
  if (data && photographerId) {
    const photographer = data.photographers.find(p => p.id === photographerId);
    if (!photographer) {
      console.error("Photographe non trouvé");
      return;
    }
    
    const photographerName = photographer.name;
    mediaData = data.media.filter(item => item.photographerId === photographerId);
    
    let totalLikesContainer = document.getElementById('totalLikesContainer');
    if (!totalLikesContainer) {
      totalLikesContainer = document.createElement('div');
      totalLikesContainer.id = 'totalLikesContainer';
      totalLikesContainer.classList.add('total-likes-container');
      
      const totalLikesElement = document.createElement('span');
      totalLikesElement.id = 'totalLikes';
      totalLikesContainer.appendChild(totalLikesElement);
      
 
      document.querySelector('main').appendChild(totalLikesContainer);
    }
    
    createGallery(mediaData, photographerName);
    updateTotalLikes(); 
    


  }
}
function openModal(id) {
  const modal = document.getElementById("modal");
  currentIndex = mediaData.findIndex((item) => item.id === id);
  updateModalContent();
  modal.style.display = "block";
  
}

function closeModal2() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function prevImage() {
  currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
  updateModalContent();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % mediaData.length;
  updateModalContent();
}

function updateModalContent() {
  const modalContainer = document.getElementById("modalContent");
  modalContainer.innerHTML = '';
  
  const currentMedia = mediaData[currentIndex];
  const { image, video, title } = currentMedia;

  let mediaElement;
  if (image) {
    mediaElement = document.createElement("img");
    mediaElement.src = `assets/photographers/${fullname[0]}/${image}`;
    mediaElement.alt = title;
  } else if (video) {
    mediaElement = document.createElement("video");
    mediaElement.controls = true;
    const source = document.createElement("source");
    source.src = `assets/photographers/${fullname[0]}/${video}`;
    mediaElement.appendChild(source);
  }
  
  mediaElement.id = "modalImage";
  
  const titleElement = document.createElement("p");
  titleElement.classList.add("modal-title");
  titleElement.textContent = title;
  
  modalContainer.appendChild(mediaElement);
  modalContainer.appendChild(titleElement);
}

async function loadData() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
}

function createGallery(media, photographerName) {
  const galleryContainer = document.getElementById("gallery");
  galleryContainer.innerHTML = '';
  
  media.forEach((item) => {
    const mediaCard = mediaTemplate(item, { name: photographerName });
    galleryContainer.appendChild(mediaCard.getMediaCardDOM());
  });
}

async function init() {
  const photographerId = getPhotographerId();
  const data = await loadData();
  
  if (data && photographerId) {
    const photographer = data.photographers.find(p => p.id === photographerId);
    if (!photographer) {
      console.error("Photographe non trouvé");
      return;
    }
    
    const photographerName = photographer.name;
    mediaData = data.media.filter(item => item.photographerId === photographerId);
    createGallery(mediaData, photographerName);
    updateTotalLikes();

    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    console.log("bonton close",closeBtn)

    // Gestion des clics sur les boutons
    closeBtn.addEventListener("click", closeModal2);
    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });


    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        switch(e.key) {
          case "Escape":
          case "e":
            closeModal2();
            break;
          case "ArrowLeft":
            prevImage();
            break;
          case "ArrowRight":
            nextImage();
            break;
        }
      }
    });
  }
}

init();