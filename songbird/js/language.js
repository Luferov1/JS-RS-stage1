// imports

import translations from "./translations.js";

// variables

const language = {};
const languageContainer = document.querySelector('.change-language');
const englishFlag = languageContainer.children[1];
const russainFlag = languageContainer.children[2];
const navigationLinks = document.querySelectorAll('.navigation__link');



// functions

const changeTexts = () => {
  
  const headerArr = [...navigationLinks, document.querySelector('.change-language__text')];
  if (language.enlish) {
    for (let i = 0; i < headerArr.length; i++) {
      headerArr[i].innerHTML = translations.headerTranslation[0][i];
    }
  } else {
    for (let i = 0; i < headerArr.length; i++) {
      headerArr[i].innerHTML = translations.headerTranslation[1][i];
    }
  }

  if (navigationLinks[0].classList.contains('navigation__link_active')) {
    const arr = [
      document.querySelector('.main__header'),
      document.querySelector('.main__subheader'),
      document.querySelector('.main__paragraph'),
      document.querySelector('.start-game-button')
    ];

    if (language.enlish) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = translations.mainTranslation[0][i];
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = translations.mainTranslation[1][i];
      }
    }
    console.log('main');
  }

  if (navigationLinks[1].classList.contains('navigation__link_active')) {
    const arr = [
      ...document.querySelectorAll('.scoreboard__item'),
      document.querySelector('.score-table__text'),
      document.querySelector('.next-level-button')
    ];
    const winMessageArr = [
      document.querySelector('.win-page__header'),
      document.querySelector('.win-page__text'),
      document.querySelector('.win-page__button')
    ];
    
    if (language.enlish) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = translations.gameTranslation[0][i];
      }

      document.querySelector('.description__cover').innerHTML = 'Listen to the player. Select a bird from the list.';
      for (let i = 0; i < winMessageArr.length; i++) {
        winMessageArr[i].innerHTML = translations.winMessageTranslation[0][i];
      }

    } else {
      for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = translations.gameTranslation[1][i];
      }
      document.querySelector('.description__cover').innerHTML = 'Послушайте плеер. Выберите птицу из списка.';
      for (let i = 0; i < winMessageArr.length; i++) {
        winMessageArr[i].innerHTML = translations.winMessageTranslation[1][i];
      }
    }
    console.log('game');
  }

  if (navigationLinks[2].classList.contains('navigation__link_active')) {
    const item = document.querySelector('.all-birds__header');
    
    if (language.enlish) {
      item.innerHTML = translations.galleryTranslation[0];
      document.querySelector('.description__cover').innerHTML = 'Select a bird from the list.';
    } else {
      item.innerHTML = translations.galleryTranslation[1];
      document.querySelector('.description__cover').innerHTML = 'Выберите птицу из списка.';
    }
    console.log('galery');
  }

}

const changeLanguage = (event) => {
  if (!event.target.closest('.change-language__button_active') && event.target.closest('.change-language__button')) {
    event.target.closest('.change-language__button').classList.add('change-language__button_active');
    language.enlish = !language.enlish;

    if (language.enlish) {
      englishFlag.classList.add('change-language__button_active');
      russainFlag.classList.remove('change-language__button_active');
      changeTexts();
    } else {
      russainFlag.classList.add('change-language__button_active');
      englishFlag.classList.remove('change-language__button_active');
      changeTexts();
    }

    console.log(language.enlish);
  }
}

const saveLanguage = () => {
  localStorage.setItem('language', JSON.stringify(language));
}

// set language

if (!localStorage.getItem('language')) {
  language.enlish = true;
  englishFlag.classList.add('change-language__button_active');
  changeTexts();
} else {
  language.enlish = JSON.parse(localStorage.getItem('language')).enlish;

  if (language.enlish) {
    englishFlag.classList.add('change-language__button_active');
    changeTexts();
  } else {
    russainFlag.classList.add('change-language__button_active');
    changeTexts()
  }
}
// listeners

languageContainer.addEventListener('click', changeLanguage)
window.addEventListener('beforeunload', saveLanguage);

export default language;

