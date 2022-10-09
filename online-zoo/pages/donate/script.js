//const
const burgerMenuOpenButton = document.querySelector('.burger-menu-open-button');
const burgerMenuCloseButton = document.querySelector('.burger-menu-close-button');
const noScrollBackground = document.querySelector('.no-scroll-background');
const burgerMenu = document.querySelector('.burger-menu');

const anotherAmountInput = document.querySelector('.number-input');
anotherAmountInput.value = 100;
const radiosContainer = document.querySelector('.input-amount-container');

// functions
const openBurgerMenu = () => {
    document.body.classList.add('no-scroll')
    burgerMenu.style.transform = `translateY(${window.pageYOffset}px)`
    noScrollBackground.classList.remove('hidden');
}

const closeBurgerMenu = () => {
    document.body.classList.remove('no-scroll')
    burgerMenu.style.transform = 'translateY(-340px)'
    noScrollBackground.classList.add('hidden');
}

const checkRadio = () => {
    const width = document.querySelector('main').offsetWidth;
    const amount = anotherAmountInput.value;
    if (amount.length > 4) {
        anotherAmountInput.value = amount.substring(0, 4);
    }
    let amountArr;
    if (width > 1000) {
        amountArr = [5000, 2000, 1000, 500, 250, 100, 50, 25];
    } else if (width > 640) {
        amountArr = [2000, 1000, 500, 250, 100, 50, 25];
    } else {
        amountArr = [500, 250, 100, 50, 25];
    }

    if ( amountArr.includes(Number(amount)) ) {
        document.querySelector(`input[id=d${Number(amount)}]`).checked = true;
    } else {
        const radios = document.querySelectorAll('.input-amount-radio');
        for (let i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
    }
}

const changeAnotherAmountInputValue = (event) => {
    if (event.target.closest('.input-amount-item')) {
        anotherAmountInput.value = event.target.closest('.input-amount-item').lastElementChild.textContent.substring(1);
    }
}

// listeners
burgerMenuOpenButton.addEventListener('click', openBurgerMenu);
burgerMenuCloseButton.addEventListener('click', closeBurgerMenu);
noScrollBackground.addEventListener('click', closeBurgerMenu);

anotherAmountInput.addEventListener('input', checkRadio);
radiosContainer.addEventListener('click', changeAnotherAmountInputValue);