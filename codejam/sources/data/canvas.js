// imports
import { canvas, selectSize, buttonsContainer, stopWrapper } from "./createBasePage.js";
import { time, timer, startTimer } from './timer.js';

// consts
const moves = document.querySelector('.moves span');
const shuffleButton = buttonsContainer.firstElementChild;
const stopButton = buttonsContainer.childNodes[1];
const saveButton = buttonsContainer.childNodes[2];
const volumeButton = buttonsContainer.childNodes[4];
const audio = new Audio('sources/sounds/click.wav');
const ctx = canvas.getContext('2d');

// options
let options;

if (localStorage.getItem('options')) {
    options = JSON.parse(localStorage.getItem('options'));
    if (options.stopped) {
        stopButton.classList.add('stopped');
        stopWrapper.classList.add('stopWrapper');
    }
    if (!options.volume) {
        volumeButton.classList.add('volume_off')
    }
    timer.innerHTML = `${String(options.minutes).padStart(2, '0')}:${String(options.seconds).padStart(2, '0')}`;
    

} else {
    options = {
    volume: true,
    stopped: false,
    minutes: 0,
    seconds: 0,
    frameSize: 4,
    movesCounter: 0,
    valuesArr: []
}
}

// functions
const fillValuesArr = (size) => {
    options.valuesArr = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
        options.valuesArr.push(i);
    }
    options.valuesArr.sort(() => Math.random() - 0.5);
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
    options.movesCounter++;
    moves.innerHTML = options.movesCounter;
}

const stopGame = () => {
    if (!options.stopped) {
        options.stopped = !options.stopped;
        stopButton.classList.add('stopped');
        stopWrapper.classList.add('stopWrapper');
        canvas.removeEventListener('click', moveSquare);
    } else {
        options.stopped = !options.stopped;
        stopButton.classList.remove('stopped');
        stopWrapper.classList.remove('stopWrapper');
        canvas.addEventListener('click', moveSquare);
        startTimer();
    }
}

const changeVolume = () => {
    volumeButton.classList.toggle('volume_off');
    options.volume = !options.volume;
}


const createBasicGame = () => {
    if (localStorage.getItem('options')) {
        time.seconds = options.seconds;
        time.minutes = options.minutes;
        moves.innerHTML = options.movesCounter;
    } else {
        fillValuesArr(options.frameSize);
        time.seconds = 0;
        time.minutes = 0;
        options.movesCounter = 0;
        moves.innerHTML = options.movesCounter;

        if (options.stopped) {
            options.stopped = !options.stopped;
            stopButton.classList.remove('stopped');
            canvas.addEventListener('click', moveSquare);
            startTimer();
        }
    }

    drawSquares(options.frameSize, options.valuesArr);
}

const changeFrameSize = () => {
    for (let i = 1; i < selectSize.length; i++) {
        if (selectSize[i].selected) {
            options.frameSize = Number(selectSize[i].value);
        }
    }
    localStorage.removeItem('options');
    stopWrapper.classList.remove('stopWrapper');
    createBasicGame();
}


const moveSquare = (event) => {
    const squareSize = canvas.offsetWidth / options.frameSize;
    const targetIndex = Math.floor(event.offsetX / squareSize) + options.frameSize * Math.floor(event.offsetY / squareSize);
    const zeroIndex = options.valuesArr.indexOf(0);
    const availableArr = [];

    if (zeroIndex % options.frameSize !== 0) {
        availableArr.push(zeroIndex - 1);
    }

    if ( (zeroIndex + 1) % options.frameSize !== 0) {
        availableArr.push(zeroIndex + 1);
    }

    if (Math.floor(zeroIndex / options.frameSize) !== 0) {
        availableArr.push(zeroIndex - options.frameSize);
    }

    if (zeroIndex < Math.pow(options.frameSize, 2) - options.frameSize) {
        availableArr.push(zeroIndex + options.frameSize);
    }

    if (availableArr.includes(targetIndex)) {
        if (options.volume) {
            audio.currentTime = 0;
            audio.play();
        }
        options.valuesArr[zeroIndex] = options.valuesArr[targetIndex];
        options.valuesArr[targetIndex] = 0;
        drawSquares(options.frameSize, options.valuesArr);
        changeMoves();
    }

}

const shuffleGame = () => {
    if (localStorage.getItem('options')) {
        localStorage.removeItem('options');
    }
    stopWrapper.classList.remove('stopWrapper');
    createBasicGame();
}

const saveGame = () => {
    options.minutes = time.minutes;
    options.seconds = time.seconds;
    localStorage.setItem('options', JSON.stringify(options));
}

createBasicGame();


// listeners
selectSize.addEventListener('change', changeFrameSize);
canvas.addEventListener('click', moveSquare);
shuffleButton.addEventListener('click', shuffleGame);
stopButton.addEventListener('click', stopGame);
saveButton.addEventListener('click', saveGame);
volumeButton.addEventListener('click', changeVolume);

if (options.stopped) {
    canvas.removeEventListener('click', moveSquare);
}
