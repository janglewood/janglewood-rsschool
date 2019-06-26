import './circle.css';

export default class Circle {
  constructor(data) {
    this.data = data;
  }

  createCircleTool() {
    const container = document.getElementsByClassName('tools-container')[0];
    const circle = document.createElement('span');
    circle.classList.add('circle', 'tool');
    container.appendChild(circle);
    circle.onclick = () => {
      this.data.currentTool = 'CIRCLE';
    };
  }
}
