import topQueries from '../queries';
import View from '../views/View';

export default class App {
    constructor() {
        this.state = {
            token: 'AIzaSyCrp0LVh2k9O4QJZgqWQ3wu-ZQMTPXPlk8',
            queries: topQueries,
        };
    }

    start() {
        // const model = new Model(this.state);
        const view = new View(this.state);

        view.initialRender();
    }
}
