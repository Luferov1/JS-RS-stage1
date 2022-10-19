import { canvas, selectSize } from "./createBasePage.js";
import { startTimer } from './timer.js';

let frameSize = 4;
let valuesArr = [];
const ctx = canvas.getContext('2d');


const fillValuesArr = (size) => {
    valuesArr = [];
    for (let i = 0; i < Math.pow(size, 2); i++) {
        valuesArr.push(i);
    }
    valuesArr.sort(() => Math.random() - 0.5);
}

const drawSquares = (size, arr) => {
    if (size === 3) {
        ctx.font = '28px bold'
    } else if (size > 6) {
        ctx.font = '14px bold'
    } else {
        ctx.font = '18px bold';
    }

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

        // ctx.fillStyle = 'white';
        // ctx.fillRect( (i % size) * squareWidth, heightIndex * squareHeight, squareWidth, squareHeight);
        ctx.fillStyle = '#f2c100';
        ctx.fillRect((i % size) * squareWidth + 2, heightIndex * squareHeight + 2, squareWidth - 4, squareHeight - 4);
        ctx.fillStyle = '#8b00ff';

        if (arr[i] < 10) {
        ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 5, heightIndex * squareHeight + squareHeight / 2 + 5);
        } else {
            ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 10, heightIndex * squareHeight + squareHeight / 2 + 5);
        }
        if ((i + 1) % size === 0) {
            heightIndex++;
        }
    }
}

const createBasicGame = () => {
    fillValuesArr(frameSize);
    // clearTimeout(startTimer);
    startTimer(true);
    drawSquares(frameSize, valuesArr);
}

const changeFrameSize = () => {
    for (let i = 1; i < selectSize.length; i++) {
        if (selectSize[i].selected) {
            frameSize = selectSize[i].value;
        }
    }
    createBasicGame();
}

createBasicGame();

selectSize.addEventListener('change', changeFrameSize);