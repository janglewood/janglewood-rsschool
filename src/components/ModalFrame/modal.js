import Editor from '../../screens/Editor/editor';
import Header from '../Header/header';
import './modal.css';

export default class ModalFrame {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  restoreData(saveCanvasSize) {
    const currentCanvasSize = this.settings.canvasSize;
    this.data = {
      mainScreenIsActive: false,
      userFileName: 'Type file name here',
      penSize: 1,
      currentTool: 'PEN',
      currentFrame: 1,
      i: 0,
    };
    this.settings = {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    };
    if (!saveCanvasSize) {
      this.settings.canvasSize = 32;
    } else {
      this.settings.canvasSize = currentCanvasSize;
    }
  }

  createNewProject(saveCanvasSize) {
    document.querySelector('.editor-container').remove();
    if (saveCanvasSize) {
      this.restoreData(true);
    } else {
      this.restoreData(false);
    }
    const editor = new Editor(this.data, this.settings);
    const header = new Header(this.data);
    header.addFileNameInput();
    editor.render();
    document.querySelector('.modal-frame').remove();
    document.querySelector('.dark-layer').remove();
  }

  render(text, saveCanvasSize) {
    const container = document.querySelector('.page-wrapper');

    const darkLayer = document.createElement('span');
    darkLayer.className = 'dark-layer';

    const modalFrame = document.createElement('span');
    modalFrame.className = 'modal-frame';

    const title = document.createElement('span');
    title.className = 'title';
    title.innerText = text;

    const buttonContainer = document.createElement('span');
    buttonContainer.className = 'button-container';

    const agree = document.createElement('span');
    agree.className = 'button';
    agree.innerText = 'Yes';

    agree.onclick = () => {
      if (saveCanvasSize) {
        this.createNewProject(true);
      } else {
        this.createNewProject(false);
      }
    };

    const disagree = document.createElement('span');
    disagree.className = 'button';
    disagree.innerText = 'No';

    disagree.onclick = () => {
      document.querySelector('.modal-frame').remove();
      document.querySelector('.dark-layer').remove();

      return false;
    };

    buttonContainer.appendChild(agree);
    buttonContainer.appendChild(disagree);

    modalFrame.appendChild(title);
    modalFrame.appendChild(buttonContainer);

    document.body.appendChild(darkLayer);
    container.appendChild(modalFrame);
  }
}
