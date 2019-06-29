import './straightLine.css';

export default class StraightLine {
  constructor(data) {
    this.data = data;
  }

  createStraightLineTool() {
    const container = document.getElementsByClassName('tools-container')[0];
    const straightLine = document.createElement('span');
    straightLine.classList.add('straight-line', 'tool');
    container.appendChild(straightLine);

    return straightLine;
  }
}
