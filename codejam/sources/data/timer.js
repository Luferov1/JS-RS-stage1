// import { options } from "./canvas.js";

export const timer = document.querySelector('.time span');

export const time = {
    seconds: 0,
    minutes: 0
}

const stopButton = document.querySelector('.buttons-container button:nth-child(2)');


export const startTimer = () => {
    if (!stopButton.classList.contains('stopped')) {
        timer.innerHTML = `${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;

        if (time.seconds === 59) {
            time.seconds = 0;
            time.minutes++;
        } else time.seconds++;
        
        var timeGoing = setTimeout(startTimer, 1000);
    } else {
        clearTimeout(timeGoing);
    }
}


startTimer();