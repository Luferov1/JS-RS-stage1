import ButtonClassNames from '../enums/button-classNames-enum';
import PageName from '../enums/page-name-enum';
import getPageOfCars from './get-page-of-cars';
import getPageOfWinners from './get-page-of-winners';

const updatePaginationButtons = async (pageName: string, pageNumber: number) => {
  const prevButton = document.querySelector(`.${ButtonClassNames.prev}`) as HTMLElement;
  const nextButton = document.querySelector(`.${ButtonClassNames.next}`) as HTMLElement;

  prevButton.classList.remove(ButtonClassNames.disabled);
  nextButton.classList.remove(ButtonClassNames.disabled);

  if (pageNumber === 1) {
    prevButton.classList.add(ButtonClassNames.disabled);
  }
  let data;
  if (pageName === PageName.garage) {
    data = await getPageOfCars(pageNumber + 1);
  } else {
    data = await getPageOfWinners(pageNumber + 1);
  }
  if (data.length === 0) nextButton.classList.add(ButtonClassNames.disabled);
};

export default updatePaginationButtons;
