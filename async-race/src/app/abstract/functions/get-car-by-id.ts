import ServerPath from '../enums/server-path-enum';
import carInterface from '../interfaces/car-interface';

const getCarById = async (id: string) => {
  const response = await fetch(`${ServerPath.address}${ServerPath.garage}/${id}`);
  const data: carInterface = await response.json();
  return data;
};

export default getCarById;
