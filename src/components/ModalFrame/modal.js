import Editor from '../../screens/Editor/editor';
import Header from '../Header/header';
import './modal.css';

export default class ModalFrame {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  render() {
    const container = document.getElementsByClassName('page-wrapper')[0];

    const modalFrame = document.createElement('span');
    modalFrame.className = 'modal-frame';

    const title = document.createElement('span');
    title.className = 'title';
    title.innerText = 'Do you really want to create a new sprite? All changes will be lost.';

    const buttonContainer = document.createElement('span');
    buttonContainer.className = 'button-container';

    const agree = document.createElement('span');
    agree.className = 'button';
    agree.innerText = 'Yes';

    agree.onclick = () => {
      document.getElementsByClassName('editor-container')[0].remove();
      const editor = new Editor(this.data, this.settings);
      const header = new Header(this.data);
      header.addFileNameInput();
      editor.render();
      document.getElementsByClassName('modal-frame')[0].remove();
    };

    const disagree = document.createElement('span');
    disagree.className = 'button';
    disagree.innerText = 'No';

    disagree.onclick = () => {
      document.getElementsByClassName('modal-frame')[0].remove();
      return false;
    };

    buttonContainer.appendChild(agree);
    buttonContainer.appendChild(disagree);

    modalFrame.appendChild(title);
    modalFrame.appendChild(buttonContainer);

    container.appendChild(modalFrame);
  }
}
