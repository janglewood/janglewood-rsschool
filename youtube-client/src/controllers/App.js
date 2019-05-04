//  import Model from '../models/Model.js';
import View from '../views/View';

export default class App {
    constructor() {
        this.state = {
            token: 'AIzaSyCrp0LVh2k9O4QJZgqWQ3wu-ZQMTPXPlk8',
        };
    }

    start() {
        //  const model = new Model(this.state);
        const view = new View(this.state);

        view.initialRender();
    }
}
