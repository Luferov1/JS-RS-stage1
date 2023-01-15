import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';

const createGarage = () => {
  const div = elementCreator(TagNames.div, [GaragePageClassNames.container]);
  const headerSpan = elementCreator(TagNames.span);
  const pageNumberSpan = elementCreator(TagNames.span);
  const header = elementCreator(TagNames.h2, [GaragePageClassNames.header], `Garage (${headerSpan.innerHTML})`);
  const pageNumber = elementCreator(
    TagNames.h3,
    [GaragePageClassNames.pageNumber],
    `Page #${pageNumberSpan.innerHTML}`
  );

  div.append(header);
  div.append(pageNumber);

  return div;
};

export default createGarage;
