import ServerPath from '../enums/server-path-enum';
import winnerInterface from '../interfaces/winner-interface';

const getPageOfWinners = async (pageNumber: number) => {
  const response = await fetch(
    `${ServerPath.address}${ServerPath.winners}?${ServerPath.limitW}&${ServerPath.page}=${pageNumber}`
  );
  const data: winnerInterface[] = await response.json();
  return data;
};

export default getPageOfWinners;
