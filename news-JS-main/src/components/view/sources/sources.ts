import './sources.css';
import { sourcesInterface } from '../../../types/index';

class Sources {
    draw(data: sourcesInterface[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true);
                const sourceItemName = (sourceClone as Element).querySelector('.source__item-name');
                const sourceItem = (sourceClone as Element).querySelector('.source__item');
                if (sourceItemName) {
                    sourceItemName.textContent = item.name;
                } else this.thrErr();
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                } else this.thrErr();

                fragment.append(sourceClone);
            } else this.thrErr();
        });
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        } else this.thrErr();
    }

    thrErr() {
        throw new Error('selector is null');
    }
}

export default Sources;
