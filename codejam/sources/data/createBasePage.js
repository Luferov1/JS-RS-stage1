const container = document.createElement('div');
container.classList.add('container');
document.body.prepend(container);

const options = document.createElement('div');
options.classList.add('options')
container.append(options);

export const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('buttons-container');
options.append(buttonsContainer);
const buttons = ['Shuffle and start', 'Stop', 'Save', 'LeaderBords', 'Volume']; 

for (let i = 0; i < buttons.length; i++) {
    const button = document.createElement('button');
    button.innerHTML = buttons[i];
    buttonsContainer.append(button);
}

export const selectSize = document.createElement('select');
selectSize.classList.add('select-size');
buttonsContainer.append(selectSize);
for (let i = 2; i < 9; i++) {
    const option = document.createElement('option');
    selectSize.append(option)
    if (i === 2) {
        option.innerHTML = 'Select size';
        option.value = '';
        option.disabled = true;
    } else {
        option.innerHTML = `${i} x ${i}`;
        option.value = `${i}`;
    }
    if (i === 4) {
        option.selected = true;
    }
}


const statistics = document.createElement('div');
statistics.classList.add('statistics');
statistics.innerHTML = '<div class="moves">Moves: <span>0</span></div><div class="time">Time: <span></span></div>';
options.append(statistics);


export const canvas = document.createElement('canvas');
canvas.classList.add('canvas');
container.append(canvas);
canvas.width = 500;
canvas.height = 500;

export const stopWrapper = document.createElement('div');
container.append(stopWrapper);

export const leaderTable = document.createElement('div');



