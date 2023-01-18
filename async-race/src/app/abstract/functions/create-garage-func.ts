import TagNames from '../enums/tag-names-enum';
import PageName from '../enums/page-name-enum';
import elementCreator from './element-creator-func';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import createPaginationButtons from './create-pagination-buttons';
import createHeaders from './create-headers-func';
import Car from '../../pages/garage/components/car';

const createGarage = async () => {
  const div = elementCreator(TagNames.div, [GaragePageClassNames.container]);
  const headers = await createHeaders(PageName.garage);
  headers.forEach((header) => div.append(header));

  const obj = {
    id: 1,
    name: 'tesla',
    color: '#22ff33',
  };
  const car = new Car(obj);

  div.append(createPaginationButtons());
  div.append(car.render());
  return div;
};

export default createGarage;
