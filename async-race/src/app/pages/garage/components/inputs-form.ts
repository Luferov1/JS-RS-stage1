import elementCreator from '../../../abstract/functions/element-creator-func';
import TagNames from '../../../abstract/enums/tag-names-enum';
import InputTypes from '../../../abstract/enums/input-types-enum';
import FormClassNames from '../../../abstract/enums/form-classNames-enum';
import ButtonClassNames from '../../../abstract/enums/button-classNames-enum';
import ButtonText from '../../../abstract/enums/button-text-enum';
import createNewCar from '../../../abstract/functions/create-new-car';

class InputsForm {
  private container: HTMLFormElement;
  private buttonText: string;

  constructor(buttonText: string) {
    this.container =
      buttonText === 'create'
        ? (elementCreator(TagNames.form, [FormClassNames.formCreate]) as HTMLFormElement)
        : (elementCreator(TagNames.form, [FormClassNames.formUpdate]) as HTMLFormElement);
    this.buttonText = buttonText;
  }

  private createTextInput() {
    const input = elementCreator(TagNames.input, [FormClassNames.inputText]) as HTMLInputElement;
    input.type = InputTypes.text;
    input.min = `${3}`;
    input.placeholder = 'At least 3 symbols';
    input.required = true;
    return input;
  }

  private createColorInput() {
    const input = elementCreator(TagNames.input, [FormClassNames.inputColor]) as HTMLInputElement;
    input.type = InputTypes.color;
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
