import elementCreator from '../../../abstract/functions/element-creator-func';
import TagNames from '../../../abstract/enums/tag-names-enum';
import InputTypes from '../../../abstract/enums/input-types-enum';
import FormClassNames from '../../../abstract/enums/form-classNames-enum';
import ButtonClassNames from '../../../abstract/enums/button-classNames-enum';

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
