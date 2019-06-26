import './pen.css';

export default class Pen {
  constructor(data) {
    this.data = data;
  }

  createPenTool() {
    const container = document.getElementsByClassName('tools-container')[0];
    const pen = document.createElement('span');
    pen.classList.add('pen', 'tool');
    container.appendChild(pen);
    pen.onclick = () => {
      this.data.currentTool = 'PEN';
    };
  }
}
