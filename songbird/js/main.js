// imports

import language from "./language.js";
import birdsData from "./birds.js";
import translations from "./translations.js";

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
const winPageHeader = document.querySelector('.win-page__header');
const winPageText = document.querySelector('.win-page__text');
const winPageScore = document.querySelector('.win-page__score');
const winPageButton = document.querySelector('.win-page__button');

let answerOptionsArr;
let score = 0;
let round = 1;
let points;
let trueIndex;
let answer;

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
  answerImg.src = birdsData[trueIndex][round - 1].image;

  if (language.enlish) {
    answerHeader.innerHTML = birdsData[trueIndex][round - 1].nameEn;
  } else {
  answerHeader.innerHTML = birdsData[trueIndex][round - 1].nameRus;
  }
}

const showBird = (answer) => {

  if (language.enlish) {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameEn === answer) {
        console.log(answer);
        descriptionImg.src = birdsData[i][round - 1].image;
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameEn;
        descriptionSubheader.innerHTML = birdsData[i][round - 1].species;
        description.innerHTML = birdsData[i][round - 1].descriptionEn;
      }
    }
  } else {

    for (let i = 0; i < answerOptions.length; i++) {

      if (birdsData[i][round - 1].nameRus === answer) {
        descriptionImg.src = birdsData[i][round - 1].image;
        descriptionHeader.innerHTML = birdsData[i][round - 1].nameRus;
        descriptionSubheader.innerHTML = birdsData[i][round - 1].species;
        description.innerHTML = birdsData[i][round - 1].descriptionRus;
      }
    }
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

const startRound = () => {
  scoreBoardItems[round - 1].classList.add('scoreboard__item_active');
  trueIndex = chooseTrueIndex();
  console.log(trueIndex);
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

startRound();

// listeners 
languageContainer.addEventListener('click', changeAnswerOptionsLanguage);
