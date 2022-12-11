import AppLoader from './appLoader';
import { newsInterface, sourcesInterface } from '../../types/index';

type sourcesCallback = (data: sourcesInterface) => void;
type newsCallback = (data: newsInterface) => void;

class AppController extends AppLoader {
    getSources(callback: sourcesCallback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback as () => void
        );
    }

    getNews(e: Event, callback: newsCallback) {
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
                            callback as () => void
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
