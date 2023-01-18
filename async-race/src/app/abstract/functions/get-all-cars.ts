import ServerPath from '../enums/path-enum';
import carInterface from '../interfaces/car-interface';

const getAllCars = async () => {
  const response = await fetch(`${ServerPath.address}${ServerPath.garage}`);
  const data: carInterface[] = await response.json();
  return data;
};

export default getAllCars;
