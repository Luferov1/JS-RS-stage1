import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import ButtonClassNames from '../enums/button-classNames-enum';
import ButtonText from '../enums/button-text-enum';

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
  const prevButton = elementCreator(
    TagNames.button,
    [ButtonClassNames.basic, ButtonClassNames.yellow],
    ButtonText.prev
  );
  const nextButton = elementCreator(
    TagNames.button,
    [ButtonClassNames.basic, ButtonClassNames.yellow],
    ButtonText.next
  );
  const buttonsContainer = elementCreator(TagNames.div, [GaragePageClassNames.paginationButtons]);

  buttonsContainer.append(prevButton);
  buttonsContainer.append(nextButton);

  div.append(header);
  div.append(pageNumber);
  div.append(buttonsContainer);

  return div;
};

export default createGarage;
