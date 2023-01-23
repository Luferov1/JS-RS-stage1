import TagNames from '../../abstract/enums/tag-names-enum';
import PageName from '../../abstract/enums/page-name-enum';
import elementCreator from '../../abstract/functions/element-creator';
import createHeaders from '../../abstract/functions/create-headers';
import createPaginationButtons from '../../abstract/functions/create-pagination-buttons';
import GaragePageClassNames from '../../abstract/enums/garage-page-classNames-enum';
import winnerInterface from '../../abstract/interfaces/winner-interface';
import carInterface from '../../abstract/interfaces/car-interface';
import createTable from '../../abstract/functions/create-table';
import Sorting from '../../abstract/enums/sorting-enum';
import Order from '../../abstract/enums/order-enum';

class WinnersPage {
  static params = {
    page: 1,
    sort: Sorting.id,
    order: Order.none,
  };

  private container: HTMLElement;
  private winners: winnerInterface[];
  private cars: carInterface[];

  constructor(cars: carInterface[], winners: winnerInterface[], allWinners: winnerInterface[]) {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
    this.winners = winners;
    this.cars = cars.filter((car) => allWinners.map((winner) => winner.id).includes(car.id));
  }

  async render() {
    const headers = createHeaders(PageName.winners, this.cars, WinnersPage.params.page);
    headers.forEach((header) => this.container.append(header));
    this.container.append(createTable(this.winners, this.cars));
    this.container.append(createPaginationButtons(PageName.winners));
    return this.container;
  }
}

export default WinnersPage;
