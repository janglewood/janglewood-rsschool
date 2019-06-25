import Header from './components/Header/header';
import Preview from './screens/Preview/preview';
import Editor from './screens/Editor/editor';
import './style.css';

class App {
  constructor() {
    this.state = {
      mainScreenIsActive: true,
      userFileName: 'Type file name here',
      penSize: 1,
      currentTool: 'PEN',
      currentFrame: 1,
    };
    this.sett = {
      canvasSize: 32,
    };
  }

  start() {
    const header = new Header(this.state);
    const preview = new Preview(this.state);

    header.initialRender();
    preview.render();
  }

  createEditor() {
    const editor = new Editor(this.state, this.sett);
    const header = new Header(this.state);
    header.addFileNameInput();
    editor.render();
  }
}

const app = new App();
app.start();

document.querySelectorAll('.button.create-sprite')[0].onclick = () => {
  app.createEditor();
};
document.querySelectorAll('.button.create-sprite')[1].onclick = () => {
  app.createEditor();
};
