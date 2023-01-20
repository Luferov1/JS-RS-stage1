import ButtonClassNames from '../enums/button-classNames-enum';
import ButtonText from '../enums/button-text-enum';
import GaragePageClassNames from '../enums/garage-page-classNames-enum';
import PageName from '../enums/page-name-enum';
import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator';
import updateGaragePagination from './update-garage-pagination';
import updateWinnersPagination from './update-winners-pagination';

const createPaginationButtons = (page: string) => {
  const buttonsContainer = elementCreator(TagNames.div, [GaragePageClassNames.paginationButtons]);

  const prevButton = elementCreator(
    TagNames.button,
    [ButtonClassNames.basic, ButtonClassNames.yellow, ButtonClassNames.prev],
    ButtonText.prev
  );
  const nextButton = elementCreator(
    TagNames.button,
    [ButtonClassNames.basic, ButtonClassNames.yellow, ButtonClassNames.next],
    ButtonText.next
  );

  buttonsContainer.append(prevButton);
  buttonsContainer.append(nextButton);

  if (page === PageName.garage) {
    buttonsContainer.addEventListener('click', updateGaragePagination);
  } else {
    buttonsContainer.addEventListener('click', updateWinnersPagination);
  }

  return buttonsContainer;
};

export default createPaginationButtons;
