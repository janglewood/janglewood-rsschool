import './drawField.css';

export default class DrawField {
  constructor(data) {
    this.data = data;
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const canvasContainer = document.createElement('span');
    canvasContainer.className = 'canvas-container';

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.setAttribute('width', '490');
    canvas.setAttribute('height', '220');
    canvas.setAttribute('id', 'canvas');

    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);

    const clickX = [];
    const clickY = [];
    const clickDrag = [];
    const clickSize = [];

    function addClick(x, y, dragging, data) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickSize.push(data.penSize);
    }

    function redraw() {
      context.strokeStyle = '000000';
      context.lineJoin = 'round';
      
      for (let i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.lineWidth = clickSize[i];
        context.stroke();
      }
    }

    canvas.onmousedown = (e) => {
      if (this.data.currentTool === 'PEN') {
        this.data.isPaint = true;
      } else {
        console.log('Tool is not selected');
        return;
      }

      if (this.data.isPaint) {
        addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, false, this.data);
        redraw();
      }
    };

    canvas.onmousemove = (e) => {
      if (this.data.isPaint) {
        addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true, this.data);
        redraw();
      }
    };

    canvas.onmouseup = () => {
      this.data.isPaint = false;
      // refresh image of current frame
    };

    canvas.onmouseleave = () => {
      this.data.isPaint = false;
      // refresh image of current frame
    };
  }
}
