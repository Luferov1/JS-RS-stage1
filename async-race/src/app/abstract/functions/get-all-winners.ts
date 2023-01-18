import ServerPath from '../enums/server-path-enum';
import winnerInterface from '../interfaces/winner-interface';

const getAllWinners = async () => {
  const response = await fetch(`${ServerPath.address}${ServerPath.winners}`);
  const data: winnerInterface[] = await response.json();
  return data;
};

export default getAllWinners;
