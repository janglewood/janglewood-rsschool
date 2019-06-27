import './tools.css';
import Pen from './Pen/pen';
import StraightLine from './StraightLine/straightLine';
// import image from '../../assets/icons/pen.png';

export default class Tools {
  constructor(data) {
    this.data = data;
  }

  render() {
    const leftSidebar = document.createElement('span');
    leftSidebar.className = 'left-sidebar';

    document.getElementsByClassName('editor-container')[0].appendChild(leftSidebar);
    this.createPenSize();
    this.createToolsContainer();

    document.querySelector(`.x${this.data.penSize}`).style.borderColor = '#fabd4cee';
    // document.getElementsByClassName('editor-container')[0].style.cursor = `url(${image}), pointer`;
    // document.body.style.backgroundImage = `url(${image})`;
  }

  createPenSize() {
    const penSizeContainer = document.createElement('span');
    penSizeContainer.className = 'pen-size-container';

    for (let i = 1; i <= 4; i++) {
      const option = document.createElement('span');
      option.classList.add('pen-size', `x${i}`);
      option.onclick = () => {
        document.querySelector(`.x${this.data.penSize}`).style.borderColor = '#8f8f8f';
        this.data.penSize = i;
        option.style.borderColor = '#fabd4cee';
      };
      penSizeContainer.appendChild(option);
    }
    document.getElementsByClassName('left-sidebar')[0].appendChild(penSizeContainer);
  }

  createToolsContainer() {
    const pen = new Pen(this.data);
    const straightLine = new StraightLine(this.data);

    const toolsContainer = document.createElement('span');
    toolsContainer.className = 'tools-container';

    document.getElementsByClassName('left-sidebar')[0].appendChild(toolsContainer);
    pen.createPenTool();
    straightLine.createStraightLineTool();
  }

  static unselect() {
    const tools = [...document.querySelectorAll('.tool')];
    for (let i = 0; i < tools.length; i++) {
      tools[i].style.borderColor = '#8f8f8f';
    }
  }

  static toolSelector() {
    this.unselect();
    console.log('!!!');
  }
}

[...document.querySelectorAll('.tool')].forEach(() => {
  Tools.toolSelector();
});
