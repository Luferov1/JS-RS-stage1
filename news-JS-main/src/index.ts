import App from './components/app/app';
import './global.css';

const sourceContainer = document.querySelector('.sources');
const chooseAnotherSourceButton = document.querySelector('.choose-another-button');
sourceContainer?.addEventListener('click', (event) => {
    const target = event.target;
    if (target) {
        if ((target as Element).classList.contains('source__item')) {
            sourceContainer.classList.add('sources_hidden');
            chooseAnotherSourceButton?.classList.add('choose-another-button_active');
        }
    }
});
chooseAnotherSourceButton?.addEventListener('click', () => {
    sourceContainer?.classList.remove('sources_hidden');
    chooseAnotherSourceButton?.classList.remove('choose-another-button_active');
});

const app = new App();
app.start();
