import elementCreator from '../../../abstract/functions/element-creator-func';
import TagNames from '../../../abstract/enums/tag-names-enum';
import carInterface from '../../../abstract/interfaces/car-interface';
import CarClassNames from '../../../abstract/enums/car-classNames-enum';
import ButtonText from '../../../abstract/enums/button-text-enum';
import ButtonClassNames from '../../../abstract/enums/button-classNames-enum';
import carVectors from '../../../abstract/svg/car-svg-vectors-variable';

class Car {
  private params: carInterface;
  private container: HTMLElement;

  constructor(params: carInterface) {
    this.params = params;
    this.container = elementCreator(TagNames.div, [CarClassNames.container]);
  }

  private createHeader() {
    const div = elementCreator(TagNames.div, [CarClassNames.headerButtons]);
    const selectButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.blue],
      ButtonText.select
    );
    const removeButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.basic, ButtonClassNames.blue],
      ButtonText.remove
    );
    const header = elementCreator(TagNames.h3, [CarClassNames.title], this.params.name);

    div.append(selectButton);
    div.append(removeButton);
    div.append(header);

    return div;
  }

  private createMain() {
    const div = elementCreator(TagNames.div, [CarClassNames.mainButtons]);
    const goButton = elementCreator(TagNames.button, [ButtonClassNames.move], ButtonText.go);
    const backButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.move, ButtonClassNames.moveDisabled],
      ButtonText.back
    );

    div.append(goButton);
    div.append(backButton);

    return div;
  }

  private createCar() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    svg.classList.add(CarClassNames.img);

    svg.setAttribute('width', '70');
    svg.setAttribute('height', '70');
    svg.setAttribute('viewBox', '0 0 24 24');

    path.setAttribute('d', carVectors);
    path.setAttribute('fill', this.params.color);

    svg.append(path);

    return svg;
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
    this.container.append(this.createCar());
    this.container.append(this.createTrack());
    return this.container;
  }
}

export default Car;
