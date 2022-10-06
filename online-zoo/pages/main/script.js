// imports
import { animalCards } from "../../assets/data/animal-cards.js";

//const
const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
const noScrollBackground = document.querySelector('.no-scroll-background');
const burgerMenu = document.querySelector('.burger-menu');

const moveSliderLeftButton = document.querySelector('.slider-left-button');
const moveSliderRightButton = document.querySelector('.slider-right-button');
const mainSliderContainer = document.querySelector('.main-slider-container');
const section3 = document.querySelector('.section3');


//let

let changer = true;

//functions
const randomizer = (max) => {
    return Math.floor(Math.random() * (max + 1) );
}

const openBurgerMenu = () => {
    document.body.classList.add('no-scroll')
    // burgerMenu.classList.add('burger-menu_opened');
    burgerMenu.style.transform = `translateY(${window.pageYOffset}px)`
    noScrollBackground.classList.remove('hidden');
}

const closeBurgerMenu = () => {
    document.body.classList.remove('no-scroll')
    burgerMenu.style.transform = 'translateY(-340px)'
    noScrollBackground.classList.add('hidden');
}

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

// listeners
burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
noScrollBackground.addEventListener('click', closeBurgerMenu);


moveSliderLeftButton.addEventListener('click', moveSliderLeft);
moveSliderRightButton.addEventListener('click', moveSliderRight);


