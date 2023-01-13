import elementCreator from '@/app/abstract/functions/element-creator-func';
import TagNames from '@/app/abstract/enums/tag-names-enum';
import InputTypes from '@/app/abstract/enums/input-types-enum';
import FormClassNames from '@/app/abstract/enums/form-classNames-enum';
import ButtonClassNames from '@/app/abstract/enums/button-classNames-enum';
import './inputs-form.scss';

class InputsForm {
  container: HTMLFormElement;
  buttonText: string;

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
    );
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
