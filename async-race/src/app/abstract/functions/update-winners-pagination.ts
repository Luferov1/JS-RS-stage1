import WinnersPage from '../../pages/winners/winners-page';
import winnersPage from '../../pages/winners/winners-page';
import ButtonClassNames from '../enums/button-classNames-enum';
import TagNames from '../enums/tag-names-enum';
import createTable from './create-table';
import getAllCars from './get-all-cars';
import getPageOfWinners from './get-page-of-winners';

const updateWinnersPagination = async (event: Event) => {
  const target = event.target as HTMLElement;
  const winnersTable = document.querySelector(`${TagNames.table}`) as HTMLElement;
  if (target.classList.contains(ButtonClassNames.next)) {
    const cars = await getPageOfWinners(winnersPage.params.page + 1);
    if (cars.length > 0) {
      const carsNumber = await getAllCars();
      winnersPage.params.page += 1;
      winnersTable.replaceWith(createTable(cars, carsNumber));
    }
  }
  if (target.classList.contains(ButtonClassNames.prev)) {
    if (WinnersPage.params.page > 1) {
      const cars = await getPageOfWinners(WinnersPage.params.page - 1);
      const carsNumber = await getAllCars();
      WinnersPage.params.page -= 1;
      winnersTable.replaceWith(createTable(cars, carsNumber));
    }
  }
};

export default updateWinnersPagination;
