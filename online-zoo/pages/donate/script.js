//const
const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
const noScrollBackground = document.querySelector('.no-scroll-background');
const burgerMenu = document.querySelector('.burger-menu');

// functions
const openBurgerMenu = () => {
    document.body.classList.add('no-scroll')
    burgerMenu.style.transform = `translateY(${window.pageYOffset}px)`
    noScrollBackground.classList.remove('hidden');
    console.log(1)
}

const closeBurgerMenu = () => {
    document.body.classList.remove('no-scroll')
    burgerMenu.style.transform = 'translateY(-340px)'
    noScrollBackground.classList.add('hidden');
}

// listeners
burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
noScrollBackground.addEventListener('click', closeBurgerMenu);