import TagNames from '../../abstract/enums/tag-names-enum';
import PageName from '../../abstract/enums/page-name-enum';
import elementCreator from '../../abstract/functions/element-creator-func';
import createHeaders from '../../abstract/functions/create-headers-func';
import createPaginationButtons from '../../abstract/functions/create-pagination-buttons';
import GaragePageClassNames from '../../abstract/enums/garage-page-classNames-enum';
import TableHeaders from '../../abstract/enums/table-headers-enum';

class WinnersPage {
  private container: HTMLElement;

  constructor() {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
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
    const headers = await createHeaders(PageName.winners);
    headers.forEach((header) => this.container.append(header));
    this.container.append(this.createTable());
    this.container.append(createPaginationButtons());
    return this.container;
  }
}

export default WinnersPage;
