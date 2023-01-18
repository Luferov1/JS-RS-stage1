import CarClassNames from '../enums/car-classNames-enum';
import getAllCars from './get-all-cars';

const updateCarsId = async () => {
  const carsObjs = await getAllCars();
  const carsConts = [...document.querySelectorAll(`.${CarClassNames.container}`)];
  carsConts.forEach((container, index) => (container.id = `${carsObjs[index].id}`));
};

export default updateCarsId;
