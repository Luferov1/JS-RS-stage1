import Car from '../../pages/garage/components/car';
import GaragePage from '../../pages/garage/garage-page';
import CarClassNames from '../enums/car-classNames-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import createGarage from './create-garage';
import getAllWinners from './get-all-winners';
import getPageOfCars from './get-page-of-cars';
import updateCarsNumber from './update-cars-number';

const deleteCar = async (event: Event) => {
  const car = (event.target as HTMLElement).closest(`.${CarClassNames.container}`) as HTMLElement;
  const id = car.id;
  const allWinners = await getAllWinners();
  const winnersId = allWinners.length ? allWinners.map((item) => item.id) : [];
  await fetch(`${ServerPath.address}${ServerPath.garage}/${id}`, {
    method: RequestMethods.delete,
  });
  if (winnersId.includes(+id)) {
    await fetch(`${ServerPath.address}${ServerPath.winners}/${id}`, {
      method: RequestMethods.delete,
    });
  }
  car.remove();
  const allCars = await updateCarsNumber();
  if (allCars.length >= GaragePage.params.page * 7) {
    const params = allCars[GaragePage.params.page * 7 - 1];
    const car = new Car(params);
    const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
    garage.append(car.render());
  }
  if (allCars.length === (GaragePage.params.page - 1) * 7) {
    const garage = document.querySelector(`.${GaragePageClassNames.container}`) as HTMLElement;
    const cars = await getPageOfCars(GaragePage.params.page - 1);
    GaragePage.params.page -= 1;
    garage.replaceWith(createGarage(allCars, cars, GaragePage.params.page));
  }
};

export default deleteCar;
