import Car from '../../pages/garage/components/car';
import InvalidInputMessage from '../../pages/garage/components/invalid-input-message';
import CarClassNames from '../enums/car-classNames-enum';
import FormClassNames from '../enums/form-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import TagNames from '../enums/tag-names-enum';
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
  const errorMessage = document.querySelector('.error_create');
  if (name.length >= 3) {
    if (errorMessage) {
      errorMessage.remove();
    }
    const response = await fetch(`${ServerPath.address}${ServerPath.garage}`, {
      method: RequestMethods.post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const newCarParams = await response.json();
    await updateCarsNumber();
    (document.querySelector(`.${FormClassNames.formCreate} .${FormClassNames.inputText}`) as HTMLInputElement).value =
      '';
    if (document.querySelectorAll(`.${CarClassNames.container}`).length < 7) {
      const car = new Car(newCarParams);
      garage.append(car.render());
    }
  } else {
    if (!errorMessage) {
      const error = new InvalidInputMessage(FormClassNames.formCreate);
      form.after(error.render());
    }
  }
};

export default createNewCar;
