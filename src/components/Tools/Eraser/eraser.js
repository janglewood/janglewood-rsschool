import './eraser.css';

export default class Eraser {
  constructor(data) {
    this.data = data;
  }

  createEraser() {
    const container = document.getElementsByClassName('tools-container')[0];
    const eraser = document.createElement('span');
    eraser.classList.add('eraser', 'tool');
    container.appendChild(eraser);

    return eraser;
  }
}
