import TagNames from '../../abstract/enums/tag-names-enum';
import PageName from '../../abstract/enums/page-name-enum';
import elementCreator from '../../abstract/functions/element-creator-func';
import createHeaders from '../../abstract/functions/create-headers-func';
import createPaginationButtons from '../../abstract/functions/create-pagination-buttons';
import GaragePageClassNames from '../../abstract/enums/garage-page-classNames-enum';
import TableHeaders from '../../abstract/enums/table-headers-enum';
import carInterface from '@/app/abstract/interfaces/car-interface';

class WinnersPage {
  private container: HTMLElement;
  private cars: carInterface[];

  constructor(cars: carInterface[]) {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
    this.cars = cars;
  }

  private createTable() {
    const table = elementCreator(TagNames.table);
    const tr = elementCreator(TagNames.tr);
    for (const key in TableHeaders) {
      const index = Object.keys(TableHeaders).indexOf(key);
      tr.append(elementCreator(TagNames.th, [], Object.values(TableHeaders)[index]));
    }
    table.append(tr);
    return table;
  }

  async render() {
    const headers = createHeaders(PageName.winners, this.cars);
    headers.forEach((header) => this.container.append(header));
    this.container.append(this.createTable());
    this.container.append(createPaginationButtons());
    return this.container;
  }
}

export default WinnersPage;
