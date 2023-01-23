import GaragePage from '../../pages/garage/garage-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import createGarage from './create-garage';
import getAllCars from './get-all-cars';
import getPageOfCars from './get-page-of-cars';

const resetRace = async (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains(ButtonClassNames.disabled)) {
    const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
    const raceButton = document.querySelector(`.${ButtonClassNames.race}`) as HTMLElement;
    const cars = await getPageOfCars(GaragePage.params.page);
    const carsNumber = await getAllCars();
    raceButton.classList.remove(ButtonClassNames.active);
    garage.replaceWith(createGarage(carsNumber, cars, GaragePage.params.page));
  }
};

export default resetRace;
