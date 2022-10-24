// imports
import { container, canvas, selectSize, buttonsContainer, stopWrapper, leaderTable } from "./createBasePage.js";
import { time, timer, startTimer } from './timer.js';

// consts
const moves = document.querySelector('.moves span');
const shuffleButton = buttonsContainer.firstElementChild;
const stopButton = buttonsContainer.childNodes[1];
const saveButton = buttonsContainer.childNodes[2];
const leaderBordsButton = buttonsContainer.childNodes[3];
const volumeButton = buttonsContainer.childNodes[4];
const closeLeaderBordsButton = document.querySelector('.leader-table button');

let leaderBordArr;

if (localStorage.getItem('leaderBord')) {
    leaderBordArr = JSON.parse(localStorage.getItem('leaderBord'));
} else {
    leaderBordArr = [];
}

if (leaderBordArr.length > 0) {
    for (let i = 0; i < leaderBordArr.length; i++) {
        leaderTable.childNodes[i + 3].childNodes[1].innerHTML = leaderBordArr[i].name;
        leaderTable.childNodes[i + 3].childNodes[2].innerHTML = leaderBordArr[i].moves;
        leaderTable.childNodes[i + 3].childNodes[3].innerHTML = leaderBordArr[i].time;
    }
}

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

const checkArray = (arr) => {
    const normalArr = [];
    let sum = 0;
    for (let i = 1; i < arr.length; i++) {
        normalArr.push(i);
    }

    for (let i = 0; i < arr.length; i++) {
        if ( arr[i] === 0) {
                let index = Math.floor( i / options.frameSize) + 1;
                sum += index;
        } else {
            let index = normalArr.indexOf(arr[i]);
            sum += index;
            normalArr.splice(index, 1);
        }
    }
        if (options.frameSize % 2 === 0) {
            return sum % 2 === 0 ? true : false;
        } else {
            if ( (Math.floor( options.valuesArr.indexOf(0) / options.frameSize ) + 1) % 2 === 0 ) {
                return sum % 2 === 0 ? true : false;
            } else {
                return sum % 2 !== 0 ? true : false;
            }
        }
}

const drawSquares = (size, arr, deleteIndex) => {
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

        if (i !== deleteIndex) {
            ctx.fillStyle = '#f2c100';
            ctx.fillRect((i % size) * squareWidth + 2, heightIndex * squareHeight + 2, squareWidth - 4, squareHeight - 4);
            ctx.fillStyle = '#8b00ff';
    
            if (arr[i] < 10) {
            ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 5, heightIndex * squareHeight + squareHeight / 2 + 10);
            } else {
                ctx.fillText(arr[i], (i % size) * squareWidth + squareWidth / 2 - 15, heightIndex * squareHeight + squareHeight / 2 + 10);
            }
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
        canvas.removeEventListener('pointerdown', dragSquare);
    } else {
        options.stopped = !options.stopped;
        stopButton.classList.remove('stopped');
        stopWrapper.classList.remove('stopWrapper');
        canvas.addEventListener('pointerdown', dragSquare);
        startTimer();
    }
}


const openLeaderBords = () => {
    leaderTable.classList.remove('leader-table_closed');
}

const closeLeaderBords = () => {
    leaderTable.classList.add('leader-table_closed');
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
        while (!checkArray(options.valuesArr)) {
            fillValuesArr(options.frameSize);
            checkArray(options.valuesArr);
        }
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
    closeLeaderBords();
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

const addToLeaderBord = () => {
    const player = {};
    const playerName = document.querySelector('input[type="text"]').value;
    if (playerName) {
        player.name = playerName;
    } else {
        player.name = 'No name';
    }
    player.time = `${String(options.minutes).padStart(2, '0')}:${String(options.seconds).padStart(2, '0')}`;
    player.moves = options.movesCounter;
    const winMessage = document.querySelector('.win-message');
    winMessage.remove();
    leaderBordArr.push(player);

    if (leaderBordArr.length > 1) {
        leaderBordArr.sort( (a, b) => a.moves - b.moves);
    }

    if (leaderBordArr.length > 10) {
        leaderBordArr.pop();
    }

    localStorage.setItem('leaderBord', JSON.stringify(leaderBordArr));
    for (let i = 0; i < leaderBordArr.length; i++) {
        leaderTable.childNodes[i + 3].childNodes[1].innerHTML = leaderBordArr[i].name;
        leaderTable.childNodes[i + 3].childNodes[2].innerHTML = leaderBordArr[i].moves;
        leaderTable.childNodes[i + 3].childNodes[3].innerHTML = leaderBordArr[i].time;
    }
    shuffleGame();
}

const showWin = () => {
    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.innerHTML = '<h2>Congrates! You win!</h2><form action="#"><label for="name">Input your name</label><input type="text" name="name" id="name" placeholder="your name" maxlength="20" size="20"><input type="button" value="submit"></form>'
    container.append(winMessage);
    const submitButton = document.querySelector('input[type="button"]');
    submitButton.addEventListener('click', addToLeaderBord);
    options.minutes = time.minutes;
    options.seconds = time.seconds;
}

const checkWin = () => {
    for (let i = 0; i < options.valuesArr.length - 1; i++) {
        if (options.valuesArr[i] !== i + 1) return;
    }
    showWin();
}

const calculateDragBorders = (target, zero, size) => {
    if (target - options.frameSize === zero) {
        return {
            way: 'column',
            min: Math.floor(zero / options.frameSize) * size,
            max: Math.floor(target / options.frameSize) * size
        }
    } else if (target + options.frameSize === zero) {
        return {
            way: 'column',
            min: Math.floor(target / options.frameSize) * size,
            max: Math.floor(zero / options.frameSize) * size
        }
    } else if (target + 1 === zero) {
        return {
            way: 'row',
            min: target % options.frameSize * size,
            max: zero % options.frameSize * size
        }
    } else {
        return {
            way: 'row',
            min: zero % options.frameSize * size,
            max: target % options.frameSize * size
        }
    }
}

const dragSquare = (event) => {
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
        const dragableSquare = document.createElement('div');
        dragableSquare.classList.add('dragable')
        container.append(dragableSquare);
        dragableSquare.style.width = `${squareSize - 4}px`;
        dragableSquare.style.height = `${squareSize - 4}px`;
        dragableSquare.innerHTML = options.valuesArr[targetIndex];

        drawSquares(options.frameSize, options.valuesArr, targetIndex);

        let shiftX = event.clientX - 2 - (targetIndex % options.frameSize * squareSize);
        let shiftY = event.clientY - 102 - (Math.floor(targetIndex / options.frameSize) * squareSize);
        
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            const dragBorders = calculateDragBorders(targetIndex, zeroIndex, squareSize);

            if (dragBorders.way === 'row') {
                if (pageX - shiftX > dragBorders.max) {
                    dragableSquare.style.left = `${dragBorders.max + 2}px`;
                } 
                else if (pageX - shiftX < dragBorders.min) {
                    dragableSquare.style.left = `${dragBorders.min + 2}px`;
                } 
                else {
                    dragableSquare.style.left = pageX - shiftX + 'px';
                }

                // dragableSquare.style.left = pageX - shiftX + 'px';
                dragableSquare.style.top = `${102 + Math.floor(targetIndex / options.frameSize) * squareSize}px`;
            } else {

                if (pageY - shiftY - 102 > dragBorders.max) {
                    dragableSquare.style.top = `${dragBorders.max + 102}px`;
                } 
                else if (pageY - shiftY - 102 < dragBorders.min) {
                    dragableSquare.style.top = `${dragBorders.min + 102}px`;
                } 
                else {
                    dragableSquare.style.top = pageY - shiftY +'px';
                }
                dragableSquare.style.left = `${2 + (targetIndex % options.frameSize * squareSize)}px`
            }

        }

        const onMouseMove = (event) => {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('pointermove', onMouseMove);

        
        dragableSquare.onpointerup = () => {
            const dragBorders = calculateDragBorders(targetIndex, zeroIndex, squareSize);

            if (dragBorders.way === 'column') {
                const mouseUpCords = dragableSquare.style.top.slice(0, dragableSquare.style.top.length - 2) - 102;
                const average = (dragBorders.max - dragBorders.min) / 2;
                if (zeroIndex < targetIndex) {
                    if (mouseUpCords < (dragBorders.max - average + average / 2) || mouseUpCords > dragBorders.max * 0.99) {
                        moveSquare(event);
                        dragableSquare.remove();
                    } else {
                        drawSquares(options.frameSize, options.valuesArr);
                        dragableSquare.remove();
                    }
                } else {

                    if (mouseUpCords > (dragBorders.max - average - average / 2) || mouseUpCords < dragBorders.min + ((dragBorders.max - dragBorders.min) * 0.05)) {
                        moveSquare(event);
                        dragableSquare.remove();

                    } else {
                        drawSquares(options.frameSize, options.valuesArr);
                        dragableSquare.remove();

                    }
                }
            } else {
                const mouseUpCords = dragableSquare.style.left.slice(0, dragableSquare.style.left.length - 2) - 2;
                const average = (dragBorders.max - dragBorders.min) / 2;
                
                if (zeroIndex < targetIndex) {
                    if (mouseUpCords < (dragBorders.max - average + average / 2) || mouseUpCords > dragBorders.max * 0.99) {
                        moveSquare(event);
                        dragableSquare.remove();
                    } else {
                        drawSquares(options.frameSize, options.valuesArr);
                        dragableSquare.remove();
                    }
                } else {

                    if (mouseUpCords > (dragBorders.max - average - average / 2) || mouseUpCords < dragBorders.min + ((dragBorders.max - dragBorders.min) * 0.05)) {
                        moveSquare(event);
                        dragableSquare.remove();
                    } else {
                        drawSquares(options.frameSize, options.valuesArr);
                        dragableSquare.remove();
                    }
                }
            }
            
            document.removeEventListener('pointermove', onMouseMove);

        }

    }

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
        checkWin()
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
// canvas.addEventListener('click', moveSquare);
canvas.addEventListener('pointerdown', dragSquare);


shuffleButton.addEventListener('click', shuffleGame);
stopButton.addEventListener('click', stopGame);
saveButton.addEventListener('click', saveGame);
leaderBordsButton.addEventListener('click', openLeaderBords);
closeLeaderBordsButton.addEventListener('click', closeLeaderBords);
volumeButton.addEventListener('click', changeVolume);


if (options.stopped) {
    canvas.addEventListener('pointerdown', dragSquare);
}
