// imports

import language from "./language.js";
import birdsData from "./birds.js";

// variables
const languageContainer = document.querySelector('.change-language');
const scoreBoardItems = document.querySelectorAll('.scoreboard__item');
const answerOptions = document.querySelectorAll('.answer-options__item');
const answerOptionsList = document.querySelector('.answer-options__list');
const scoreTable = document.querySelector('.score-table__value');
const descriptionCover = document.querySelector('.description__cover');

const answerImg = document.querySelector('.question .question__img');
const answerHeader = document.querySelector('.answer__header');

const descriptionHeader = document.querySelector('.description .answer .answer__header');
const descriptionSubheader = document.querySelector('.answer .answer__subheader');
const description = document.querySelector('.bird-description');
const descriptionImg = document.querySelector('.description .question__img');

const nextRoundButton = document.querySelector('.next-level-button');

const winPage = document.querySelector('.win-page');
const winPageScore = document.querySelector('.win-page__score');
const winPageButton = document.querySelector('.win-page__button');

const answerPlayerPlayButton = document.querySelector('.player__play-button');
const descriptionPlayerPlayButton = document.querySelector('.description .player__play-button');
const playerCovers = document.querySelectorAll('.player__cover');
const playersFullTimeMinutes = document.querySelectorAll('.player__full-time .minutes');
const playersFullTimeSeconds = document.querySelectorAll('.player__full-time .seconds');
const questionProgress = document.querySelector('.question__progress');
const descriptionProgress = document.querySelector('.description__progress');

const playerCurrentTimeMinutes = document.querySelectorAll('.player__time-played .minutes');
const playerCurrentTimeSeconds = document.querySelectorAll('.player__time-played .seconds');

const volumeButton = document.querySelector('.volume__button');
const volumeProgressBar = document.querySelector('.volume__progress');

let answerOptionsArr;
let score = 0;
let round = 1;
let points;
let trueIndex;
let answer;
let answerAudio;
let descriptionAudio;
let volumeLevel;

const trueSound = new Audio('../assets/audio/true.mp3');
const falseSound = new Audio('../assets/audio/false.mp3');


// functions

const chooseTrueIndex = () => {
  return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
}

const shuffleArr = () => {
  let list = [0, 1, 2, 3, 4, 5]
  list = list.sort(() => Math.random() - 0.5);
  return list;
}

const fillAnswerOptions = (arr) => {

  if (language.enlish) {
    for (let i = 0; i < answerOptions.length; i++) {
      answerOptions[i].innerHTML = '<span class="list-marker"><span/>';
      answerOptions[i].append(birdsData[arr[i]].filter(item => item.id === round)[0].nameEn)
    }
  } else {
    for (let i = 0; i < answerOptions.length; i++) {
      answerOptions[i].innerHTML = '<span class="list-marker"><span/>';
      answerOptions[i].append(birdsData[arr[i]].filter(item => item.id === round)[0].nameRus)
    }
  }
}

const showTrueBird = () => {
  answerAudio.pause();
  answerPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
  answerPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
  
  answerImg.src = birdsData[trueIndex][round - 1].image;

  if (language.enlish) {
    answerHeader.innerHTML = birdsData[trueIndex][round - 1].nameEn;
  } else {
  answerHeader.innerHTML = birdsData[trueIndex][round - 1].nameRus;
  }
}

const updatedescriptionTime = () => {
  const currentTime = Math.ceil(descriptionAudio.currentTime);

  if (currentTime < 10) {
    playerCurrentTimeSeconds[1].innerHTML = String(currentTime).padStart(2, 0);
  } else if (currentTime < 60) {
    playerCurrentTimeSeconds[1].innerHTML = currentTime;
  } else {
    playerCurrentTimeMinutes[1].innerHTML = String(Math.floor(currentTime / 60)).padStart(2, 0);

    if (currentTime % 60 < 10) {
      playerCurrentTimeSeconds[1].innerHTML = String(currentTime % 60).padStart(2, 0);
    } else {
      playerCurrentTimeSeconds[1].innerHTML = currentTime % 60;
    }
  }
  descriptionProgress.style.width = `${descriptionAudio.currentTime / descriptionAudio.duration * 100}%`
}

const showBird = (answer) => {

  playerCovers[1].classList.add('player__cover_active');

  if (descriptionAudio) {
    descriptionAudio.pause();
    descriptionPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
    descriptionPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
    descriptionProgress.style.width = '0%';
  }

  let chosenBird;
  if (language.enlish) {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameEn === answer) {
        descriptionImg.src = birdsData[i][round - 1].image;
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameEn;
        descriptionSubheader.innerHTML = birdsData[i][round - 1].species;
        description.innerHTML = birdsData[i][round - 1].descriptionEn;

        chosenBird = birdsData[i][round - 1];
      }
    }
  } else {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameRus === answer) {
        descriptionImg.src = birdsData[i][round - 1].image;
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameRus;
        descriptionSubheader.innerHTML = birdsData[i][round - 1].species;
        description.innerHTML = birdsData[i][round - 1].descriptionRus;

        chosenBird = birdsData[i][round - 1];
      }
    }
  }

  descriptionAudio = new Audio(chosenBird.audio);
  descriptionAudio.oncanplaythrough = () => {
    playerCovers[1].classList.remove('player__cover_active');

    const duration = Math.ceil(descriptionAudio.duration);

    if (duration < 10) {
      playersFullTimeMinutes[1].innerHTML = '00';
      playersFullTimeSeconds[1].innerHTML = String(duration).padStart(2, 0);
    } else if (duration < 60) {
      playersFullTimeMinutes[1].innerHTML = '00';
      playersFullTimeSeconds[1].innerHTML = duration;
    } else {
      playersFullTimeMinutes[1].innerHTML = String(Math.floor(duration / 60)).padStart(2, 0);

      if (duration % 60 < 10) {
        playersFullTimeSeconds[1].innerHTML = String(duration % 60).padStart(2, 0);
      } else {
        playersFullTimeSeconds[1].innerHTML = duration % 60;
      }
    }
    descriptionAudio.addEventListener('timeupdate', updatedescriptionTime);
    descriptionAudio.addEventListener('ended', refreshDescriptionAudio);
  }
}

const translateDescription = (answer) => {
  if (language.enlish) {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameEn === answer) {
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameEn;
        description.innerHTML = birdsData[i][round - 1].descriptionEn;
      }
    }

    for (let i = 0; i < answerOptions.length; i++) {
      if (birdsData[i][round - 1].nameRus === answer) {
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameEn;
        description.innerHTML = birdsData[i][round - 1].descriptionEn;
      }
    }
  } else {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameEn === answer) {
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameRus;
        description.innerHTML = birdsData[i][round - 1].descriptionRus;
      }
    }

    for (let i = 0; i < answerOptions.length; i++) {
      if (birdsData[i][round - 1].nameRus === answer) {
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameRus;
        description.innerHTML = birdsData[i][round - 1].descriptionRus;
      }
    }
  }
}

const changeAnswerOptionsLanguage = () => {
  fillAnswerOptions(answerOptionsArr);
  translateDescription(answer);
  
  for (let i = 0; i < answerOptions.length; i++) {
    if (answerOptions[i].classList.contains('answer-options__item_true')) {
      showTrueBird();
    }
  }
}

const abbleToWatch = (event) => {
  if (!event.target.closest('.answer-options__item')) return;
  answer = event.target.closest('.answer-options__item').textContent;
  showBird(answer);
}

const updateAnswerTime = () => {
  const currentTime = Math.ceil(answerAudio.currentTime);

  if (currentTime < 10) {
    playerCurrentTimeSeconds[0].innerHTML = String(currentTime).padStart(2, 0);
  } else if (currentTime < 60) {
    playerCurrentTimeSeconds[0].innerHTML = currentTime;
  } else {
    playerCurrentTimeMinutes[0].innerHTML = String(Math.floor(currentTime / 60)).padStart(2, 0);

    if (currentTime % 60 < 10) {
      playerCurrentTimeSeconds[0].innerHTML = String(currentTime % 60).padStart(2, 0);
    } else {
      playerCurrentTimeSeconds[0].innerHTML = currentTime % 60;
    }
  }
  questionProgress.style.width = `${answerAudio.currentTime / answerAudio.duration * 100}%`
}

const playAudio = () => {
  // 
  if (descriptionAudio) {
    descriptionAudio.pause();
    descriptionPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
    descriptionPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
  }

  const button = answerPlayerPlayButton.firstElementChild;
  if (button.classList.contains('player__play-button_play')) {
    button.classList.remove('player__play-button_play');
    button.classList.add('player__play-button_pause');
    answerAudio.play();
  } else {
    button.classList.add('player__play-button_play');
    button.classList.remove('player__play-button_pause');
    answerAudio.pause();
  }
}

const playDescriptionAudio = () => {
  if (answerAudio) {
    answerAudio.pause();
    answerPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
    answerPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
  }

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
  
    playerCurrentTimeMinutes[1].innerHTML = '00';
    playerCurrentTimeSeconds[1].innerHTML = '00';

  descriptionProgress.style.width = '0%';
}

const refreshAudio = () => {
  playAudio();
  
  for (let i = 0; i < 2; i++) {
    playerCurrentTimeMinutes[0].innerHTML = '00';
    playerCurrentTimeSeconds[0].innerHTML = '00';
  }

  questionProgress.style.width = '0%';
}

const startRound = () => {
  scoreBoardItems[round - 1].classList.add('scoreboard__item_active');
  trueIndex = chooseTrueIndex();
  answerAudio = new Audio(birdsData[trueIndex][round - 1].audio);
  answerAudio.oncanplaythrough = () => {
    playerCovers[0].classList.remove('player__cover_active');

    const duration = Math.ceil(answerAudio.duration);

    if (duration < 10) {
      playersFullTimeMinutes[0].innerHTML = '00';
      playersFullTimeSeconds[0].innerHTML = String(duration).padStart(2, 0);
    } else if (duration < 60) {
      playersFullTimeMinutes[0].innerHTML = '00';
      playersFullTimeSeconds[0].innerHTML = duration;
    } else {
      playersFullTimeMinutes[0].innerHTML = String(Math.floor(duration / 60)).padStart(2, 0);

      if (duration % 60 < 10) {
        playersFullTimeSeconds[0].innerHTML = String(duration % 60).padStart(2, 0);
      } else {
        playersFullTimeSeconds[0].innerHTML = duration % 60;
      }
    }
    answerAudio.addEventListener('timeupdate', updateAnswerTime);
    answerAudio.addEventListener('ended', refreshAudio);
  }

  answerOptionsArr = shuffleArr();
  points = 5;
  fillAnswerOptions(answerOptionsArr);
  answerOptionsList.removeEventListener('click', abbleToWatch);
  answerOptionsList.addEventListener('click', checkAnswer);
}

const clearPrevRound = () => {
  nextRoundButton.classList.remove('next-level-button_active');
  nextRoundButton.removeEventListener('click', nextRound);

  answerImg.src = '../assets/img/bird-disabled.jpg';
  answerHeader.innerHTML = '??????';
  
  descriptionCover.classList.add('description__cover_active');
  scoreBoardItems[round - 1].classList.remove('scoreboard__item_active');
  for (let i = 0; i < answerOptions.length; i++) {
    answerOptions[i].classList.remove('answer-options__item_true');
    answerOptions[i].classList.remove('answer-options__item_false');
  }
  playerCovers[0].classList.add('player__cover_active');
  
  const button = answerPlayerPlayButton.firstElementChild;
  answerAudio.pause();
  button.classList.add('player__play-button_play');
  button.classList.remove('player__play-button_pause');

  for (let i = 0; i < 2; i++) {
    playerCurrentTimeMinutes[i].innerHTML = '00';
    playerCurrentTimeSeconds[i].innerHTML = '00';
  }

  questionProgress.style.width = '0%';

  descriptionAudio.pause();
  descriptionPlayerPlayButton.firstElementChild.classList.add('player__play-button_play');
  descriptionPlayerPlayButton.firstElementChild.classList.remove('player__play-button_pause');
}

const startGameAgain = () => {
  clearPrevRound();
  scoreTable.innerHTML = 0;
  score = 0;
  round = 1;
  winPage.classList.remove('win-page_active');
  startRound();
}

const showWin = () => {
  winPage.classList.add('win-page_active');
  winPageScore.innerHTML = score;
  winPageButton.addEventListener('click', startGameAgain);
}

const setTrue = (target) => {
  target.classList.add('answer-options__item_true');
  trueSound.play();
  answerOptionsList.removeEventListener('click', checkAnswer);
  answerOptionsList.addEventListener('click', abbleToWatch);
  nextRoundButton.classList.add('next-level-button_active');
  nextRoundButton.addEventListener('click', nextRound);
  showTrueBird();
  // player
  score += points;
  scoreTable.innerHTML = score;

  if (round === 6) {
    showWin();
  }
}

const setFalse = (target) => {
  target.classList.add('answer-options__item_false');
  falseSound.play();
  // player
  points--;
}

const checkAnswer = (event) => {
  if (!event.target.closest('.answer-options__item')) return;

  descriptionCover.classList.remove('description__cover_active');
  answer = event.target.closest('.answer-options__item').textContent;

  showBird(answer);

  if (language.enlish) {

    if (answer === birdsData[trueIndex][round - 1].nameEn) {
      setTrue(event.target.closest('.answer-options__item'));
    } else if (event.target.closest('.answer-options__item').classList.contains('answer-options__item_false')) {
      return;
    } else {
      setFalse(event.target.closest('.answer-options__item'));
    }
    
  } else {

    if (answer === birdsData[trueIndex][round - 1].nameRus) {
      setTrue(event.target.closest('.answer-options__item'));
    } else if (event.target.closest('.answer-options__item').classList.contains('answer-options__item_false')) {
      return;
    } else {
      setFalse(event.target.closest('.answer-options__item'));
    }
  }
}

const nextRound = () => {
  clearPrevRound();
  round++;
  startRound();
}

// volume

const switchVolume = () => {
  if (!volumeButton.classList.contains('volume__button_disabled')) {
    volumeLevel = answerAudio.volume;
    answerAudio.volume = 0;
    volumeProgressBar.firstElementChild.style.width = '0%';
    volumeButton.classList.add('volume__button_disabled');

    if (descriptionAudio) {
      descriptionAudio.volume = 0;
    }    

  } else {
    volumeButton.classList.remove('volume__button_disabled');
    answerAudio.volume = volumeLevel;
    volumeProgressBar.firstElementChild.style.width = `${volumeLevel * 100}%`;

    if (descriptionAudio) {
      descriptionAudio.volume = volumeLevel;
    }
  }
}

const changeVolume = (event) => {
  const width = event.target.closest('.volume__progress').offsetWidth;
  const clickCoord = event.offsetX;
  const vol = clickCoord / width;

  if (vol < 0.1) {
    volumeLevel = answerAudio.volume;
    answerAudio.volume = 0;
    volumeProgressBar.firstElementChild.style.width = '0%';
    volumeButton.classList.add('volume__button_disabled');

    if (descriptionAudio) {
      descriptionAudio.volume = 0;
    }
    volumeButton.classList.add('volume__button_disabled');
  } else if (vol > 0.9) {
    volumeButton.classList.remove('volume__button_disabled');
    volumeLevel = 1;
    answerAudio.volume = volumeLevel;
    volumeProgressBar.firstElementChild.style.width = `${volumeLevel * 100}%`;

    if (descriptionAudio) {
      descriptionAudio.volume = volumeLevel;
    }
  } else {
    volumeButton.classList.remove('volume__button_disabled');
    volumeLevel = vol;
    answerAudio.volume = volumeLevel;
    volumeProgressBar.firstElementChild.style.width = `${volumeLevel * 100}%`;

    if (descriptionAudio) {
      descriptionAudio.volume = volumeLevel;
    }
  }
  
}

startRound();

// listeners 
languageContainer.addEventListener('click', changeAnswerOptionsLanguage);
answerPlayerPlayButton.addEventListener('click', playAudio);
descriptionPlayerPlayButton.addEventListener('click', playDescriptionAudio);
volumeButton.addEventListener('click', switchVolume);
volumeProgressBar.addEventListener('click', changeVolume);
