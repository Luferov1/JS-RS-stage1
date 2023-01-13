import PageNameEnum from './abstract/enums/page-name-enum';
import './app.scss';

class App {
  static params = {
    activePage: PageNameEnum.garage,
  };

  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  private drawHeaderButtons() {
    const header = document.createElement('header');
    const garageButton = document.createElement('button');
    const winnersButton = document.createElement('button');

    header.classList.add('header');
    garageButton.classList.add('garage-button', 'button', 'button_big', 'button_yellow', 'button_active');
    winnersButton.classList.add('winners-button', 'button', 'button_big', 'button_yellow');

    garageButton.innerHTML = PageNameEnum.garage;
    winnersButton.innerHTML = PageNameEnum.winners;

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
