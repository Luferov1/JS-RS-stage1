import PageNameEnum from './abstract/enums/page-name-enum';

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

    garageButton.classList.add('button', 'garage-button');
    winnersButton.classList.add('button', 'winners-button');

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
