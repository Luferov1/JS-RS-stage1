import './news.css';
import { newsInterface } from '../../../types/index';
class News {
    draw(data: newsInterface[]) {
        const news: newsInterface[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
                const newsItem = newsClone.querySelector('.news__item');
                const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                const newsDescriptionSource = newsClone.querySelector('.news__description-source');
                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                const newsReadMore = newsClone.querySelector('.news__read-more a');

                if (newsItem) {
                    if (idx % 2) newsItem.classList.add('alt');
                }
                if (newsMetaPhoto) {
                    (newsMetaPhoto as HTMLDivElement).style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                }
                if (newsMetaAuthor) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                }
                if (newsMetaDate) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                if (newsDescriptionTitle) {
                    newsDescriptionTitle.textContent = item.title;
                }
                if (newsDescriptionSource) {
                    newsDescriptionSource.textContent = item.source.name;
                }
                if (newsDescriptionContent) {
                    newsDescriptionContent.textContent = item.description;
                }
                if (newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                }
                fragment.append(newsClone);
            } else {
                throw new Error('selects null');
            }
        });
        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
