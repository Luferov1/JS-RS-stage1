import FormClassNames from '../enums/form-classNames-enum';

const disableInput = (form: HTMLElement) => {
  const textInput = form.querySelector(`.${FormClassNames.inputText}`) as HTMLInputElement;
  const colorInput = form.querySelector(`.${FormClassNames.inputColor}`) as HTMLInputElement;

  textInput.value = '';
  colorInput.value = '#000';

  textInput.disabled = true;
  colorInput.disabled = true;
  form.classList.add(FormClassNames.disabled);
  // textInput.focus();
};

export default disableInput;
