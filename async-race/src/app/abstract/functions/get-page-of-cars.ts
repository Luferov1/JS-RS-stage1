import ServerPath from '../enums/server-path-enum';
import carInterface from '../interfaces/car-interface';

const getPageOfCars = async (pageNumber: number) => {
  const response = await fetch(
    `${ServerPath.address}${ServerPath.garage}?${ServerPath.limit}&${ServerPath.page}=${pageNumber}`
  );
  const data: carInterface[] = await response.json();
  return data;
};

export default getPageOfCars;
