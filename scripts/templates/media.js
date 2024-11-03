let mediaData = [];
let currentIndex = 0;
let likedMedia = new Set();
let photographerName = null;
let currentSortMethod = "title";

function getPhotographerId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get("id"));
}

function createSortDropdown() {
  const sortContainer = document.createElement("div");
  sortContainer.classList.add("sort-container");

  const label = document.createElement("label");
  label.textContent = "Trier par : ";
  label.setAttribute("for", "sort-select");

  const select = document.createElement("select");
  select.id = "sort-select";
  select.setAttribute("aria-label", "Trier les médias par");
  select.setAttribute("tabindex", "0");

  const options = [
    { value: "title", text: "Titre" },
    { value: "date", text: "Date" },
    { value: "likes", text: "Popularité" },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    select.appendChild(optionElement);
  });

  select.addEventListener("change", (e) => {
    currentSortMethod = e.target.value;
    sortAndDisplayMedia();
  });

  sortContainer.appendChild(label);
  sortContainer.appendChild(select);

  return sortContainer;
}

function sortMedia(mediaArray) {
  return [...mediaArray].sort((a, b) => {
    switch (currentSortMethod) {
      case "title":
        return a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "likes":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });
}

function sortAndDisplayMedia() {
  const sortedMedia = sortMedia(mediaData);
  createGallery(sortedMedia);
}

function mediaTemplate(data) {
  const { id, title, image, likes, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.classList.add("media-card");
    let mediaElement;

    if (video) {
      const ctr_video = document.createElement("video");
      ctr_video.controls = true;
      ctr_video.classList.add("vid");
      ctr_video.setAttribute("tabindex", "0");
      const src = `assets/photographers/${photographerName}/${video}`;
      const media_video = document.createElement("source");
      media_video.setAttribute("src", src);
      ctr_video.appendChild(media_video);
      article.appendChild(ctr_video);
      mediaElement = ctr_video;
    }

    if (image) {
      const src = `assets/photographers/${photographerName}/${image}`;

      const img = document.createElement("img");
      img.classList.add("set");
      img.setAttribute("src", src);
      img.setAttribute("alt", title);
      img.setAttribute("tabindex", "0");
      article.appendChild(img);
      mediaElement = img;
    }

    const title_like = document.createElement("div");
    title_like.classList.add("title-like");
    const p = document.createElement("p");
    p.classList.add("title-color");
    p.textContent = title;

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");
    const likeCount = document.createElement("span");
    likeCount.textContent = likes;
    likeCount.classList.add("like-count");

    const heart = document.createElement("span");
    heart.classList.add("fa", "fa-heart");
    heart.setAttribute("tabindex", "0");
    heart.setAttribute("role", "button");
    heart.setAttribute("aria-label", "Aimer ce média");
    if (likedMedia.has(id)) {
      heart.classList.add("liked");
    }

    heart.addEventListener("click", handleLikeAction);
    heart.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLikeAction(e);
      }
    });

    function handleLikeAction(e) {
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
    }

    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(heart);
    p.appendChild(likeContainer);
    article.appendChild(p);

    if (mediaElement) {
      mediaElement.addEventListener("click", () => openModal(id));
      mediaElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          openModal(id);
        }
      });
    }

    return article;
  }

  return { getMediaCardDOM };
}

function updateTotalLikes() {
  const totalLikesElement = document.getElementById("totalLikes");
  if (totalLikesElement) {
    let total = 0;
    mediaData.forEach((media) => {
      total += likedMedia.has(media.id) ? media.likes + 1 : media.likes;
    });

    const likeIcon = document.createElement("span");
    likeIcon.classList.add("fa", "fa-heart");
    totalLikesElement.innerHTML = "";
    totalLikesElement.textContent = `Likes : ${total} `;
    totalLikesElement.appendChild(likeIcon);
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
  modalContainer.innerHTML = "";

  const currentMedia = mediaData[currentIndex];
  const { image, video, title } = currentMedia;

  let mediaElement;
  if (image) {
    mediaElement = document.createElement("img");
    mediaElement.src = `assets/photographers/${photographerName}/${image}`;
    mediaElement.alt = title;
    mediaElement.setAttribute("tabindex", "0");
  } else if (video) {
    mediaElement = document.createElement("video");
    mediaElement.controls = true;
    mediaElement.setAttribute("tabindex", "0");
    const source = document.createElement("source");
    source.src = `assets/photographers/${photographerName}/${video}`;
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

async function createGallery(media) {
  const galleryContainer = document.getElementById("gallery");
  galleryContainer.innerHTML = "";

  media.forEach((item) => {
    const mediaCard = mediaTemplate(item);
    galleryContainer.appendChild(mediaCard.getMediaCardDOM());
  });
}

async function init() {
  const photographerId = getPhotographerId();
  const data = await loadData();

  if (data && photographerId) {
    const photographer = data.photographers.find(
      (p) => p.id === photographerId
    );
    if (!photographer) {
      console.error("Photographe non trouvé");
      return;
    }

    photographerName = photographer.name.split(" ")[0];
    mediaData = data.media.filter(
      (item) => item.photographerId === photographerId
    );

    const gallerySection = document.getElementById("gallery").parentElement;
    const sortDropdown = createSortDropdown();
    gallerySection.insertBefore(
      sortDropdown,
      document.getElementById("gallery")
    );

    const priceAndLikesContainer = document.createElement("div");
    priceAndLikesContainer.classList.add("fixed-div");
    priceAndLikesContainer.setAttribute(
      "aria-label",
      "Informations du photographe"
    );

    const priceElement = document.createElement("span");
    priceElement.textContent = `${photographer.price}€ / jour`;
    priceElement.classList.add("photographer-price");

    let totalLikesContainer = document.createElement("div");
    totalLikesContainer.id = "totalLikesContainer";
    totalLikesContainer.classList.add("total-likes-container");

    const totalLikesElement = document.createElement("span");
    totalLikesElement.id = "totalLikes";
    totalLikesContainer.appendChild(totalLikesElement);

    priceAndLikesContainer.appendChild(priceElement);
    priceAndLikesContainer.appendChild(totalLikesElement);
    document.querySelector("main").appendChild(priceAndLikesContainer);

    sortAndDisplayMedia();
    updateTotalLikes();

    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    closeBtn.addEventListener("click", closeModal2);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        closeModal2();
      }
    });

    prevBtn.addEventListener("click", prevImage);
    prevBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        prevImage();
      }
    });

    nextBtn.addEventListener("click", nextImage);
    nextBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextImage();
      }
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal2();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        switch (e.key) {
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

    closeBtn.setAttribute("tabindex", "0");
    prevBtn.setAttribute("tabindex", "0");
    nextBtn.setAttribute("tabindex", "0");
  }
}

init();
