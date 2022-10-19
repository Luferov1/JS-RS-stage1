const timer = document.querySelector('.time span');
export const time = {
    seconds: 0,
    minutes: 0
}

export const startTimer = () => {
    timer.innerHTML = `${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;

    if (time.seconds === 59) {
        time.seconds = 0;
        time.minutes++;
    } else time.seconds++;
    setTimeout(startTimer, 1000);
}


startTimer();