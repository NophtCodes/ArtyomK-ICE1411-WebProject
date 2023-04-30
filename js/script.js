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


// Sets active class to the current page in the navigation menu
function setupNav() {
    const currentUrl = document.location.href; // current URL
    const navListItems = document.querySelectorAll('.menu-item'); // all menu items

    // Loop through each element
    navListItems.forEach(navListItem => {
        const navLink = navListItem.querySelector('a');

        // check if the link matches the current URL
        if (navLink.href === currentUrl) {
            navListItem.classList.add('active');
        } else {
            navListItem.classList.remove('active');
        }
    });
}

// Responsive burger menu
function setupBurgerMenu() {
    // Get DOM elements 
    const navMenu = document.querySelector('.menu-responsive'),
        burgerBtn = document.querySelector('.menu-burger'),
        main = document.querySelector('main'),
        footer = document.querySelector('footer'),
        logo = document.querySelector('.hello');

    // listener for click event on the burger button and toggle classes
    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('menu-active');
        burgerBtn.classList.toggle('active');
        main.classList.toggle('blurred');
        footer.classList.toggle('blurred');
        logo.classList.toggle('blurred');
    });
}

// Generates the gallery from JSON file 
function generateGallery(json) {
    const images = json.images;
    const gallery = document.querySelector('.gallery');

    // Iterates through the images
    for (let i = 0; i < images.length; i++) {

        // Create elements
        const galleryItem = document.createElement('div'),
            galleryImg = document.createElement('img'),
            galleryLink = document.createElement('a'),
            galleryCaption = document.createElement('h5');

        // Gallery structure and attributes for images and "a" tags
        galleryLink.href = images[i].link;
        galleryItem.classList.add('gallery-item');
        galleryImg.classList.add('gallery-img');
        galleryImg.src = images[i].link;
        galleryImg.alt = images[i].caption;
        galleryCaption.innerText = images[i].caption;
        galleryCaption.style = "text-align:center";

        // Appending all elements
        gallery.appendChild(galleryItem);
        galleryItem.appendChild(galleryLink);
        galleryItem.appendChild(galleryCaption);
        galleryLink.appendChild(galleryImg);
    }
}

// function to get the gallery
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

// Generate the carousel from the JSON
function generateCarousel(json) {
    // Get DOM elements
    const carousel = document.querySelector('.carousel'),
        slidesContainer = carousel.querySelector('.slides'),
        prevButton = carousel.querySelector('.prev'),
        nextButton = carousel.querySelector('.next'),
        slideWidth = slidesContainer.clientWidth;

    let slideIndex = 0, // index of the current slide
        slides = []; // array to store slides


    // Function to display the slide at the index
    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`
    }

    // go to the previous slide
    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    }

    // go to the next slide
    function nextSlide() {
        slideIndex++;
        if (slideIndex > slides.length - 1) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }

    // Function to create the slides using the JSON 
    function createSlide(slide) {
        slides = slide.images;
        for (let i = 0; i < slides.length; i++) {
            const slideImage = document.createElement('img');
            slideImage.src = slides[i].link;
            slidesContainer.appendChild(slideImage);
        }
    }

    // Call functions
    createSlide(json);
    showSlide(slideIndex);


    // Adds event listeners for the prev and next buttons
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
}

// Load carousel from JSON file
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

// Call all functions
window.addEventListener('DOMContentLoaded', () => {
    setupNav();
    setupBurgerMenu();
    loadGallery();
    loadCarousel();
});