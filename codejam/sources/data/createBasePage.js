export const container = document.createElement('div');
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
leaderTable.classList.add('leader-table');
leaderTable.classList.add('leader-table_closed');
leaderTable.innerHTML = '<h2>Leader Bords</h2><button><span></span><span></span></button>'
container.append(leaderTable);

for (let i = 0; i <= 10; i++) {
    const position = document.createElement('div');
    position.classList.add('leader-table__place');
    if (i === 0) {
        position.innerHTML = '<div class="place">Place</div><div class="name">Name</div><div class="moves-spended">Moves</div><div class="time-spended">Time</div>';
    } else {
        position.innerHTML = `<div class="place">${i}</div><div class="name"></div><div class="moves-spended"></div><div class="time-spended"></div>`;
    }
    leaderTable.append(position);
}





