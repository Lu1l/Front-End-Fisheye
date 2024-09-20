function mediaTemplate(data, result) {
    const { title, image, likes, photographerId, date,video } = data;
    const { name } = result;
    const fullname = name.split(" ");
   

    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <span class="close">&times;</span>
            <div class="content">
                <img id="lightbox-img" src="" alt="">
                <video id="lightbox-video" controls></video>
            </div>
            <span class="arrow arrow-left">&#10094;</span>
            <span class="arrow arrow-right">&#10095;</span>
            <div class="title"></div>
        `;
        document.body.appendChild(lightbox);
    
        // Ajout des styles pour la lightbox
        const style = document.createElement('style');
        style.textContent = `
            #lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                justify-content: center;
                align-items: center;
            }
            #lightbox img,
            #lightbox video {
                max-width: 90%;
                max-height: 90%;
            }
            .close {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 24px;
                color: white;
                cursor: pointer;
            }
            .title {
                position: absolute;
                bottom: 10px;
                color: white;
                font-size: 18px;
            }
            .arrow {
                position: absolute;
                top: 50%;
                font-size: 30px;
                color: white;
                cursor: pointer;
                user-select: none;
                transform: translateY(-50%);
            }
            .arrow-left {
                left: 20px;
            }
            .arrow-right {
                right: 20px;
            }
        `;
        document.head.appendChild(style);
    }
    
    function getMediaCardDOM() {
        const article = document.createElement( 'article' ); 
        if(video){
            const ctr_video = document.createElement( 'video' );
            ctr_video.controls = true;
            ctr_video.classList.add("vid");
            const src = `assets/photographers/${fullname[0]}/${video}`;
            const media_video = document.createElement( 'source' );
            media_video.setAttribute("src", src)
            ctr_video.appendChild(media_video);
            article.appendChild(ctr_video)
        } 
      
        if(image){
            const src = `assets/photographers/${fullname[0]}/${image}`;
            const img = document.createElement( 'img' );
            img.classList.add("set");
            img.setAttribute("src", src)
            article.appendChild(img);
        }
    
        const p = document.createElement( 'p' );   
        p.textContent = title;
        article.appendChild(p);
       
      /*
       const article = document.createElement( 'article' ); 
       const display = document.createElement( 'div' );
       display.classList.add("display");
       const media = document.createElement( 'div' );
       media.classList.add("card");
       const display = document.createElement( 'div' );
       media-img.classList.add("media-img");
       const img = document.createElement( 'img' );
       img.setAttribute("src", picture)
       const name_div = document.createElement( 'div' );
       name_div.classList.add("name");
       const title = document.createElement( 'p' );
       const like = document.createElement( 'p' );
       const heart = document.createElement( 'i' );
       heart.classList.add("fa","fa-heart");
       */
     return (article);
            
    }
    return {getMediaCardDOM}

    function openLightbox(mediaElement, title) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideo = document.getElementById('lightbox-video');
        const titleDisplay = lightbox.querySelector('.title');
    
        if (mediaElement.tagName === 'IMG') {
            lightboxImg.src = mediaElement.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
        } else if (mediaElement.tagName === 'VIDEO') {
            lightboxVideo.src = mediaElement.querySelector('source').src;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
        }
    
        titleDisplay.textContent = title;
        lightbox.style.display = 'flex';
    }
}