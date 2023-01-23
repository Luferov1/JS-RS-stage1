import ServerPath from '../enums/server-path-enum';
import winnerInterface from '../interfaces/winner-interface';

const getPageOfWinners = async (pageNumber: number, sortBy = '', order = '') => {
  let url = `${ServerPath.address}${ServerPath.winners}?${ServerPath.limitW}&${ServerPath.page}=${pageNumber}`;
  if (sortBy) {
    url += `&${ServerPath.sort}=${sortBy}`;
  }
  if (order) {
    url += `&${ServerPath.order}=${order}`;
  }
  const response = await fetch(url);
  const data: winnerInterface[] = await response.json();
  return data;
};

export default getPageOfWinners;
