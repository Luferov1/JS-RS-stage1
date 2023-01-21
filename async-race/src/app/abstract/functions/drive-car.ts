import ButtonClassNames from '../enums/button-classNames-enum';
import EngineStatus from '../enums/engine-status-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import movingCarParams from '../interfaces/drive-interface';
import driveParamsInterface from '../interfaces/drive-params-interface';
import cancelAnimation from './cancel-animation';

const driveCar = async (params: movingCarParams) => {
  const controller = new AbortController();

  const startResponse = await fetch(
    `${ServerPath.address}${ServerPath.engine}?id=${params.id}&status=${EngineStatus.started}`,
    {
      method: RequestMethods.patch,
    }
  );

  const driveParams: driveParamsInterface = await startResponse.json();
  // const time = driveParams.distance / driveParams.velocity / 1000;
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
    }
  } catch (err) {
    console.log('drive canceled');
  }
};

export default driveCar;
