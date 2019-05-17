import topQueries from '../queries';
import View from '../views/View';
import Model from '../model/Model';

export default class App {
    constructor() {
        this.state = {
            token: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
            queries: topQueries,
            randomExample: null,
            cardsCount: null,
            currentPage: 1,
            pagesCount: null,
            cardsOnPage: null,
            clientWidth: document.documentElement.clientWidth,
            pageToken: null,
        };
    }

    start() {
        const model = new Model(this.state);
        const view = new View(this.state);
        this.state.randomExample = model.getRandomQuerie(this.state.queries);
        view.initialRender();
        document.querySelector('form').onsubmit = function search(e) {
            e.preventDefault();
            view.reloadCardContainer();
            model.getData(document.querySelector('.search-input').value);
        };
        view.renderThumbnails();
    }
}
