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



let answerOptionsArr;
let score = 0;
let round = 1;
let points;
let trueIndex;

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


const changeAnswerOptionsLanguage = () => {
  fillAnswerOptions(answerOptionsArr);
}

const startRound = () => {
  scoreBoardItems[round - 1].classList.add('scoreboard__item_active');
  trueIndex = chooseTrueIndex();
  console.log(trueIndex);
  answerOptionsArr = shuffleArr();
  points = 5;
  fillAnswerOptions(answerOptionsArr);
  answerOptionsList.addEventListener('click', checkAnswer);
}

const setTrue = (target) => {
  target.classList.add('answer-options__item_true');
  // audio
  // remove listener
  // add listener to show
  // add listener to button
  // show true bird
  // player
  score += points;
  scoreTable.innerHTML = score;
}

const setFalse = (target) => {
  target.classList.add('answer-options__item_false');
  // audio
  // player
  points--;
}

const checkAnswer = (event) => {
  if (!event.target.closest('.answer-options__item')) return;

  descriptionCover.classList.remove('description__cover_active');
  const answer = event.target.closest('.answer-options__item').textContent;
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

const startGame = () => {
  startRound();
}

startGame();

// listeners 
languageContainer.addEventListener('click', changeAnswerOptionsLanguage);


answerOptions[1].textContent