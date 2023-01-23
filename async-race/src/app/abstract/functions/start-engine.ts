import ButtonClassNames from '../enums/button-classNames-enum';
import CarClassNames from '../enums/car-classNames-enum';
import movingCarParams from '../interfaces/drive-interface';
import driveCar from './drive-car';

const startEngine = async (event: Event) => {
  const goButton = event.target as HTMLElement;
  if (goButton.classList.contains(ButtonClassNames.move)) {
    const container = goButton.closest(`.${CarClassNames.container}`) as HTMLElement;
    const stopButton = container.querySelector(`.${ButtonClassNames.moveDisabled}`) as HTMLElement;
    const params: movingCarParams = {
      carContainer: container,
      id: container.id,
      car: container.querySelector(`.${CarClassNames.img}`) as HTMLElement,
      carWidth: 70,
      trackWidth: (container.querySelector(`.${CarClassNames.track}`) as HTMLElement).offsetWidth,
      ratio: 4,
      stopButton: stopButton,
      goButton: goButton,
      race: false,
    };

    const car = goButton.closest(`.${CarClassNames.container}`) as HTMLElement;
    const selectButton = car.querySelector(`.${ButtonClassNames.select}`) as HTMLElement;
    const removeButton = car.querySelector(`.${ButtonClassNames.remove}`) as HTMLElement;
    selectButton.classList.add(ButtonClassNames.disabled);
    removeButton.classList.add(ButtonClassNames.disabled);

    await driveCar(params);
  }
};

export default startEngine;
