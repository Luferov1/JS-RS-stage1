import ButtonClassNames from '../enums/button-classNames-enum';
import ButtonText from '../enums/button-text-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator-func';

const createPaginationButtons = () => {
  const buttonsContainer = elementCreator(TagNames.div, [GaragePageClassNames.paginationButtons]);

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

  buttonsContainer.append(prevButton);
  buttonsContainer.append(nextButton);

  return buttonsContainer;
};

export default createPaginationButtons;
