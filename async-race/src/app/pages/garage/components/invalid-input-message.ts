import FormClassNames from '../../../abstract/enums/form-classNames-enum';
import GaragePageClassNames from '../../../abstract/enums/garage-page-classNames-enum';
import TagNames from '../../../abstract/enums/tag-names-enum';
import elementCreator from '../../../abstract/functions/element-creator';

class InvalidInputMessage {
  private container: HTMLElement;

  constructor(className: string) {
    this.container = elementCreator(
      TagNames.div,
      [GaragePageClassNames.invalidInputMessage],
      'car name should contain at least 3 symbols'
    );
    if (className === FormClassNames.formCreate) {
      this.container.classList.add('error_create');
    } else {
      this.container.classList.add('error_update');
    }
  }

  render() {
    return this.container;
  }
}

export default InvalidInputMessage;
