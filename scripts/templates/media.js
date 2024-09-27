let mediaData = [];
        let currentIndex = 0;

        // Fonction pour créer le template de média
        function mediaTemplate(data, result) {
            const { id, title, image, likes, date, video } = data;
            const { name } = result;
            const fullname = name.split(" ");
            console.log("Name === "+fullname);
            function getMediaCardDOM() {
                const article = document.createElement('article');
                article.classList.add('media-card');
                let mediaElement;

                if (video) {
                    const ctr_video = document.createElement('video');
                    ctr_video.controls = true;
                    ctr_video.classList.add("vid");
                    const src = `assets/photographers/${fullname[0]}/${video}`;
                    const media_video = document.createElement('source');
                    media_video.setAttribute("src", src);
                    ctr_video.appendChild(media_video);
                    article.appendChild(ctr_video);
                    mediaElement = ctr_video;
                }

                if (image) {
                    const src = `assets/photographers/${fullname[0]}/${image}`;
                    const img = document.createElement('img');
                    img.classList.add("set");
                    img.setAttribute("src", src);
                    article.appendChild(img);
                    mediaElement = img;
                }

                const title_like = document.createElement('div');
                title_like.classList.add("title-like");
                const p = document.createElement('p'); 
                p.textContent = title;

                const like = document.createElement('p');
                like.textContent = likes;

                const heart = document.createElement('i');
                heart.classList.add("fa");
                heart.classList.add("fa-heart");
                like.appendChild(heart);
                title_like.appendChild(p);
                title_like.appendChild(like);
                article.appendChild(title_like);

                if (mediaElement) {
                    mediaElement.addEventListener('click', () => openModal(id));
                }

                return article;
            }

            return { getMediaCardDOM };
        }

        // Fonction pour ouvrir la modal
        function openModal(id) {
            const modal = document.getElementById('modal');
            currentIndex = mediaData.findIndex(item => item.id === id);
            updateModalContent();
            modal.style.display = 'block';
        }

        // Fonction pour fermer la modal
        function closeModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }

        // Fonction pour naviguer vers l'image précédente
        function prevImage() {
            currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
            updateModalContent();
        }

        // Fonction pour naviguer vers l'image suivante
        function nextImage() {
            currentIndex = (currentIndex + 1) % mediaData.length;
            updateModalContent();
        }

        // Fonction pour mettre à jour le contenu de la modal
        function updateModalContent() {
            const modalImage = document.getElementById('modalImage');
            const { image, video, name } = mediaData[currentIndex];
            const fullname = name.split(" ");

            if (image) {
                modalImage.src = `assets/photographers/${fullname[0]}/${image}`;
            } else if (video) {
                modalImage.src = `assets/photographers/${fullname[0]}/${video}`;
            }
        }

        // Fonction pour charger les données
        async function loadData() {
            try {
                const response = await fetch('data/photographers.json');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        }

        // Fonction pour créer la galerie
        function createGallery(media, photographers) {
            const galleryContainer = document.getElementById('gallery');
            media.forEach(item => {
                const photographer = photographers.find(p => p.id === item.photographerId);
                const mediaCard = mediaTemplate(item, photographer.name);
                galleryContainer.appendChild(mediaCard.getMediaCardDOM());
            });
        }

        // Initialisation
        async function init() {
            const closeBtn = document.querySelector('.close');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');

            closeBtn.addEventListener('click', closeModal);
            prevBtn.addEventListener('click', prevImage);
            nextBtn.addEventListener('click', nextImage);

            const data = await loadData();
            if (data) {
                mediaData = data.media.map(item => ({
                    ...item,
                    name: data.photographers.find(p => p.id === item.photographerId).name
                }));
                createGallery(data.media, data.photographers);
            }
        }

        init();