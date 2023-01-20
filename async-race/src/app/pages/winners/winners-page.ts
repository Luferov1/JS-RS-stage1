import TagNames from '../../abstract/enums/tag-names-enum';
import PageName from '../../abstract/enums/page-name-enum';
import elementCreator from '../../abstract/functions/element-creator';
import createHeaders from '../../abstract/functions/create-headers';
import createPaginationButtons from '../../abstract/functions/create-pagination-buttons';
import GaragePageClassNames from '../../abstract/enums/garage-page-classNames-enum';
import TableHeaders from '../../abstract/enums/table-headers-enum';
import winnerInterface from '@/app/abstract/interfaces/winner-interface';
import carInterface from '../../abstract/interfaces/car-interface';
import createCarSvg from '../../abstract/functions/create-car-svg';

class WinnersPage {
  static params = {
    page: 1,
  };

  private container: HTMLElement;
  private winners: winnerInterface[];
  private cars: carInterface[];

  constructor(cars: carInterface[], winners: winnerInterface[]) {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
    this.winners = winners;
    this.cars = cars.filter((car) => winners.map((winner) => winner.id).includes(car.id));
  }

  private createTable() {
    const table = elementCreator(TagNames.table);
    const tr = elementCreator(TagNames.tr);
    for (const key in TableHeaders) {
      const index = Object.keys(TableHeaders).indexOf(key);
      tr.append(elementCreator(TagNames.th, [], Object.values(TableHeaders)[index]));
    }
    table.append(tr);

    this.winners.forEach((winner, index) => {
      const tr = elementCreator(TagNames.tr);
      // console.log(this.cars, this.winners);
      const winnerName = this.cars.filter((car) => car.id === winner.id)[0].name;
      const carSvg = createCarSvg(this.cars.filter((car) => car.id === winner.id)[0].color);
      [index + 1, carSvg, winnerName, winner.wins, winner.time].forEach((item, index) => {
        let td;
        if (index === 1) {
          td = elementCreator(TagNames.td);
          td.append(item as SVGElement);
        } else {
          td = elementCreator(TagNames.td, [], `${item}`);
        }
        tr.append(td);
      });
      table.append(tr);
    });

    return table;
  }

  async render() {
    const headers = createHeaders(PageName.winners, this.cars, WinnersPage.params.page);
    headers.forEach((header) => this.container.append(header));
    this.container.append(this.createTable());
    this.container.append(createPaginationButtons(PageName.winners));
    return this.container;
  }
}

export default WinnersPage;
