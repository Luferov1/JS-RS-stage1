import elementCreator from '@/app/abstract/functions/element-creator-func';
import TagNames from '@/app/abstract/enums/tag-names-enum';
import './garage-page.scss';

class GaragePage {
  static params = {};

  container: HTMLElement;

  constructor() {
    this.container = elementCreator(TagNames.main, ['main']);
  }

  private createInputsContainer() {
    return;
  }

  render() {
    return this.container;
  }
}

export default GaragePage;
