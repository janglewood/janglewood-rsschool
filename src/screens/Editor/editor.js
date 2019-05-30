import Tools from '../../components/Tools/tools';
import './editor.css';

export default class Editor {
  constructor(data) {
    this.data = data;
  }

  render() {
    this.data.mainScreenIsActive = false;
    const tools = new Tools(this.data);
    document.getElementsByClassName('preview')[0].remove();

    const editorContainer = document.createElement('main');
    editorContainer.className = 'editor-container';
    document.getElementsByClassName('page-wrapper')[0].appendChild(editorContainer);

    tools.render();
  }
}
