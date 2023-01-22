import GaragePage from '../../pages/garage/garage-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import CarClassNames from '../enums/car-classNames-enum';
import EngineStatus from '../enums/engine-status-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import movingCarParams from '../interfaces/drive-interface';
import driveParamsInterface from '../interfaces/drive-params-interface';
import finishedCarParams from '../interfaces/finished-car-params-interface';
// import finishedCarParams from '../interfaces/finished-car-params-interface';
import cancelAnimation from './cancel-animation';
import getCarById from './get-car-by-id';
// import getCarById from './get-car-by-id';
import showWin from './show-win';

const driveCar = async (params: movingCarParams) => {
  const controller = new AbortController();

  const startResponse = await fetch(
    `${ServerPath.address}${ServerPath.engine}?id=${params.id}&status=${EngineStatus.started}`,
    {
      method: RequestMethods.patch,
    }
  );

  const driveParams: driveParamsInterface = await startResponse.json();
  const time = Math.ceil((driveParams.distance / driveParams.velocity / 100) * 2) / 10;
  const speed = ((driveParams.velocity * params.trackWidth) / driveParams.distance) * params.ratio;

  let position = 0;
  const startTime = new Date().getTime();

  let animation = 0;

  const moveCar = () => {
    const currTime = new Date().getTime();
    position += ((currTime - startTime) / 1000) * speed;
    params.car.style.left = `${position}px`;

    if (position < params.trackWidth - params.carWidth - params.trackWidth * 0.02) {
      animation = window.requestAnimationFrame(moveCar);
    } else {
      params.car.style.left = `${params.trackWidth - params.carWidth - params.trackWidth * 0.02}px`;
      if (GaragePage.params.race) {
        GaragePage.params.race = !GaragePage.params.race;
        const name = (params.carContainer.querySelector(`.${CarClassNames.title}`) as HTMLElement)
          .textContent as string;
        showWin(name);
      }
    }
  };
  moveCar();

  params.goButton.classList.add(ButtonClassNames.moveDisabled);
  params.stopButton.classList.remove(ButtonClassNames.moveDisabled);

  params.stopButton.addEventListener('click', async () => {
    params.goButton.classList.remove(ButtonClassNames.moveDisabled);
    params.stopButton.classList.add(ButtonClassNames.moveDisabled);
    cancelAnimation(animation);
    params.car.style.left = '0px';
    controller.abort();
    await fetch(`${ServerPath.address}${ServerPath.engine}?id=${params.id}&status=${EngineStatus.stopped}`, {
      method: RequestMethods.patch,
    });
    const goButtons = [...document.querySelectorAll(`.${ButtonClassNames.go}`)];
    if (goButtons.filter((button) => button.classList.contains(ButtonClassNames.moveDisabled)).length === 0) {
      (document.querySelector(`.${ButtonClassNames.race}`) as HTMLElement).classList.remove(ButtonClassNames.active);
    }
  });

  try {
    const driveResponse = await fetch(
      `${ServerPath.address}${ServerPath.engine}?id=${params.id}&status=${EngineStatus.drive}`,
      {
        method: RequestMethods.patch,
        signal: controller.signal,
      }
    );
    if (driveResponse.status === 500) {
      cancelAnimation(animation);
      return null;
    } else {
      const finishedCar = await getCarById(params.id);
      const obj: finishedCarParams = {
        color: finishedCar.color,
        name: finishedCar.name,
        time: time,
        id: params.id,
      };
      return obj;
    }
  } catch (err) {
    console.log('drive canceled');
    return null;
  }
};

export default driveCar;
