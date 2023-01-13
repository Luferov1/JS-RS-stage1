import PageName from './abstract/enums/page-name-enum';
import ButtonClassNames from './abstract/enums/button-classNames-enum';
import TagNames from './abstract/enums/tag-names-enum';
import './app.scss';

class App {
  static params = {
    activePage: PageName.garage,
  };

  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  private drawHeaderButtons() {
    const header = document.createElement(TagNames.header);
    const garageButton = document.createElement(TagNames.button);
    const winnersButton = document.createElement(TagNames.button);

    header.classList.add('header');
    garageButton.classList.add(
      ButtonClassNames.garage,
      ButtonClassNames.basic,
      ButtonClassNames.big,
      ButtonClassNames.yellow
    );
    winnersButton.classList.add(
      ButtonClassNames.winners,
      ButtonClassNames.basic,
      ButtonClassNames.big,
      ButtonClassNames.yellow
    );

    if (App.params.activePage === PageName.garage) {
      garageButton.classList.add(ButtonClassNames.active);
    } else {
      winnersButton.classList.add(ButtonClassNames.active);
    }

    garageButton.innerHTML = PageName.garage;
    winnersButton.innerHTML = PageName.winners;

    header.append(garageButton);
    header.append(winnersButton);

    return header;
  }

  // private drawPage(page) {

  // }

  run() {
    this.container.append(this.drawHeaderButtons());
  }
}

export default App;
