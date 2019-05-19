import Model from '../model/Model';

import {
    timeout,
    mouseDown,
    mouseLeave,
    mouseUp,
    mouseMove,
    scrollByClick,
    showTip,
    deleteTip,
    removeSpinner,
} from '../functions';

export default class View {
    constructor(data) {
        this.data = data;
    }

    initialRender() {
        const model = new Model(this.data);
        let timeOut;

        window.addEventListener('resize', () => {
            const x = timeout.bind(this, this.data);
            window.clearTimeout(timeOut);
            timeOut = window.setTimeout(x, 100);
        });

        const searchInput = document.createElement('input');
        searchInput.className = 'search-input';
        searchInput.placeholder = `Enter a string to search (e.g. ${this.data.randomExample})`;

        const form = document.createElement('form');
        form.appendChild(searchInput);

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        cardContainer.addEventListener('mousedown', e => mouseDown(e, cardContainer));
        cardContainer.addEventListener('mouseleave', () => mouseLeave(cardContainer));
        cardContainer.addEventListener('mouseup', e => mouseUp(e, cardContainer, this.data, model));
        cardContainer.addEventListener('mousemove', e => mouseMove(e, cardContainer));

        cardContainer.addEventListener('touchstart', e => mouseDown(e, cardContainer));
        cardContainer.addEventListener('touchcancel', () => mouseLeave(cardContainer));
        cardContainer.addEventListener('touchend', e => mouseUp(e, cardContainer, this.data, model));
        cardContainer.addEventListener('touchmove', e => mouseMove(e, cardContainer));

        document.body.appendChild(form);
        document.body.appendChild(cardContainer);
    }
}

View.prototype.createElement = function createElement(tagName, className, data, icon) {
    const item = document.createElement(tagName);
    let itemContainer = null;
    item.className = className || null;
    if (className !== 'image') {
        item.innerText = data || null;
    } else {
        item.src = data;
    }
    if (icon !== undefined) {
        itemContainer = document.createElement('span');
        itemContainer.className = 'item-container';
        const iconContainer = document.createElement('span');
        iconContainer.innerHTML = icon;

        itemContainer.appendChild(iconContainer);
        itemContainer.appendChild(item);
    }
    this.appendChild(itemContainer || item);
    return item;
};

View.prototype.reloadCardContainer = function reloadCardContainer() {
    if (document.querySelector('.card-container').innerHTML !== '') {
        document.querySelector('.card-container').innerHTML = '';
        document.querySelector('.thumbs-container').style.display = 'none';
    }
};

View.prototype.formatDate = function formatDate(date) {
    console.log(date);
    const newDate = new Date(date);
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    return `${day}.${month}.${newDate.getFullYear()}`;
};

View.prototype.renderCards = function renderCards(videos) {
    videos.forEach((item) => {
        const card = document.createElement('span');
        card.className = 'card';
        const {
            channelTitle,
            title,
            thumbnails,
            description,
            publishedAt,
        } = item.snippet;

        const {
            viewCount,
            likeCount,
            dislikeCount,
        } = item.statistics;

        const titleElement = View.prototype.createElement.call(card, 'a', 'title', title);
        if (title.length > 22) {
            titleElement.innerText = `${titleElement.innerText.slice(0, 22)}...`;
        }
        titleElement.href = `https://www.youtube.com/watch?v=${item.id}`;
        titleElement.target = '_blank';
        View.prototype.createElement.call(card, 'img', 'image', thumbnails.medium.url);
        View.prototype.createElement.call(card, 'span', 'channelTitle', channelTitle, '<i class="fab fa-youtube"></i>');
        View.prototype.createElement.call(card, 'span', 'channelTitle', View.prototype.formatDate(publishedAt), '<i class="far fa-calendar-alt"></i>');
        View.prototype.createElement.call(card, 'span', 'view-count', viewCount, '<i class="fas fa-eye"></i>');
        View.prototype.createElement.call(card, 'span', 'like-count', likeCount, '<i class="fas fa-thumbs-up"></i>');
        View.prototype.createElement.call(card, 'span', 'dislike-count', dislikeCount, '<i class="fas fa-thumbs-down"></i>');
        const descriptionElement = View.prototype.createElement.call(card, 'span', 'description', description);
        if (description.length > 150) {
            descriptionElement.innerText = `${descriptionElement.innerText.slice(0, 150)}...`;
        }
        if (this.data.clientWidth >= 1366) {
            this.data.cardsOnPage = 4;
        } else if (this.data.clientWidth >= 1024 && this.data.clientWidth < 1366) {
            this.data.cardsOnPage = 3;
        } else if (this.data.clientWidth >= 768 && this.data.clientWidth < 1024) {
            this.data.cardsOnPage = 2;
        } else if (this.data.clientWidth < 768) {
            this.data.cardsOnPage = 1;
        }
        card.style.margin = `0 ${(this.data.clientWidth - this.data.cardsOnPage * 300) / (this.data.cardsOnPage * 2)}px`;
        document.querySelector('.card-container').appendChild(card);
    });
    removeSpinner();
};

View.prototype.renderThumbnails = function renderThumbnails() {
    const model = new Model(this.data);
    function createThumbs(tag, className, innerHTML) {
        const item = document.createElement(tag);
        className.forEach(name => item.classList.add(name));
        item.innerHTML = innerHTML || '';
        return item;
    }
    const thumbsContainer = createThumbs('div', ['thumbs-container']);

    const firstThumb = createThumbs('button', ['thumbs', 'left'], '<i class="fas fa-chevron-left"></i>');
    const secondThumb = createThumbs('span', ['thumbs', 'center'], this.data.currentPage);
    const thirdThumb = createThumbs('button', ['thumbs', 'right'], '<i class="fas fa-chevron-right"></i>');

    firstThumb.onclick = scrollByClick.bind(this, 'back', this.data, model);
    firstThumb.onmouseover = () => showTip(this.data, 'back');
    firstThumb.onmouseleave = () => deleteTip('back');

    thirdThumb.onclick = scrollByClick.bind(this, 'forward', this.data, model);
    thirdThumb.onmouseover = () => showTip(this.data, 'forward');
    thirdThumb.onmouseleave = () => deleteTip('forward');

    thumbsContainer.appendChild(firstThumb);
    thumbsContainer.appendChild(secondThumb);
    thumbsContainer.appendChild(thirdThumb);

    document.body.appendChild(thumbsContainer);
};
