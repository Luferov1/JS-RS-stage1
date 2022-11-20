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
const playerCover = document.querySelector('.player__cover');

const descriptionPlayerPlayButton = document.querySelector('.description .player__play-button');

const playerFullTimeMinutes = document.querySelector('.player__full-time .minutes');
const playerFullTimeSeconds = document.querySelector('.player__full-time .seconds');

const descriptionProgress = document.querySelector('.description__progress');

const playerCurrentTimeMinutes = document.querySelector('.player__time-played .minutes');
const playerCurrentTimeSeconds = document.querySelector('.player__time-played .seconds');

const languageContainer = document.querySelector('.change-language');


let answer;
let descriptionAudio;

// functions

const playDescriptionAudio = () => {
  // if (descriptionAudio) {
  //   des.pause();
  //   answerPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
  //   answerPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
  // }

  const button = descriptionPlayerPlayButton.firstElementChild;
  if (button.classList.contains('player__play-button_play')) {
    button.classList.remove('player__play-button_play');
    button.classList.add('player__play-button_pause');
    descriptionAudio.play();
  } else {
    button.classList.add('player__play-button_play');
    button.classList.remove('player__play-button_pause');
    descriptionAudio.pause();
  }
}

const refreshDescriptionAudio = () => {
  playDescriptionAudio();
  
    playerCurrentTimeMinutes.innerHTML = '00';
    playerCurrentTimeSeconds.innerHTML = '00';

  descriptionProgress.style.width = '0%';
}

const updatedescriptionTime = () => {
  const currentTime = Math.ceil(descriptionAudio.currentTime);

  if (currentTime < 10) {
    playerCurrentTimeSeconds.innerHTML = String(currentTime).padStart(2, 0);
  } else if (currentTime < 60) {
    playerCurrentTimeSeconds.innerHTML = currentTime;
  } else {
    playerCurrentTimeMinutes.innerHTML = String(Math.floor(currentTime / 60)).padStart(2, 0);

    if (currentTime % 60 < 10) {
      playerCurrentTimeSeconds.innerHTML = String(currentTime % 60).padStart(2, 0);
    } else {
      playerCurrentTimeSeconds.innerHTML = currentTime % 60;
    }
  }
  descriptionProgress.style.width = `${descriptionAudio.currentTime / descriptionAudio.duration * 100}%`
}

const fillDescription = () => {

  playerCover.classList.add('player__cover_active');

  if (descriptionAudio) {
    descriptionAudio.pause();
    descriptionPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
    descriptionPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
    descriptionProgress.style.width = '0%';
  }

  let chosenBird;

  if (language.enlish) {
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {

        if (birdsData[i][j].nameEn === answer) {
          console.log(answer);
          descriptionImg.src = birdsData[i][j].image;
          descriptionHeader.innerHTML = birdsData[i][j].nameEn;
          descriptionSubheader.innerHTML = birdsData[i][j].species;
          description.innerHTML = birdsData[i][j].descriptionEn;

          chosenBird = birdsData[i][j];
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

          chosenBird = birdsData[i][j];
        }
      }
    }
  }

  descriptionAudio = new Audio(chosenBird.audio);
  descriptionAudio.oncanplaythrough = () => {
    playerCover.classList.remove('player__cover_active');

    const duration = Math.ceil(descriptionAudio.duration);

    if (duration < 10) {
      playerFullTimeMinutes.innerHTML = '00';
      playerFullTimeSeconds.innerHTML = String(duration).padStart(2, 0);
    } else if (duration < 60) {
      playerFullTimeMinutes.innerHTML = '00';
      playerFullTimeSeconds.innerHTML = duration;
    } else {
      playerFullTimeMinutes.innerHTML = String(Math.floor(duration / 60)).padStart(2, 0);

      if (duration % 60 < 10) {
        playerFullTimeSeconds.innerHTML = String(duration % 60).padStart(2, 0);
      } else {
        playerFullTimeSeconds.innerHTML = duration % 60;
      }
    }
    descriptionAudio.addEventListener('timeupdate', updatedescriptionTime);
    descriptionAudio.addEventListener('ended', refreshDescriptionAudio);
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
descriptionPlayerPlayButton.addEventListener('click', playDescriptionAudio);