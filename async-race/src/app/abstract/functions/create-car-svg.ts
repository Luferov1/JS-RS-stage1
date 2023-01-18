import CarClassNames from '../enums/car-classNames-enum';
import carVectors from '../svg/car-svg-vectors-variable';

const createCarSvg = (color: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  svg.classList.add(CarClassNames.img);

  svg.setAttribute('width', '70');
  svg.setAttribute('height', '70');
  svg.setAttribute('viewBox', '0 0 24 24');

  path.setAttribute('d', carVectors);
  path.setAttribute('fill', color);

  svg.append(path);

  return svg;
};

export default createCarSvg;
