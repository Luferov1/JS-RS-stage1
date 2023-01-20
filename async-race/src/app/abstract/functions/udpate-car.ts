import Car from '../../pages/garage/components/car';
import InvalidInputMessage from '../../pages/garage/components/invalid-input-message';
import ButtonClassNames from '../enums/button-classNames-enum';
import CarClassNames from '../enums/car-classNames-enum';
import FormClassNames from '../enums/form-classNames-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import disableInput from './disable.input';
import updateCarsNumber from './update-cars-number';

const updateCar = async () => {
  const targetCar = (
    document.querySelector(`.${CarClassNames.container} .${ButtonClassNames.active}`) as HTMLElement
  ).closest(`.${CarClassNames.container}`) as HTMLElement;
  const form = document.querySelector(`.${FormClassNames.formUpdate}`) as HTMLElement;
  const name = (form.querySelector(`.${FormClassNames.inputText}`) as HTMLInputElement).value;
  const color = (form.querySelector(`.${FormClassNames.inputColor}`) as HTMLInputElement).value;
  const id = targetCar.id;
  const selectButton = targetCar.querySelector(`.${ButtonClassNames.active}`) as HTMLElement;

  const params = {
    name: name,
    color: color,
  };
  const errorMessage = document.querySelector('.error_update');

  if (name.length >= 3) {
    if (errorMessage) {
      errorMessage.remove();
    }
    const response = await fetch(`${ServerPath.address}${ServerPath.garage}/${id}`, {
      method: RequestMethods.put,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const newCarParams = await response.json();
    const car = new Car(newCarParams);
    targetCar.replaceWith(car.render());
    await updateCarsNumber();
    disableInput(form);
    selectButton.classList.remove(ButtonClassNames.active);
  } else {
    if (!errorMessage) {
      const error = new InvalidInputMessage(FormClassNames.formUpdate);
      form.after(error.render());
    }
  }
};

export default updateCar;
