import GaragePage from '../../pages/garage/garage-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import CarClassNames from '../enums/car-classNames-enum';
import movingCarParams from '../interfaces/drive-interface';
import finishedCarParams from '../interfaces/finished-car-params-interface';
import driveCar from './drive-car';
import setWinner from './set-winner';

const raceAllCars = async (event: Event) => {
  const winnersPageButton = document.querySelector(`.${ButtonClassNames.winners}`) as HTMLElement;
  winnersPageButton.classList.add(ButtonClassNames.disabled);
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
  const arr: finishedCarParams[] = [];
  const x = Promise.allSettled(promisies).then((results) =>
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        if (result.value) {
          arr.push(result.value);
        }
      }
    })
  );
  await x;
  await setWinner(arr.sort((a, b) => a.time - b.time)[0]);
  winnersPageButton.classList.remove(ButtonClassNames.disabled);
};

export default raceAllCars;
