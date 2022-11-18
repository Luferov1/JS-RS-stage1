//  imports

import language from "./language.js";
import birdsData from "./birds.js";


// variables

const birdsList = document.querySelector('.all-birds__list');
const descriptionCover = document.querySelector('.description__cover');
const descriptionHeader = document.querySelector('.description .answer .answer__header');
const descriptionSubheader = document.querySelector('.answer .answer__subheader');
const description = document.querySelector('.bird-description');
const descriptionImg = document.querySelector('.description .question__img');

const languageContainer = document.querySelector('.change-language');


let answer;

// functions

const fillDescription = () => {
  if (language.enlish) {
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {

        if (birdsData[i][j].nameEn === answer) {
          console.log(answer);
          descriptionImg.src = birdsData[i][j].image;
          descriptionHeader.innerHTML = birdsData[i][j].nameEn;
          descriptionSubheader.innerHTML = birdsData[i][j].species;
          description.innerHTML = birdsData[i][j].descriptionEn;
        }
      }
    }
  } else {

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {

        if (birdsData[i][j].nameRus === answer) {
          descriptionImg.src = birdsData[i][j].image;
          descriptionHeader.innerHTML = birdsData[i][j].nameRus;
          descriptionSubheader.innerHTML = birdsData[i][j].species;
          description.innerHTML = birdsData[i][j].descriptionRus;
        }
      }
    }
  }
}

const showBird = (event) => {
  if (!event.target.closest('.all-birds__item')) return;
  answer = event.target.closest('.all-birds__item').textContent;
  descriptionCover.classList.remove('description__cover_active');
  fillDescription();
}

const translateDescription = () => {

  if (language.enlish) {

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (birdsData[i][j].nameEn === answer) {
          descriptionHeader.innerHTML = birdsData[i][j].nameEn;
          description.innerHTML = birdsData[i][j].descriptionEn;
        }
      }
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (birdsData[i][j].nameRus === answer) {
          descriptionHeader.innerHTML = birdsData[i][j].nameEn;
          description.innerHTML = birdsData[i][j].descriptionEn;
        }
      }
    }

  } else {

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (birdsData[i][j].nameEn === answer) {
          descriptionHeader.innerHTML = birdsData[i][j].nameRus;
          description.innerHTML = birdsData[i][j].descriptionRus;
        }
      }
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (birdsData[i][j].nameRus === answer) {
          descriptionHeader.innerHTML = birdsData[i][j].nameRus;
          description.innerHTML = birdsData[i][j].descriptionRus;
        }
      }
    }
  }
}
 
// listeners

birdsList.addEventListener('click', showBird);
languageContainer.addEventListener('click', translateDescription);