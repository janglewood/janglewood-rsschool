import './preview.css';
import marioImg from '../../assets/images/mario.png';
import mushroomImg from '../../assets/images/mushroom.png';

export default class Preview {
  constructor(data) {
    this.data = data;
  }

  static createAbout() {
    const container = document.querySelector('.preview');
    const about = document.createElement('span');
    about.className = 'about';
    about.id = 'about';
    about.innerText = 'This app was created as final task of second stage of RSSchool. Here you can use pen for drawing, straight line tool for draw straight line and eraser for erase. Also you can use color picker and draw with primary color (left mouse button) and secondary color (right mouse button). After you create your gif you can save it\'s on your computer as .gif format. \nP.S. This version has some troubles with black color when you export gif on your PC, but I work on that :)';
    container.appendChild(about);
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

    const aboutBtn = document.createElement('a');
    aboutBtn.className = 'button';
    aboutBtn.innerText = 'About';
    aboutBtn.href = '#about';

    actionContainer.appendChild(createSpriteBtn);
    actionContainer.appendChild(aboutBtn);
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
    Preview.createAbout();
  }
}
