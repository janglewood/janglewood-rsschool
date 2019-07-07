import './preview.css';
import marioImg from '../../assets/images/mario.png';
import mushroomImg from '../../assets/images/mushroom.png';

export default class Preview {
  constructor(data) {
    this.data = data;
  }

  static createContainer(parent) {
    const container = document.createElement('span');
    container.className = 'container';

    const actionContainer = document.createElement('span');
    actionContainer.className = 'action-container';
    actionContainer.innerHTML = '<span>Create pixel sprites and save them on you computer with <b>Piskel clone</b>.</span>';

    const createSpriteBtn = document.createElement('span');
    createSpriteBtn.classList.add('button', 'create-sprite');

    createSpriteBtn.innerText = 'Create sprite';

    const faqBtn = document.createElement('span');
    faqBtn.className = 'button';
    faqBtn.innerText = 'About';

    actionContainer.appendChild(createSpriteBtn);
    actionContainer.appendChild(faqBtn);
    container.appendChild(actionContainer);

    const imageContainer = document.createElement('span');
    imageContainer.className = 'image-container';
    const mario = document.createElement('img');
    mario.src = marioImg;
    imageContainer.appendChild(mario);
    const mushroom = document.createElement('img');
    mushroom.src = mushroomImg;
    imageContainer.appendChild(mushroom);

    container.appendChild(imageContainer);

    parent.appendChild(container);
  }

  render() {
    const pageWrapper = document.getElementsByClassName('page-wrapper')[0];

    const main = document.createElement('main');
    main.className = 'preview';

    Preview.createContainer(main);
    pageWrapper.appendChild(main);
  }
}
