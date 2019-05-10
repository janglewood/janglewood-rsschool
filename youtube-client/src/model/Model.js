import View from '../views/View';

export default class Model {
    constructor(data) {
        this.data = data;
    }
}

Model.prototype.getRandomQuerie = function getRandomQuerie(queries) {
    return queries[Math.floor(Math.random() * queries.length)];
};
Model.prototype.getData = function getData(query) {
    const view = new View(this.data);
    const { token } = this.data;
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${token}&type=video&part=snippet&maxResults=15&q=${query}`)
        .then(searchRes => searchRes.json())
        .then((searchList) => {
            console.log(searchList); searchList.items.forEach(item => fetch(`https://www.googleapis.com/youtube/v3/videos?key=${token}&id=${item.id.videoId}&part=snippet,statistics`)
                .then(videoRes => videoRes.json())
                .then(videoData => view.renderCards(videoData.items)));
        });
};
