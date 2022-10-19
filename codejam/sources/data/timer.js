const timer = document.querySelector('.time span');
let seconds = 0;
let minutes = 0;

export const startTimer = (arg) => {
    if (arg) {
        minutes = 0;
        seconds = 0;
    }
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (seconds === 59) {
        seconds = 0;
        minutes++;
    } else seconds++;
    setTimeout(startTimer, 1000);
}


// startTimer();