import ServerPath from '../enums/path-enum';
import carInterface from '../interfaces/car-interface';

const getAllWinners = async () => {
  const response = await fetch(`${ServerPath.address}${ServerPath.winners}`);
  const data: carInterface[] = await response.json();
  return data;
};

export default getAllWinners;
