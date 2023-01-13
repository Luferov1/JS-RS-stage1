import TagNames from '@/app/abstract/enums/tag-names-enum';
import './garage-page.scss';

class GaragePage {
  static params = {};

  container: HTMLElement;

  constructor() {
    this.container = document.createElement(TagNames.main);
    this.container.classList.add('main');
  }

  private drawInputsContainer() {
    return;
  }

  render() {
    return this.container;
  }
}

export default GaragePage;
