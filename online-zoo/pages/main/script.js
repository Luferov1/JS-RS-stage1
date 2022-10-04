const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
const noScrollBackground = document.querySelector('.no-scroll-background');
const burgerMenu = document.querySelector('.burger-menu');

const openBurgerMenu = () => {
    document.body.classList.add('no-scroll')
    burgerMenu.classList.add('burger-menu_opened');
    noScrollBackground.classList.remove('hidden');
}

const checkBurgerMenuClicks = (event) => {
    if (event.target.classList.contains('no-scroll-background') || event.target.classList.contains('nav-link')) {
        closeBurgerMenu();
    }
}

const closeBurgerMenu = () => {
    document.body.classList.remove('no-scroll')
    burgerMenu.classList.remove('burger-menu_opened');
    noScrollBackground.classList.add('hidden');
}

burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
document.addEventListener('click', checkBurgerMenuClicks);