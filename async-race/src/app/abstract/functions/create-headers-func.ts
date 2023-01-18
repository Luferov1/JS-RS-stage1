import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import carInterface from '../interfaces/car-interface';

const createHeaders = (pageName: string, cars: carInterface[]) => {
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
