import TagNames from '../enums/tag-names-enum';
import PageName from '../enums/page-name-enum';
import elementCreator from './element-creator';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import createPaginationButtons from './create-pagination-buttons';
import createHeaders from './create-headers';
import Car from '../../pages/garage/components/car';
import carInterface from '../interfaces/car-interface';

const createGarage = (carsNumber: carInterface[], cars: carInterface[]) => {
  const div = elementCreator(TagNames.div, [GaragePageClassNames.container]);
  const headers = createHeaders(PageName.garage, carsNumber);
  headers.forEach((header) => div.append(header));

  div.append(createPaginationButtons());

  cars.forEach((obj) => {
    const car = new Car(obj);
    div.append(car.render());
  });

  return div;
};

export default createGarage;
