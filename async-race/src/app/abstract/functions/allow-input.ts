import FormClassNames from '../enums/form-classNames-enum';
import carInterface from '../interfaces/car-interface';

const allowInput = (form: HTMLElement, data: carInterface) => {
  const textInput = form.querySelector(`.${FormClassNames.inputText}`) as HTMLInputElement;
  const colorInput = form.querySelector(`.${FormClassNames.inputColor}`) as HTMLInputElement;

  textInput.disabled = false;
  colorInput.disabled = false;

  textInput.value = data.name;
  colorInput.value = data.color;
  form.classList.remove(FormClassNames.disabled);
};

export default allowInput;
