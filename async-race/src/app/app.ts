import elementCreator from './abstract/functions/element-creator';
import PageName from './abstract/enums/page-name-enum';
import ButtonClassNames from './abstract/enums/button-classNames-enum';
import TagNames from './abstract/enums/tag-names-enum';
import GaragePage from './pages/garage/garage-page';
import WinnersPage from './pages/winners/winners-page';
import getAllCars from './abstract/functions/get-all-cars';
import getAllWinners from './abstract/functions/get-all-winners';
import './app.scss';
import getPageOfCars from './abstract/functions/get-page-of-cars';

class App {
  static params = {
    activePage: PageName.garage,
    garageButton: elementCreator(
      TagNames.button,
      [ButtonClassNames.garage, ButtonClassNames.basic, ButtonClassNames.big, ButtonClassNames.yellow],
      PageName.garage
    ),
    winnersButton: elementCreator(
      TagNames.button,
      [ButtonClassNames.winners, ButtonClassNames.basic, ButtonClassNames.big, ButtonClassNames.yellow],
      PageName.winners
    ),

    changePage() {
      if (this.activePage === PageName.garage) {
        this.activePage = PageName.winners;
        this.createPage();
      } else {
        this.activePage = PageName.garage;
      }
    },

    async createPage() {
      const container = document.body;
      container.innerHTML = '';

      const header = elementCreator(TagNames.header, ['header']);
      if (this.activePage === PageName.garage) {
        this.garageButton.classList.add(ButtonClassNames.active);
      } else {
        this.winnersButton.classList.add(ButtonClassNames.active);
      }

      header.append(this.garageButton);
      header.append(this.winnersButton);

      let page: HTMLElement;

      if (App.params.activePage === PageName.garage) {
        const carsNumber = await getAllCars();
        const cars = await getPageOfCars(1);
        const garagePage = new GaragePage(carsNumber, cars);
        page = garagePage.render();
      } else {
        const carsNumber = await getAllCars();
        const winners = await getAllWinners();
        const winnersPage = new WinnersPage(carsNumber, winners);
        page = await winnersPage.render();
      }

      container.append(header);
      container.append(page);
    },
  };

  private changePage(event: Event) {
    const target = event.target as Element;
    if (!target.classList.contains(ButtonClassNames.active)) {
      if (App.params.activePage === PageName.garage) {
        App.params.activePage = PageName.winners;
        App.params.garageButton.classList.remove(ButtonClassNames.active);
        App.params.createPage();
      } else {
        App.params.activePage = PageName.garage;
        App.params.winnersButton.classList.remove(ButtonClassNames.active);
        App.params.createPage();
      }
    }
  }

  private addButtonListeners() {
    App.params.winnersButton.addEventListener('click', this.changePage);
    App.params.garageButton.addEventListener('click', this.changePage);
  }

  run() {
    this.addButtonListeners();
    App.params.createPage();
  }
}

export default App;
