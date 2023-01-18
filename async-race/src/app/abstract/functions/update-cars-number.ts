import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import getAllCars from './get-all-cars';

const updateCarsNumber = async () => {
  const headerSpan = document.querySelector(`.${GaragePageClassNames.header} ${TagNames.span}`) as HTMLElement;
  const data = await getAllCars();
  headerSpan.innerHTML = `${data.length}`;
};

export default updateCarsNumber;
