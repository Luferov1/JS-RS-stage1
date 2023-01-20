import GaragePage from '../../pages/garage/garage-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import createGarage from './create-garage';
import getAllCars from './get-all-cars';
import getPageOfCars from './get-page-of-cars';

const updateGaragePagination = async (event: Event) => {
  const target = event.target as HTMLElement;
  const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
  if (target.classList.contains(ButtonClassNames.next)) {
    const cars = await getPageOfCars(GaragePage.params.page + 1);
    if (cars.length > 0) {
      const carsNumber = await getAllCars();
      GaragePage.params.page += 1;
      garage.replaceWith(createGarage(carsNumber, cars));
    }
  }
  if (target.classList.contains(ButtonClassNames.prev)) {
    if (GaragePage.params.page > 1) {
      const cars = await getPageOfCars(GaragePage.params.page - 1);
      const carsNumber = await getAllCars();
      GaragePage.params.page -= 1;
      garage.replaceWith(createGarage(carsNumber, cars));
    }
  }
};

export default updateGaragePagination;
