import elementCreator from '../../abstract/functions/element-creator';
import TagNames from '../../abstract/enums/tag-names-enum';
import InputsForm from './components/inputs-form';
import GaragePageClassNames from '../../abstract/enums/garage-page-classNames-enum';
import ButtonClassNames from '../../abstract/enums/button-classNames-enum';
import ButtonText from '../../abstract/enums/button-text-enum';
import carInterface from '@/app/abstract/interfaces/car-interface';
import createGarage from '../../abstract/functions/create-garage';
import './garage-page.scss';

class GaragePage {
  static params = {};

  private container: HTMLElement;
  private cars: carInterface[];

  constructor(cars: carInterface[]) {
    this.cars = cars;
    this.container = elementCreator(TagNames.main, [GaragePageClassNames.main]);
  }

  private createFormsContainer() {
    const div = elementCreator(TagNames.div, [GaragePageClassNames.formsContainer]);
    const form1 = new InputsForm(ButtonText.create);
    const form2 = new InputsForm(ButtonText.update, true);
    div.append(form1.render());
    div.append(form2.render());
    return div;
  }

  private createButtons() {
    const raceButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.yellow],
      ButtonText.race
    );
    const resetButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.yellow],
      ButtonText.reset
    );
    const generateCarsButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.blue, ButtonClassNames.long],
      ButtonText.generateCars
    );
    return [raceButton, resetButton, generateCarsButton];
  }

  private createButtonsContainer() {
    const div = elementCreator(TagNames.div, [GaragePageClassNames.buttonsContainer]);
    div.append(this.createFormsContainer());
    this.createButtons().forEach((button) => div.append(button));
    return div;
  }

  render() {
    this.container.append(this.createButtonsContainer());
    this.container.append(createGarage(this.cars));
    return this.container;
  }
}

export default GaragePage;
