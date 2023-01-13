import TagNames from '@/app/abstract/enums/tag-names-enum';
import InputTypes from '@/app/abstract/enums/input-types-enum';
import './inputs-form.scss';

class InputsForm {
  container: HTMLFormElement;
  buttonText: string;

  constructor(buttonText: string) {
    this.container = document.createElement('form');
    this.buttonText = buttonText;
  }
}

export default InputsForm;
