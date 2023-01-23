import TableHeaders from '../enums/table-headers-enum';
import TagNames from '../enums/tag-names-enum';
import carInterface from '../interfaces/car-interface';
import winnerInterface from '../interfaces/winner-interface';
import createCarSvg from './create-car-svg';
import elementCreator from './element-creator';
import updateTableSorting from './update-table-sorting';

const createTable = (winners: winnerInterface[], cars: carInterface[]) => {
  const table = elementCreator(TagNames.table);
  const tr = elementCreator(TagNames.tr);
  for (const key in TableHeaders) {
    const index = Object.keys(TableHeaders).indexOf(key);
    const th = elementCreator(TagNames.th, [], Object.values(TableHeaders)[index]);
    if (index === 3) {
      th.classList.add('wins-sort');
      th.addEventListener('click', updateTableSorting);
    }
    if (index === 4) {
      th.classList.add('time-sort');
      th.addEventListener('click', updateTableSorting);
    }
    tr.append(th);
  }
  table.append(tr);

  winners.forEach((winner, index) => {
    const tr = elementCreator(TagNames.tr);
    const winnerName = cars.filter((car) => car.id === winner.id)[0].name;
    const carSvg = createCarSvg(cars.filter((car) => car.id === winner.id)[0].color);
    [index + 1, carSvg, winnerName, winner.wins, winner.time].forEach((item, index) => {
      let td;
      if (index === 1) {
        td = elementCreator(TagNames.td);
        td.append(item as SVGElement);
      } else {
        td = elementCreator(TagNames.td, [], `${item}`);
      }
      tr.append(td);
    });
    table.append(tr);
  });

  return table;
};

export default createTable;
