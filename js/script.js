// Particles Js Settings
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: !0,
                value_area: 800
            }
        },
        color: {
            value: "#130F26"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#130F26"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: .5,
            random: !1,
            anim: {
                enable: !1,
                speed: .5,
                opacity_min: .1,
                sync: !1
            }
        },
        size: {
            value: 5,
            random: !0,
            anim: {
                enable: !1,
                speed: 40,
                size_min: .1,
                sync: !1
            }
        },
        line_linked: {
            enable: !0,
            distance: 150,
            color: "#130F26",
            opacity: .4,
            width: 1
        },
        move: {
            enable: !0,
            speed: 6,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            attract: {
                enable: !1,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "grab"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    retina_detect: !0,
    config_demo: {
        hide_card: !1,
        background_color: "#b61924",
        background_image: "",
        background_position: "top",
        background_repeat: "no-repeat",
        background_size: "cover"
    }
});

function setupNav() {
    const currentUrl = document.location.href;
    const navListItems = document.querySelectorAll('.menu-item');

    navListItems.forEach(navListItem => {
        const navLink = navListItem.querySelector('a');
        if (navLink.href === currentUrl) {
            navListItem.classList.add('active');
        } else {
            navListItem.classList.remove('active');
        }
    });
}

function setupBurgerMenu() {
    const navMenu = document.querySelector('.menu-responsive');
    const burgerBtn = document.querySelector('.menu-burger');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const logo = document.querySelector('.hello');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('menu-active');
        burgerBtn.classList.toggle('active');
        main.classList.toggle('blurred');
        footer.classList.toggle('blurred');
        logo.classList.toggle('blurred');
    });
}

function generateGallery(json) {
    const images = json.images;
    const gallery = document.querySelector('.gallery');

    for (let i = 0; i < images.length; i++) {
        const galleryItem = document.createElement('div');
        const galleryImg = document.createElement('img');
        const galleryLink = document.createElement('a');
        const galleryCaption = document.createElement('h5');
        galleryLink.href = images[i].link;
        galleryItem.classList.add('gallery-item');
        galleryImg.classList.add('gallery-img');
        galleryImg.src = images[i].link;
        galleryImg.alt = images[i].caption;
        galleryImg.crossorigin = "anonymous";
        galleryCaption.innerText = images[i].caption;
        galleryCaption.style = "text-align:center";
        gallery.appendChild(galleryItem);
        galleryItem.appendChild(galleryLink);
        galleryItem.appendChild(galleryCaption);
        galleryLink.appendChild(galleryImg);
    }
}

function loadGallery() {
    fetch('JSON/gallery.json')
        .then(response => response.json())
        .then(data => {
            generateGallery(data);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}

function generateCarousel(json) {
    const carousel = document.querySelector('.carousel');
    const slidesContainer = carousel.querySelector('.slides');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slideWidth = slidesContainer.clientWidth;

    let slideIndex = 0;
    let slides = [];

    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`
    }

    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex > slides.length - 1) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }

    function createSlide(slide) {
        slides = slide.images;
        for (let i = 0; i < slides.length; i++) {
            const slideImage = document.createElement('img');
            slideImage.src = slides[i].link;
            slidesContainer.appendChild(slideImage);
        }
    }

    createSlide(json);
    showSlide(slideIndex);

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
}

function loadCarousel() {
    fetch('JSON/gallery.json')
        .then(response => response.json())
        .then(images => {
            generateCarousel(images);
        })
        .catch(error => {
            console.error('Error!', error);
        });
}


window.addEventListener('DOMContentLoaded', () => {
    setupNav();
    setupBurgerMenu();
    loadGallery();
    loadCarousel();
});