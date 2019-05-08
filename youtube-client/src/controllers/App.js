import topQueries from '../queries';
import View from '../views/View';
import Model from '../model/Model';

export default class App {
    constructor() {
        this.state = {
            token: 'AIzaSyCrp0LVh2k9O4QJZgqWQ3wu-ZQMTPXPlk8',
            queries: topQueries,
            randomExample: null,
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
    }
}
