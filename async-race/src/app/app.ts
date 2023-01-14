import elementCreator from './abstract/functions/element-creator-func';
import PageName from './abstract/enums/page-name-enum';
import ButtonClassNames from './abstract/enums/button-classNames-enum';
import TagNames from './abstract/enums/tag-names-enum';
import GaragePage from './pages/garage/garage-page';
import './app.scss';

class App {
  static params = {
    activePage: PageName.garage,
  };

  private container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  private drawHeaderButtons() {
    const header = elementCreator(TagNames.header, ['header']);
    const garageButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.garage, ButtonClassNames.basic, ButtonClassNames.big, ButtonClassNames.yellow],
      PageName.garage
    );
    const winnersButton = elementCreator(
      TagNames.button,
      [ButtonClassNames.winners, ButtonClassNames.basic, ButtonClassNames.big, ButtonClassNames.yellow],
      PageName.winners
    );

    if (App.params.activePage === PageName.garage) {
      garageButton.classList.add(ButtonClassNames.active);
    } else {
      winnersButton.classList.add(ButtonClassNames.active);
    }

    header.append(garageButton);
    header.append(winnersButton);

    return header;
  }

  private drawPage() {
    let page: HTMLElement;
    if (App.params.activePage === PageName.garage) {
      const garagePage = new GaragePage();
      page = garagePage.render();
    } else {
      const garagePage = new GaragePage();
      page = garagePage.render();
    }
    return page;
  }

  run() {
    this.container.append(this.drawHeaderButtons());
    this.container.append(this.drawPage());
  }
}

export default App;
