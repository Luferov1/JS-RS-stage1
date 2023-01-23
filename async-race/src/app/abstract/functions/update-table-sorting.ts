import WinnersPage from '../../pages/winners/winners-page';
import Order from '../enums/order-enum';
import Sorting from '../enums/sorting-enum';
import TagNames from '../enums/tag-names-enum';
import createTable from './create-table';
import getAllCars from './get-all-cars';
import getAllWinners from './get-all-winners';
import getPageOfWinners from './get-page-of-winners';

const updateTableSorting = async (event: Event) => {
  const target = event.target as HTMLElement;
  const table = document.querySelector(`${TagNames.table}`) as HTMLElement;
  if (target.classList.contains('wins-sort')) {
    const carsNumber = await getAllCars();
    const allWinners = await getAllWinners();

    if (WinnersPage.params.sort !== Sorting.wins) WinnersPage.params.sort = Sorting.wins;
    if (WinnersPage.params.order === Order.none) {
      WinnersPage.params.order = Order.asc;
    } else if (WinnersPage.params.order === Order.asc) {
      WinnersPage.params.order = Order.desc;
    } else {
      WinnersPage.params.order = Order.asc;
    }
    const winnersOnPage = await getPageOfWinners(
      WinnersPage.params.page,
      WinnersPage.params.sort,
      WinnersPage.params.order
    );

    const cars = carsNumber.filter((car) => allWinners.map((winner) => winner.id).includes(car.id));
    const newTable = createTable(winnersOnPage, cars);
    table.replaceWith(newTable);
  } else {
    const carsNumber = await getAllCars();
    const allWinners = await getAllWinners();

    if (WinnersPage.params.sort !== Sorting.time) WinnersPage.params.sort = Sorting.time;
    if (WinnersPage.params.order === Order.none) {
      WinnersPage.params.order = Order.asc;
    } else if (WinnersPage.params.order === Order.asc) {
      WinnersPage.params.order = Order.desc;
    } else {
      WinnersPage.params.order = Order.asc;
    }

    const winnersOnPage = await getPageOfWinners(
      WinnersPage.params.page,
      WinnersPage.params.sort,
      WinnersPage.params.order
    );

    const cars = carsNumber.filter((car) => allWinners.map((winner) => winner.id).includes(car.id));
    const newTable = createTable(winnersOnPage, cars);
    table.replaceWith(newTable);
  }
};

export default updateTableSorting;
