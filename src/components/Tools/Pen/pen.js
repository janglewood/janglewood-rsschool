import './pen.css';

export default class Pen {
  constructor(data) {
    this.data = data;
  }

  createPen() {
    const container = document.getElementsByClassName('tools-container')[0];
    const pen = document.createElement('span');
    pen.className = 'pen';
    pen.innerText = 'PEN';
    container.appendChild(pen);
    pen.onclick = () => { this.data.currentTool = 'PEN'; };
  }
}
