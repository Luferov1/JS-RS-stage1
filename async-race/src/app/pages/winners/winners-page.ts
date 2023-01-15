import TagNames from '@/app/abstract/enums/tag-names-enum';
import elementCreator from '@/app/abstract/functions/element-creator-func';
import ButtonClassNames from '../../abstract/enums/button-classNames-enum';
import ButtonText from '../../abstract/enums/button-text-enum';
import createHeaders from '@/app/abstract/functions/create-headers-func';
import createPaginationButtons from '@/app/abstract/functions/create-pagination-buttons';
import './winners-page.scss';
import GaragePageClassNames from '@/app/abstract/enums/garage-page-classNames-enum';

class WinnersPage {
  private container: HTMLElement;

  constructor() {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
  }

  private createTable() {
    const table = elementCreator(TagNames.table);
    return table;
  }

  render() {
    createHeaders().forEach((header) => this.container.append(header));
    this.container.append(this.createTable());
    this.container.append(createPaginationButtons());
    return this.container;
  }
}

export default WinnersPage;
