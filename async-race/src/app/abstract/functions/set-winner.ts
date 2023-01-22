import RequestMethods from '../enums/request-methods-enum';
import ServerPath from '../enums/server-path-enum';
import finishedCarParams from '../interfaces/finished-car-params-interface';
import winnerInterface from '../interfaces/winner-interface';

const setWinner = async (obj: finishedCarParams) => {
  const getWinnerResponse = await fetch(`${ServerPath.address}${ServerPath.winners}/${obj.id}`);
  const status = getWinnerResponse.status;
  if (status === 404) {
    await fetch(`${ServerPath.address}${ServerPath.winners}`, {
      method: RequestMethods.post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: +obj.id,
        wins: 1,
        time: obj.time,
      }),
    });
  }
  if (status === 200) {
    const winnerParams: winnerInterface = await getWinnerResponse.json();
    winnerParams.wins += 1;
    if (obj.time < winnerParams.time) winnerParams.time = obj.time;
    await fetch(`${ServerPath.address}${ServerPath.winners}/${obj.id}`, {
      method: RequestMethods.put,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: winnerParams.time,
        wins: winnerParams.wins,
      }),
    });
  }
};

export default setWinner;
