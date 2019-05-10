export default class View {
    constructor(data) {
        this.data = data;
    }

    initialRender() {
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
        cardContainer.onmousedown = (e) => {
            mouseIsDown = true;
            firstTouch = e.pageX - cardContainer.offsetLeft;
            scrollLeft = cardContainer.scrollLeft;
            cardContainer.classList.add('active');
        };
        cardContainer.onmouseleave = () => {
            mouseIsDown = false;
            cardContainer.classList.remove('active');
        };
        cardContainer.onmouseup = () => {
            mouseIsDown = false;
            cardContainer.classList.remove('active');
        };
        cardContainer.onmousemove = (e) => {
            if (mouseIsDown) {
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

View.prototype.getDate = function getDate(date) {
    const newDate = new Date(date);
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    return `${day}.${month}.${newDate.getFullYear()}`;
};

View.prototype.reloadCardContainer = function reloadCardContainer() {
    if (document.querySelector('.card-container').innerHTML !== '') {
        document.querySelector('.card-container').innerHTML = '';
    }
};

View.prototype.renderCards = function renderCards(videos) {
    console.log(videos);
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

        document.querySelector('.card-container').appendChild(card);
    });
};
