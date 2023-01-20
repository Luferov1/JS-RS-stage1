import Car from '../../pages/garage/components/car';
import carBrands from '../arrays/car-brands';
import carModels from '../arrays/car-models';
import CarClassNames from '../enums/car-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import getRandomColor from './get-random-color';
import getRandomNumber from './get-random-number';
import updateCarsNumber from './update-cars-number';

const create100Cars = async () => {
  let number = document.querySelectorAll(`.${CarClassNames.container}`).length;
  const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
  for (let i = 0; i < 100; i += 1) {
    const name = `${carBrands[getRandomNumber(0, carBrands.length - 1)]} ${
      carModels[getRandomNumber(0, carModels.length - 1)]
    }`;
    const color = getRandomColor();
    const params = {
      name: name,
      color: color,
    };

    const response = await fetch(`${ServerPath.address}${ServerPath.garage}`, {
      method: RequestMethods.post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const newCarParams = await response.json();
    if (number < 7) {
      const car = new Car(newCarParams);
      garage.append(car.render());
      number += 1;
    }
    updateCarsNumber();
  }
};

export default create100Cars;
