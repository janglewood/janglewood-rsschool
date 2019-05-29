import './preview.css';

export default class Preview {
  constructor(data) {
    this.data = data;
  }

  createContainer(parent) {
    const container = document.createElement('span');
    container.className = 'container';

    const actionContainer = document.createElement('span');
    actionContainer.className = 'action-container';
    actionContainer.innerHTML = `<span>Create pixel sprites and save them on you desktop with <b>Piskel clone</b>.</span>`;

    const createSpriteBtn = document.createElement('span');
    createSpriteBtn.className = 'button';
    createSpriteBtn.innerText = 'Create sprite';

    const faqBtn = document.createElement('span');
    faqBtn.className = 'button';
    faqBtn.innerText = 'FAQ';

    actionContainer.appendChild(createSpriteBtn);
    actionContainer.appendChild(faqBtn);
    container.appendChild(actionContainer);

    const imageContainer = document.createElement('span');
    imageContainer.className = 'image-container';
    imageContainer.innerHTML = '<img src="../../assets/images/mario.png" /><img src="../../assets/images/mushroom.png" />';

    container.appendChild(imageContainer);

    parent.appendChild(container);
  }

  render() {
    const pageWrapper = document.getElementsByClassName('page-wrapper')[0];

    const main = document.createElement('main');
    main.className = 'preview';

    this.createContainer(main);
    pageWrapper.appendChild(main);
  }
}
