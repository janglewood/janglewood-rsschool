import Model from '../model/Model';

export default class View {
    constructor(data) {
        this.data = data;
    }

    initialRender() {
        const model = new Model(this.data);
        window.onresize = () => {
            this.data.clientWidth = document.documentElement.clientWidth;
            if (this.data.clientWidth >= 1366) {
                this.data.cardsOnPage = 4;
            } else if (this.data.clientWidth >= 1024 && this.data.clientWidth < 1366) {
                this.data.cardsOnPage = 3;
            } else if (this.data.clientWidth >= 768 && this.data.clientWidth < 1024) {
                this.data.cardsOnPage = 2;
            } else if (this.data.clientWidth < 768) {
                this.data.cardsOnPage = 1;
            }
            [...document.querySelectorAll('.card')].forEach((card) => { card.style.margin = `0 ${(this.data.clientWidth - this.data.cardsOnPage * 300) / (this.data.cardsOnPage * 2)}px`; });
            console.log(this.data.currentPage);
        };

        const searchInput = document.createElement('input');
        searchInput.className = 'search-input';
        searchInput.placeholder = `Enter a string to search (e.g. ${this.data.randomExample})`;

        const form = document.createElement('form');
        form.appendChild(searchInput);

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        let mouseIsDown = false;
        let firstTouch;
        let scrollLeft;
        let movesIsBeen = false;
        cardContainer.onmousedown = (e) => {
            mouseIsDown = true;
            firstTouch = e.pageX - cardContainer.offsetLeft;
            scrollLeft = cardContainer.scrollLeft;
            cardContainer.classList.add('active');
        };
        cardContainer.onmouseleave = () => {
            cardContainer.classList.remove('active');
            mouseIsDown = false;
        };
        cardContainer.onmouseup = (e) => {
            const width = this.data.clientWidth;
            if (movesIsBeen) {
                cardContainer.style.scrollBehavior = 'smooth';
                if (e.pageX > firstTouch) { // back
                    if (e.pageX - firstTouch > width * 0.05) {
                        this.data.currentPage -= 1;
                        this.data.currentPage = this.data.currentPage < 1 ? 1 : this.data.currentPage;
                        console.log(this.data.currentPage);
                        cardContainer.scrollTo(width * (this.data.currentPage - 1), 0);
                    } else {
                        cardContainer.scrollTo(width * (this.data.currentPage - 1), 0);
                    }
                } else if (e.pageX < firstTouch) { // forward
                    if (firstTouch - e.pageX > width * 0.05) {
                        cardContainer.scrollTo(width * this.data.currentPage, 0);
                        this.data.currentPage += 1;
                        console.log(this.data.currentPage);
                        if (this.data.currentPage === Math.floor(this.data.cardsCount / this.data.cardsOnPage)) {
                            model.getData(document.querySelector('.search-input').value, this.data.pageToken);
                        }
                    } else {
                        cardContainer.scrollTo(width * (this.data.currentPage - 1), 0);
                    }
                }
                cardContainer.style.scrollBehavior = 'auto';
            }
            cardContainer.classList.remove('active');
            movesIsBeen = false;
            mouseIsDown = false;
        };
        cardContainer.onmousemove = (e) => {
            if (mouseIsDown) {
                movesIsBeen = true;
                e.preventDefault();
                const x = e.pageX - cardContainer.offsetLeft;
                const step = (x - firstTouch) * 1.5;
                cardContainer.scrollLeft = scrollLeft - step;
            }
        };

        document.body.appendChild(form);
        document.body.appendChild(cardContainer);
    }
}

View.prototype.creatingElement = function creatingElement(tagName, className, data, icon) {
    const item = document.createElement(tagName);
    let itemContainer = null;
    item.className = className || null;
    if (className !== 'image') {
        item.innerText = data || null; // add feature for hide large text
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
    }
};
View.prototype.getDate = function getDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    return `${day}.${month}.${newDate.getFullYear()}`;
};
View.prototype.renderCards = function renderCards(videos) {
    // console.log(videos);
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

        const tip = document.createElement('span');
        tip.className = 'tip';
        tip.innerText = '[...]';
        const titleElement = View.prototype.creatingElement.call(card, 'a', 'title', title);
        if (title.length > 22) {
            titleElement.innerText = titleElement.innerText.slice(0, 30);
            titleElement.appendChild(tip);
            tip.onclick = (e) => {
                e.preventDefault();
                titleElement.innerText = title;
            };
        }
        titleElement.href = `https://www.youtube.com/watch?v=${item.id}`;
        titleElement.target = '_blank';
        View.prototype.creatingElement.call(card, 'img', 'image', thumbnails.medium.url);
        View.prototype.creatingElement.call(card, 'span', 'channelTitle', channelTitle, '<i class="fab fa-youtube"></i>');
        View.prototype.creatingElement.call(card, 'span', 'channelTitle', View.prototype.getDate(publishedAt), '<i class="far fa-calendar-alt"></i>');
        View.prototype.creatingElement.call(card, 'span', 'view-count', viewCount, '<i class="fas fa-eye"></i>');
        View.prototype.creatingElement.call(card, 'span', 'like-count', likeCount, '<i class="fas fa-thumbs-up"></i>');
        View.prototype.creatingElement.call(card, 'span', 'dislike-count', dislikeCount, '<i class="fas fa-thumbs-down"></i>');
        const descriptionElement = View.prototype.creatingElement.call(card, 'span', 'description', description);
        if (description.length > 65) {
            const tipClone = tip.cloneNode(true);
            descriptionElement.innerText = descriptionElement.innerText.slice(0, 65);
            descriptionElement.appendChild(tipClone);
            tipClone.onclick = (e) => {
                e.preventDefault();
                document.body.style.height = '100%';
                descriptionElement.innerText = description;
                card.style.height = '100%';
            };
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
};
