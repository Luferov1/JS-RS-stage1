import GaragePageClassNames from '../../../abstract/enums/garage-page-classNames-enum';
import TagNames from '../../../abstract/enums/tag-names-enum';
import elementCreator from '../../../abstract/functions/element-creator';

class InvalidInputMessage {
  private container: HTMLElement;

  constructor() {
    this.container = elementCreator(
      TagNames.div,
      [GaragePageClassNames.invalidInputMessage],
      'car name should contain at least 3 symbols'
    );
  }

  render() {
    return this.container;
  }
}

export default InvalidInputMessage;
