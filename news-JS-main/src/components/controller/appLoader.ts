import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: 'd07b05a8ef994f9fa8db55b92d548e63', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
