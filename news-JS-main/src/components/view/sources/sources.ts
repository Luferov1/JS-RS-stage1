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
                }
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
