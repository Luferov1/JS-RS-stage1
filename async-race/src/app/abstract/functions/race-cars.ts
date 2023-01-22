import GaragePage from '../../pages/garage/garage-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import CarClassNames from '../enums/car-classNames-enum';
import movingCarParams from '../interfaces/drive-interface';
import driveCar from './drive-car';

const raceAllCars = async (event: Event) => {
  const target = event.target as HTMLElement;
  target.classList.add(ButtonClassNames.active);
  const containers = [...document.querySelectorAll(`.${CarClassNames.container}`)];
  const goButtons = [...document.querySelectorAll(`.${ButtonClassNames.go}`)];
  const stopButtons = [...document.querySelectorAll(`.${ButtonClassNames.stop}`)];
  const promisies = [];

  GaragePage.params.race = true;

  for (let i = 0; i < containers.length; i += 1) {
    const params: movingCarParams = {
      carContainer: containers[i] as HTMLElement,
      id: containers[i].id,
      car: containers[i].querySelector(`.${CarClassNames.img}`) as HTMLElement,
      carWidth: 70,
      trackWidth: (containers[i].querySelector(`.${CarClassNames.track}`) as HTMLElement).offsetWidth,
      ratio: 4,
      stopButton: stopButtons[i] as HTMLElement,
      goButton: goButtons[i] as HTMLElement,
      race: GaragePage.params.race,
    };
    promisies.push(driveCar(params));
  }
  const result = await Promise.allSettled(promisies);
  console.log(result);
};

export default raceAllCars;
