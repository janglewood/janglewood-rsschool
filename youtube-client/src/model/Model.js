export default class Model {
    constructor(data) {
        this.data = data;
    }
}

Model.prototype.getRandomQuerie = function getRandomQuerie(queries) {
    return queries[Math.floor(Math.random() * (queries.length + 1))];
};
Model.prototype.getData = function getData(query) {
    const { token } = this.data;
    // clear card-container when were is new request
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${token}&type=video&part=snippet&maxResults=15&q=${query}`)
        .then(searchRes => searchRes.json())
        .then(searchList => searchList.items.forEach(item => fetch(`https://www.googleapis.com/youtube/v3/videos?key=${token}&id=${item.id.videoId}&part=snippet,statistics`)
            .then(videoRes => videoRes.json())
            .then(videoData => Model.prototype.renderCards(videoData.items)))); // start this function from VIEW!!!
};

Model.prototype.renderCards = function renderCards(videos) {
    window.console.log(videos);

    function creatingElement(tagName, className, data, icon) {
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
    }

    function getDate(date) {
        const newDate = new Date(date);
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        return `${day}.${month}.${newDate.getFullYear()}`;
    }

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

        const titleElement = creatingElement.call(card, 'a', 'title', title);
        titleElement.href = `https://www.youtube.com/watch?v=${item.id}`;
        titleElement.target = '_blank';
        creatingElement.call(card, 'img', 'image', thumbnails.medium.url);
        creatingElement.call(card, 'span', 'channelTitle', channelTitle, '<i class="fab fa-youtube"></i>');
        creatingElement.call(card, 'span', 'channelTitle', getDate(publishedAt), '<i class="far fa-calendar-alt"></i>');
        creatingElement.call(card, 'span', 'view-count', viewCount, '<i class="fas fa-eye"></i>');
        creatingElement.call(card, 'span', 'like-count', likeCount, '<i class="fas fa-thumbs-up"></i>');
        creatingElement.call(card, 'span', 'dislike-count', dislikeCount, '<i class="fas fa-thumbs-down"></i>');

        creatingElement.call(card, 'span', 'description', description);

        document.querySelector('.card-container').appendChild(card);
    });
};
