import elementCreator from '../../../abstract/functions/element-creator';
import TagNames from '../../../abstract/enums/tag-names-enum';
import InputTypes from '../../../abstract/enums/input-types-enum';
import FormClassNames from '../../../abstract/enums/form-classNames-enum';
import ButtonClassNames from '../../../abstract/enums/button-classNames-enum';
import ButtonText from '../../../abstract/enums/button-text-enum';
import createNewCar from '../../../abstract/functions/create-new-car';
import updateCar from '../../../abstract/functions/udpate-car';

class InputsForm {
  private container: HTMLFormElement;
  private buttonText: string;
  private disabled: boolean;

  constructor(buttonText: string, disabled = false) {
    this.container =
      buttonText === 'create'
        ? (elementCreator(TagNames.form, [FormClassNames.formCreate]) as HTMLFormElement)
        : (elementCreator(TagNames.form, [FormClassNames.formUpdate]) as HTMLFormElement);
    this.container.setAttribute('onsubmit', 'return false');
    this.disabled = disabled;
    this.buttonText = buttonText;
    this.disabled ? this.container.classList.add(FormClassNames.disabled) : null;
  }

  private createTextInput() {
    const input = elementCreator(TagNames.input, [FormClassNames.inputText]) as HTMLInputElement;
    input.type = InputTypes.text;
    input.min = `${3}`;
    input.placeholder = 'At least 3 symbols';
    input.required = true;
    if (this.disabled) {
      input.disabled = true;
    }
    return input;
  }

  private createColorInput() {
    const input = elementCreator(TagNames.input, [FormClassNames.inputColor]) as HTMLInputElement;
    input.type = InputTypes.color;
    if (this.disabled) {
      input.disabled = true;
    }
    return input;
  }

  private createButton() {
    const button = elementCreator(
      TagNames.button,
      [FormClassNames.button, ButtonClassNames.basic, ButtonClassNames.blue],
      this.buttonText
    ) as HTMLButtonElement;
    button.type = InputTypes.button;
    if (this.buttonText === ButtonText.create) {
      button.addEventListener('click', createNewCar);
    } else {
      button.addEventListener('click', updateCar);
    }
    return button;
  }

  render() {
    this.container.append(this.createTextInput());
    this.container.append(this.createColorInput());
    this.container.append(this.createButton());
    return this.container;
  }
}

export default InputsForm;
