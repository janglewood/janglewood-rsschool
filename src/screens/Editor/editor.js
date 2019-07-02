import Tools from '../../components/Tools/tools';
import Frame from '../../components/Frame/frame';
import DrawField from '../../components/DrawField/drawField';
import Player from '../../components/Player/player';
import Settings from '../../components/Settings/settings';
import './editor.css';

export default class Editor {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  render() {
    this.data.mainScreenIsActive = true;
    const tools = new Tools(this.data, this.settings);
    const frame = new Frame(this.data);
    const drawField = new DrawField(this.data, this.settings);
    const player = new Player(this.data);
    const settings = new Settings(this.data, this.settings);

    if (document.getElementsByClassName('preview')[0]) {
      document.getElementsByClassName('preview')[0].remove();
    }

    const editorContainer = document.createElement('main');
    editorContainer.className = 'editor-container';
    document.getElementsByClassName('page-wrapper')[0].appendChild(editorContainer);

    tools.render();
    drawField.render();
    player.render();
    frame.render();
    settings.render();
  }
}
