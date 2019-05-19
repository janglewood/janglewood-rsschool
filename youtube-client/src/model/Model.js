import View from '../views/View';
import {
    showSpinner,
    showError,
    removeSpinner,
} from '../functions';

export default class Model {
    constructor(data) {
        this.data = data;
    }
}

Model.prototype.getRandomQuerie = function getRandomQuerie(queries) {
    return queries[Math.floor(Math.random() * queries.length)];
};
Model.prototype.getData = function getData(query, nextPageToken) {
    const view = new View(this.data);
    const { token } = this.data;
    const pageToken = nextPageToken !== undefined ? nextPageToken : '';
    showSpinner();
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${token}&type=video&part=snippet&maxResults=15&q=${query}&pageToken=${pageToken}`)
        .then(searchRes => searchRes.json())
        .catch((e) => {
            removeSpinner();
            showError(e);
        })
        .then((searchList) => {
            this.data.pageToken = searchList.nextPageToken;
            searchList.items.forEach(item => fetch(`https://www.googleapis.com/youtube/v3/videos?key=${token}&id=${item.id.videoId}&part=snippet,statistics`)
                .then(videoRes => videoRes.json())
                .then((videoData) => {
                    view.renderCards(videoData.items);
                    this.data.cardsCount = document.querySelectorAll('.card').length;
                    document.querySelector('.thumbs-container').style.display = 'flex';
                }));
        })
        .catch((e) => {
            removeSpinner();
            showError(e);
        });
};
