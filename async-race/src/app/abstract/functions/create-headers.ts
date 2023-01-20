import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator';
import carInterface from '../interfaces/car-interface';
import winnerInterface from '../interfaces/winner-interface';

const createHeaders = (pageName: string, cars: carInterface[] | winnerInterface[], pageNumber: number) => {
  const headerSpanText = String(cars.length);
  const pageNumberSpanText = `${pageNumber}`;
  const header = elementCreator(
    TagNames.h2,
    [GaragePageClassNames.header],
    `${pageName[0].toUpperCase() + pageName.slice(1)} (<span>${headerSpanText}</span>)`
  );
  const pageNumberHeader = elementCreator(
    TagNames.h3,
    [GaragePageClassNames.pageNumber],
    `Page #<span>${pageNumberSpanText}</span>`
  );

  return [header, pageNumberHeader];
};

export default createHeaders;
