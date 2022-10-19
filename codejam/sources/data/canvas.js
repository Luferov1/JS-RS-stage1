// imports
import { canvas, selectSize, buttonsContainer } from "./createBasePage.js";
import { time, timer, startTimer } from './timer.js';

// consts
const moves = document.querySelector('.moves span');
const shuffleButton = buttonsContainer.firstElementChild;
const stopButton = buttonsContainer.childNodes[1];
const volumeButton = buttonsContainer.childNodes[4];
const ctx = canvas.getContext('2d');

// lets
let frameSize = 4;
let valuesArr = [];
let movesCounter = 0;

// options

export const options = {
    volume: true,
    stopped: false,
    minutes: 0,
    seconds: 0
}


// functions
const fillValuesArr = (size) => {
    valuesArr = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
        valuesArr.push(i);
    }
    valuesArr.sort(() => Math.random() - 0.5);
}

const drawSquares = (size, arr) => {
    ctx.font = 'bold 30px serif';
    ctx.fillStyle = '#8b00ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const squareWidth = canvas.width / size;
    const squareHeight = canvas.height / size;
    let heightIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i] === 0) {
            if ((i + 1) % size === 0) {
                heightIndex++;
            }
            continue;
        }

        ctx.fillStyle = '#f2c100';
        ctx.fillRect((i % size) * squareWidth + 2, heightIndex * squareHeight + 2, squareWidth - 4, squareHeight - 4);
        ctx.fillStyle = '#8b00ff';

        if (arr[i] < 10) {
        ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 5, heightIndex * squareHeight + squareHeight / 2 + 10);
        } else {
            ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 15, heightIndex * squareHeight + squareHeight / 2 + 10);
        }
        if ((i + 1) % size === 0) {
            heightIndex++;
        }
    }
}

const changeMoves = () => {
    movesCounter++;
    moves.innerHTML = movesCounter;
}

const stopGame = () => {
    if (!options.stopped) {
        options.stopped = !options.stopped;
        stopButton.classList.add('stopped');
        canvas.removeEventListener('click', moveSquare);
    } else {
        options.stopped = !options.stopped;
        stopButton.classList.remove('stopped');
        canvas.addEventListener('click', moveSquare);
        startTimer();
    }
}

const changeVolume = () => {
    volumeButton.classList.toggle('volume_off');
    options.volume = !options.volume;
}


const createBasicGame = () => {
    fillValuesArr(frameSize);
    time.seconds = 0;
    time.minutes = 0;
    if (options.stopped) {
        options.stopped = !options.stopped;
        stopButton.classList.remove('stopped');
        canvas.addEventListener('click', moveSquare);
        startTimer();
    }
    drawSquares(frameSize, valuesArr);
    movesCounter = 0;
    moves.innerHTML = movesCounter;
}

const changeFrameSize = () => {
    for (let i = 1; i < selectSize.length; i++) {
        if (selectSize[i].selected) {
            frameSize = Number(selectSize[i].value);
        }
    }
    createBasicGame();
}


const moveSquare = (event) => {
    const squareSize = canvas.offsetWidth / frameSize;
    // console.log(event.offsetX, squareSize);
    const targetIndex = Math.floor(event.offsetX / squareSize) + frameSize * Math.floor(event.offsetY / squareSize);
    const zeroIndex = valuesArr.indexOf(0);
    const availableArr = [];

    if (zeroIndex % frameSize !== 0) {
        availableArr.push(zeroIndex - 1);
    }

    if ( (zeroIndex + 1) % frameSize !== 0) {
        availableArr.push(zeroIndex + 1);
    }

    if (Math.floor(zeroIndex / frameSize) !== 0) {
        availableArr.push(zeroIndex - frameSize);
    }

    if (zeroIndex < Math.pow(frameSize, 2) - frameSize) {
        availableArr.push(zeroIndex + frameSize);
    }

    if (availableArr.includes(targetIndex)) {
        if (options.volume) {
            const audio = new Audio('sources/sounds/click.wav');
            audio.play();
        }
        valuesArr[zeroIndex] = valuesArr[targetIndex];
        valuesArr[targetIndex] = 0;
        drawSquares(frameSize, valuesArr);
        changeMoves();
    }

}

createBasicGame();


// listeners
selectSize.addEventListener('change', changeFrameSize);
canvas.addEventListener('click', moveSquare);
shuffleButton.addEventListener('click', createBasicGame);
stopButton.addEventListener('click', stopGame);
volumeButton.addEventListener('click', changeVolume);
