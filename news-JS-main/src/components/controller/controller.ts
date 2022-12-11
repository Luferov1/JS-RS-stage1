import AppLoader from './appLoader';
import { sourcesInterface } from '../../types/index';

type Callback = (data?: sourcesInterface) => void;

class AppController extends AppLoader {
    getSources(callback: Callback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        if (target) {
            while (target !== newsContainer) {
                if ((target as HTMLDivElement).classList.contains('source__item')) {
                    const sourceId = (target as HTMLDivElement).getAttribute('data-source-id');
                    if ((newsContainer as HTMLDivElement).getAttribute('data-source') !== sourceId) {
                        if (sourceId) {
                            (newsContainer as HTMLDivElement).setAttribute('data-source', sourceId);
                        }
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                if (target) {
                    target = (target as Node).parentNode;
                }
            }
        }
    }
}

export default AppController;
