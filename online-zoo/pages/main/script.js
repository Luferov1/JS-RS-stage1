// imports
import { animalCards } from "../../assets/data/animal-cards.js";
import { testimonials } from "../../assets/data/testimonials.js";

//const
const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
const noScrollBackground = document.querySelector('.no-scroll-background');
const burgerMenu = document.querySelector('.burger-menu');

const moveSliderLeftButton = document.querySelector('.slider-left-button');
const moveSliderRightButton = document.querySelector('.slider-right-button');
const mainSliderContainer = document.querySelector('.main-slider-container');
const section3 = document.querySelector('.section3');

const testimonialsContainer = document.querySelector('.testimonials-item-container');
const todler = document.querySelector('.section5-input');

//let

//functions
const randomizer = (max) => {
    return Math.floor(Math.random() * (max + 1) );
}

// burger
const openBurgerMenu = () => {
    document.body.classList.add('no-scroll');
    // burgerMenu.classList.add('burger-menu_opened');
    burgerMenu.style.transform = `translateY(${window.pageYOffset}px)`;
    noScrollBackground.classList.remove('hidden');
}

const closeBurgerMenu = () => {
    document.body.classList.remove('no-scroll');
    burgerMenu.style.transform = 'translateY(-340px)';
    noScrollBackground.classList.add('hidden');
}

// slider
const fillSliderContainer = (element) => {
    let uniqueArray = [];
        while (uniqueArray.length < 6) {
            uniqueArray.push(randomizer(7));
            uniqueArray = [...new Set(uniqueArray)];
        }
        for (let i = 0; i < 6; i++) {
            element.innerHTML += `                   
            <div class="slider-item">
            <div class="slider-img ${animalCards[uniqueArray[i]].name}"></div>
            <div class="slider-content-container">
                <div class="slider-text-container">
                    <p class="slider-text-header">${animalCards[uniqueArray[i]].header}</p>
                    <p class="slider-text small-p">${animalCards[uniqueArray[i]].text}</p>
                </div>
                <img src="../../assets/icons/${animalCards[uniqueArray[i]].food}.svg" alt="${animalCards[uniqueArray[i]].food}" class="slider-content-img">
            </div>
        </div>`;
        }

}

const createSliderContainer = (side) => {
    const sliderContainer = document.createElement('div');
    mainSliderContainer.append(sliderContainer);
    sliderContainer.classList.add('slider-container');
    sliderContainer.classList.add(`slider-container_${side}`);
    fillSliderContainer(sliderContainer);
}

const resumeSlider = () => {
    mainSliderContainer.firstElementChild.remove();
    moveSliderLeftButton.classList.remove('slider-button_disabled');
    moveSliderRightButton.classList.remove('slider-button_disabled');
    moveSliderLeftButton.addEventListener('click', moveSliderLeft);
    moveSliderRightButton.addEventListener('click', moveSliderRight);
    mainSliderContainer.firstElementChild.classList.remove('slider-container_animation');
    mainSliderContainer.firstElementChild.classList.add('slider-container_center');
    mainSliderContainer.firstElementChild.classList.remove('slider-container_left');
    mainSliderContainer.firstElementChild.classList.remove('slider-container_right');
}

const moveSliderLeft = () => {
    moveSliderLeftButton.removeEventListener('click', moveSliderLeft);
    moveSliderRightButton.removeEventListener('click', moveSliderRight);
    moveSliderLeftButton.classList.add('slider-button_disabled');
    moveSliderRightButton.classList.add('slider-button_disabled');
    createSliderContainer('right');
    mainSliderContainer.firstElementChild.classList.add('slider-container_animation');
    mainSliderContainer.firstElementChild.style.transform = `translateX(-${mainSliderContainer.firstElementChild.offsetWidth * 1.5 + 20}px)`;
    mainSliderContainer.lastElementChild.classList.add('move-left');
    setTimeout(resumeSlider, 1200);
}

const moveSliderRight = () => {
    moveSliderLeftButton.removeEventListener('click', moveSliderLeft);
    moveSliderRightButton.removeEventListener('click', moveSliderRight);
    moveSliderLeftButton.classList.add('slider-button_disabled');
    moveSliderRightButton.classList.add('slider-button_disabled');
    createSliderContainer('left');
    mainSliderContainer.firstElementChild.classList.add('slider-container_animation');
    mainSliderContainer.firstElementChild.style.transform = `translateX(${mainSliderContainer.firstElementChild.offsetWidth * 0.5 + 20}px)`;
    mainSliderContainer.lastElementChild.classList.add('move-right');
    setTimeout(resumeSlider, 1000)
}

// testimonials
const createTestimonial = (num) => {
    const testimonial = document.createElement('div');
    testimonial.classList.add('testimonials-item-border');
    testimonial.innerHTML = `<div class="testimonials-item">
    <div class="testimonials-info">
        <img src="../../assets/icons/avatar${num}.${testimonials[num].format}" alt="avatar${num}">
        <div class="testimonials-text">
            <div class="testimonials-nickname">${testimonials[num].name}</div>
            <div class="testimonials-date">${testimonials[num].date}</div>
        </div>
    </div>
<p class="testimonials-text small-p">${testimonials[num].text}</p>
</div>`;
    return testimonial;
}

const fillTestimonialsContainer = () => {
    let uniqueArray = [];
    while (uniqueArray.length < 11) {
        uniqueArray.push(randomizer(10));
        uniqueArray = [...new Set(uniqueArray)];
    }
    for(let i = 0; i < uniqueArray.length; i++) {
        testimonialsContainer.append(createTestimonial(uniqueArray[i]));
    }
}

const moveTestimonials = () => {
    const testimonial = document.querySelector('.testimonials-item-border');
    const testimonialWidth = testimonial.offsetWidth;
    const gap = ( testimonialsContainer.offsetWidth - 11 * testimonialWidth ) / 10;
    testimonialsContainer.style.transform = `translateX(-${todler.value * (gap + testimonialWidth)}px)`;
}

const closeTestimonial = () => {
    document.querySelector('.full-testimonial-container').remove();
    noScrollBackground.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

const openTestimonial = (event) => {
    if (section3.offsetWidth > 640 || !event.target.closest('.testimonials-item-border')) {
        return;
    } else {
        const fullTestimonialContainer = document.createElement('div');
        fullTestimonialContainer.classList.add('full-testimonial-container');
        fullTestimonialContainer.style.top = `${window.pageYOffset + 100}px`;
        fullTestimonialContainer.append(event.target.closest('.testimonials-item-border').cloneNode(true));
        fullTestimonialContainer.innerHTML += '<div class="full-testimonial__close-button"><span></span><span></span></div>';
        document.body.prepend(fullTestimonialContainer);
        noScrollBackground.classList.remove('hidden');
        document.body.classList.add('no-scroll');

        document.querySelector('.full-testimonial__close-button').addEventListener('click', closeTestimonial);
    }
}



// listeners
burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
noScrollBackground.addEventListener('click', closeBurgerMenu);


moveSliderLeftButton.addEventListener('click', moveSliderLeft);
moveSliderRightButton.addEventListener('click', moveSliderRight);

window.addEventListener('load', fillTestimonialsContainer);
todler.addEventListener('input', moveTestimonials);
testimonialsContainer.addEventListener('click', openTestimonial);
noScrollBackground.addEventListener('click', closeTestimonial);


// window.pageYOffset