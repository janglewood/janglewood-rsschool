import Model from '../model/Model';

export default class View {
    constructor(data) {
        this.data = data;
    }

    initialRender() {
        const model = new Model(this.data);

        const searchInput = document.createElement('input');
        searchInput.className = 'search-input';
        searchInput.placeholder = `Enter a string to search (e.g. ${model.getRandomQuerie(this.data.queries)})`;

        const form = document.createElement('form');
        form.appendChild(searchInput);
        form.onsubmit = function x(e) {
            e.preventDefault();
            model.getData(searchInput.value);
        };

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        document.body.appendChild(form);
        document.body.appendChild(cardContainer);
    }
}
