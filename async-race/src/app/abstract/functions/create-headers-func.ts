import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';

const createHeaders = () => {
  const headerSpan = elementCreator(TagNames.span);
  const pageNumberSpan = elementCreator(TagNames.span);
  const header = elementCreator(TagNames.h2, [GaragePageClassNames.header], `Garage (${headerSpan.innerHTML})`);
  const pageNumber = elementCreator(
    TagNames.h3,
    [GaragePageClassNames.pageNumber],
    `Page #${pageNumberSpan.innerHTML}`
  );

  return [header, pageNumber];
};

export default createHeaders;
