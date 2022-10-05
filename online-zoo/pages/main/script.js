// // imports
// import { animalCards } from "../../assets/data/animal-cards.js";

// //const
// const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
// const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
// const noScrollBackground = document.querySelector('.no-scroll-background');
// const burgerMenu = document.querySelector('.burger-menu');

// const moveSliderLeftButton = document.querySelector('.slider-left-button');
// const moveSliderRightButton = document.querySelector('.slider-right-button');
// const mainSliderContainer = document.querySelector('.main-slider-container');

// //let

// let changer = true;

// //functions
// const openBurgerMenu = () => {
//     document.body.classList.add('no-scroll')
//     burgerMenu.classList.add('burger-menu_opened');
//     noScrollBackground.classList.remove('hidden');
// }

// // const checkBurgerMenuClicks = (event) => {
// //     if (event.target.classList.contains('no-scroll-background') || event.target.classList.contains('nav-link')) {
// //         closeBurgerMenu();
// //     }
// // }

// const closeBurgerMenu = () => {
//     document.body.classList.remove('no-scroll')
//     burgerMenu.classList.remove('burger-menu_opened');
//     noScrollBackground.classList.add('hidden');
// }

// const createSliderContainer = (side) => {
//     const sliderContainer = document.createElement('div');
//     mainSliderContainer.append(sliderContainer);
//     sliderContainer.classList.add('slider-container');
//     sliderContainer.classList.add(`slider-container_${side}`);
//     // fillSliderContainer()
//     console.log(1);
// }

// const resumeSlider = () => {
//     mainSliderContainer.firstElementChild.remove();
//     moveSliderLeftButton.classList.remove('slider-button_disabled');
//     moveSliderRightButton.classList.remove('slider-button_disabled');
//     moveSliderLeftButton.addEventListener('click', moveSliderLeft);
//     moveSliderRightButton.addEventListener('click', moveSliderRight);
//     mainSliderContainer.firstElementChild.classList.remove('slider-container_animation');
//     mainSliderContainer.firstElementChild.classList.add('slider-container_center');
//     mainSliderContainer.firstElementChild.classList.remove('slider-container_left');
//     mainSliderContainer.firstElementChild.classList.remove('slider-container_right');
// }

// const moveSliderLeft = () => {
//     moveSliderLeftButton.removeEventListener('click', moveSliderLeft);
//     moveSliderRightButton.removeEventListener('click', moveSliderRight);
//     moveSliderLeftButton.classList.add('slider-button_disabled');
//     moveSliderRightButton.classList.add('slider-button_disabled');
//     createSliderContainer('right');
//     mainSliderContainer.firstElementChild.classList.add('slider-container_animation');
//     mainSliderContainer.firstElementChild.style.transform = `translateX(-${mainSliderContainer.firstElementChild.offsetWidth * 1.5 + 20}px)`;
//     mainSliderContainer.lastElementChild.classList.add('move-left');
//     setTimeout(resumeSlider, 1200);
// }

// const moveSliderRight = () => {
//     moveSliderLeftButton.removeEventListener('click', moveSliderLeft);
//     moveSliderRightButton.removeEventListener('click', moveSliderRight);
//     moveSliderLeftButton.classList.add('slider-button_disabled');
//     moveSliderRightButton.classList.add('slider-button_disabled');
//     createSliderContainer('left');
//     mainSliderContainer.firstElementChild.classList.add('slider-container_animation');
//     mainSliderContainer.firstElementChild.style.transform = `translateX(${mainSliderContainer.firstElementChild.offsetWidth * 0.5 + 20}px)`;
//     mainSliderContainer.lastElementChild.classList.add('move-right');
//     setTimeout(resumeSlider, 1000)
// }

// // listeners
// burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
// burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
// noScrollBackground.addEventListener('click', closeBurgerMenu);
// moveSliderLeftButton.addEventListener('click', moveSliderLeft);
// moveSliderRightButton.addEventListener('click', moveSliderRight);


