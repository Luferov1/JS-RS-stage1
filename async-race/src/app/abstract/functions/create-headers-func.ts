import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import carInterface from '../interfaces/car-interface';
import winnerInterface from '../interfaces/winner-interface';
const createHeaders = (pageName: string, cars: carInterface[] | winnerInterface[]) => {
  const headerSpanText = String(cars.length);
  const pageNumberSpanText = '1';
  const header = elementCreator(
    TagNames.h2,
    [GaragePageClassNames.header],
    `${pageName[0].toUpperCase() + pageName.slice(1)} (<span>${headerSpanText}</span>)`
  );
  const pageNumber = elementCreator(
    TagNames.h3,
    [GaragePageClassNames.pageNumber],
    `Page #<span>${pageNumberSpanText}</span>`
  );

  return [header, pageNumber];
};

export default createHeaders;
