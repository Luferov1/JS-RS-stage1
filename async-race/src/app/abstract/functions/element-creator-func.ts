const elementCreator = (tag: string, classNames?: string[], inner = '') => {
  const elem = document.createElement(tag);
  elem.innerHTML = inner;
  if (classNames) {
    elem.classList.add(...classNames);
  }

  return elem;
};

export default elementCreator;
