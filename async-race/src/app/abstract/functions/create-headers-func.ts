import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import getAllCars from './get-all-cars';
import getAllWinners from './get-all-winners';
import PageName from '../enums/page-name-enum';
import carInterface from '../interfaces/car-interface';

const createHeaders = async (pageName: string) => {
  let cars: carInterface[];
  if (pageName === PageName.garage) {
    cars = await getAllCars();
  } else {
    cars = await getAllWinners();
  }
  const headerSpan = elementCreator(TagNames.span, [], `${cars.length}`);
  const pageNumberSpan = elementCreator(TagNames.span);
  const header = elementCreator(
    TagNames.h2,
    [GaragePageClassNames.header],
    `${pageName[0].toUpperCase() + pageName.slice(1)} (${headerSpan.innerHTML})`
  );
  const pageNumber = elementCreator(
    TagNames.h3,
    [GaragePageClassNames.pageNumber],
    `Page #${pageNumberSpan.innerHTML}`
  );

  return [header, pageNumber];
};

export default createHeaders;
