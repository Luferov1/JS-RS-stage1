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
                } else this.thrErr();
                if (newsMetaPhoto) {
                    (newsMetaPhoto as HTMLDivElement).style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                } else this.thrErr();
                if (newsMetaAuthor) {
                    newsMetaAuthor.textContent = item.author || item.source.name;
                } else this.thrErr();
                if (newsMetaDate) {
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                } else this.thrErr();
                if (newsDescriptionTitle) {
                    newsDescriptionTitle.textContent = item.title;
                } else this.thrErr();
                if (newsDescriptionSource) {
                    newsDescriptionSource.textContent = item.source.name;
                } else this.thrErr();
                if (newsDescriptionContent) {
                    newsDescriptionContent.textContent = item.description;
                } else this.thrErr();
                if (newsReadMore) {
                    newsReadMore.setAttribute('href', item.url);
                } else this.thrErr();
                fragment.append(newsClone);
            } else this.thrErr();
        });
        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        } else this.thrErr();
    }

    thrErr() {
        throw new Error('selector is null');
    }
}

export default News;
