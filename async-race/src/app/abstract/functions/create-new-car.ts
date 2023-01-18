import Car from '../../pages/garage/components/car';
import InvalidInputMessage from '../../pages/garage/components/invalid-input-message';
import FormClassNames from '../enums/form-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import TagNames from '../enums/tag-names-enum';
import updateCarsId from './update-cars-id';
import updateCarsNumber from './update-cars-number';

const createNewCar = async (event: Event) => {
  const form = (event.target as Element).closest(TagNames.form) as HTMLElement;
  const name = (form.querySelector(`.${FormClassNames.inputText}`) as HTMLInputElement).value;
  const color = (form.querySelector(`.${FormClassNames.inputColor}`) as HTMLInputElement).value;
  const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
  const params = {
    name: name,
    color: color,
  };
  const erorMessage = document.querySelector(`.${GaragePageClassNames.invalidInputMessage}`);
  if (name.length > 3) {
    if (erorMessage) {
      erorMessage.remove();
    }
    const response = await fetch(`${ServerPath.address}${ServerPath.garage}`, {
      method: RequestMethods.post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const newCarParams = await response.json();
    const car = new Car(newCarParams);
    garage.append(car.render());
    await updateCarsNumber();
  } else {
    if (!erorMessage) {
      const error = new InvalidInputMessage();
      form.after(error.render());
    }
  }
};

export default createNewCar;
