import TagNames from '@/app/abstract/enums/tag-names-enum';
import elementCreator from '@/app/abstract/functions/element-creator-func';
import ButtonClassNames from '../../abstract/enums/button-classNames-enum';
import ButtonText from '../../abstract/enums/button-text-enum';
import './winners-page.scss';

class WinnersPage {
  private container: HTMLElement;

  constructor() {
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
  }

  render() {

    return this.container;
  }
}

export default WinnersPage;
