const timer = document.querySelector('.time span');
let seconds = 0;
let minutes = 0;

const startTimer = () => {
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (seconds === 59) {
        seconds = 0;
        minutes++;
    } else seconds++;
    setTimeout(startTimer, 1000);
}


startTimer();