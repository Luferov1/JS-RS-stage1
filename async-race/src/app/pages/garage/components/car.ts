import elementCreator from '../../../abstract/functions/element-creator';
import TagNames from '../../../abstract/enums/tag-names-enum';
import carInterface from '../../../abstract/interfaces/car-interface';
import CarClassNames from '../../../abstract/enums/car-classNames-enum';
import ButtonText from '../../../abstract/enums/button-text-enum';
import ButtonClassNames from '../../../abstract/enums/button-classNames-enum';
import createCarSvg from '../../../abstract/functions/create-car-svg';
import FormClassNames from '../../../abstract/enums/form-classNames-enum';
import allowInput from '../../../abstract/functions/allow-input';
import disableInput from '../../../abstract/functions/disable-input';
import getCarById from '../../../abstract/functions/get-car-by-id';
import deleteCar from '../../../abstract/functions/delete-car';
import startEngine from '../../../abstract/functions/start-engine';

class Car {
  private params: carInterface;
  private container: HTMLElement;

  constructor(params: carInterface) {
    this.params = params;
    this.container = elementCreator(TagNames.div, [CarClassNames.container]);
    this.container.id = `${params.id}`;
  }

  private async selectCar(event: Event) {
    const target = event.target as HTMLElement;
    const form = document.querySelector(`.${FormClassNames.formUpdate}`) as HTMLElement;
    const id = (target.closest(`.${CarClassNames.container}`) as HTMLElement).id;

    if (target.classList.contains(ButtonClassNames.active)) {
      disableInput(form);
      target.classList.remove(ButtonClassNames.active);
    } else {
      const selectButtons = [...document.querySelectorAll(`.${ButtonClassNames.select}`)];
      selectButtons.forEach((button) => button.classList.remove(ButtonClassNames.active));
      target.classList.add(ButtonClassNames.active);
      const data = await getCarById(id);
      allowInput(form, data);
    }
  }

  private createHeader() {
    const div = elementCreator(TagNames.div, [CarClassNames.headerButtons]);
    const selectButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.blue, ButtonClassNames.select],
      ButtonText.select
    );
    const removeButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.blue],
      ButtonText.remove
    );
    const header = elementCreator(TagNames.h3, [CarClassNames.title], this.params.name);

    selectButton.addEventListener('click', this.selectCar);
    removeButton.addEventListener('click', deleteCar);

    div.append(selectButton);
    div.append(removeButton);
    div.append(header);

    return div;
  }

  private createMain() {
    const div = elementCreator(TagNames.div, [CarClassNames.mainButtons]);
    const goButton = elementCreator(TagNames.button, [ButtonClassNames.move, ButtonClassNames.go], ButtonText.go);
    const backButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.move, ButtonClassNames.stop, ButtonClassNames.moveDisabled],
      ButtonText.back
    );

    div.append(goButton);
    div.append(backButton);

    goButton.addEventListener('click', startEngine);

    return div;
  }

  private createFlag() {
    const containFlag = elementCreator(TagNames.div, [CarClassNames.containFlag]);
    const pole = elementCreator(TagNames.div, [CarClassNames.pole]);
    const flag = elementCreator(TagNames.div, [CarClassNames.flag]);
    const shadow = elementCreator(TagNames.div, [CarClassNames.shadow]);
    const flag2 = elementCreator(TagNames.div, [CarClassNames.flag, CarClassNames.flag2]);

    containFlag.append(pole);
    containFlag.append(flag);
    containFlag.append(shadow);
    containFlag.append(flag2);

    return containFlag;
  }

  private createTrack() {
    const track = elementCreator(TagNames.div, [CarClassNames.track]);

    track.append(this.createFlag());
    return track;
  }

  render() {
    this.container.append(this.createHeader());
    this.container.append(this.createMain());
    this.container.append(createCarSvg(this.params.color));
    this.container.append(this.createTrack());
    return this.container;
  }
}

export default Car;
