import TagNames from '../enums/tag-names-enum';
import elementCreator from './element-creator';

const showWin = (name: string) => {
  const h2 = elementCreator(TagNames.h2, ['win-message'], `${name} wins`);
  document.body.append(h2);
  setTimeout(() => h2.remove(), 2000);
};

export default showWin;
