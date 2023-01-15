import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import createPaginationButtons from './create-pagination-buttons';
import createHeaders from './create-headers-func';

const createGarage = () => {
  const div = elementCreator(TagNames.div, [GaragePageClassNames.container]);
  createHeaders().forEach((header) => div.append(header));

  div.append(createPaginationButtons());
  return div;
};

export default createGarage;
