import Header from './components/Header/header';
import Preview from './screens/Preview/preview';
import Editor from './screens/Editor/editor';
import ModalFrame from './components/ModalFrame/modal';
import './style.css';

let modalFrame;

class App {
  constructor() {
    this.state = {
      mainScreenIsActive: false,
      userFileName: 'Type file name here',
      penSize: 1,
      currentTool: 'PEN',
      currentFrame: 1,
    };
    this.settings = {
      canvasSize: 32,
    };
  }

  start() {
    const header = new Header(this.state);
    const preview = new Preview(this.state);
    modalFrame = new ModalFrame(this.state, this.settings);

    header.initialRender();
    preview.render();
  }

  createEditor() {
    const editor = new Editor(this.state, this.settings);
    const header = new Header(this.state);
    header.addFileNameInput();
    editor.render();
  }
}

const app = new App();
app.start();

document.querySelectorAll('.button.create-sprite')[0].onclick = () => {
  if (!app.state.mainScreenIsActive) {
    app.createEditor();
  } else {
    modalFrame.render();
  }
};
document.querySelectorAll('.button.create-sprite')[1].onclick = () => {
  app.createEditor();
};
