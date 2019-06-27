import './drawField.css';

export default class DrawField {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  setCanvasSize(canvas, context) {
    canvas.setAttribute('width', this.settings.canvasSize);
    canvas.setAttribute('height', this.settings.canvasSize);
    canvas.setAttribute('id', 'canvas');
    canvas.style.width = `${canvas.width * 20 / (this.settings.canvasSize / 32)}px`;
    canvas.style.height = `${canvas.height * 20 / (this.settings.canvasSize / 32)}px`;
    canvas.style.imageRendering = 'pixelated';
    context.imageSmoothingEnabled = false;
  }

  clearFrame() {
    const currentFrameCanvas = document.getElementsByClassName('frame')[this.data.currentFrame - 1];
    const currentFrameContext = currentFrameCanvas.getContext('2d');
    currentFrameContext.clearRect(0, 0, currentFrameCanvas.width, currentFrameCanvas.height);
    return currentFrameContext;
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const canvasContainer = document.createElement('span');
    canvasContainer.className = 'canvas-container';

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    this.setCanvasSize(canvas, context);

    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);

    this.data.clickX = [];
    this.data.clickY = [];
    this.data.clickDrag = [];
    this.data.clickSize = [];

    let startX;
    let startY;
    let finishX;
    let finishY;
    let isDown;

    function addClick(x, y, dragging, data, settings) {
      data.clickX.push(x / (20 / (settings.canvasSize / 32)));
      data.clickY.push(y / (20 / (settings.canvasSize / 32)));
      data.clickDrag.push(dragging);
      data.clickSize.push(data.penSize);
    }

    function redraw(data) {
      context.strokeStyle = '000000';
      context.lineJoin = 'miter';

      for (let i = 0; i < data.clickX.length; i++) {
        context.beginPath();
        if (data.clickDrag[i] && i) {
          context.moveTo(data.clickX[i - 1], data.clickY[i - 1]);
        } else {
          context.moveTo(data.clickX[i] - 1, data.clickY[i]);
        }
        context.lineTo(data.clickX[i], data.clickY[i]);
        context.closePath();
        context.lineWidth = data.clickSize[i];
        context.stroke();
      }
    }

    function addStartPoints(e, settings) {
      isDown = true;
      startX = (e.pageX - canvas.offsetLeft) / (20 / (settings.canvasSize / 32));
      startY = (e.pageY - canvas.offsetTop) / (20 / (settings.canvasSize / 32));
      context.beginPath();
      context.moveTo(startX, startY);
    }

    function draw(e, settings) {
      context.strokeStyle = '000000';
      context.lineJoin = 'miter';

      context.beginPath();
      context.moveTo(startX, startY);

      finishX = (e.pageX - canvas.offsetLeft) / (20 / (settings.canvasSize / 32));
      finishY = (e.pageY - canvas.offsetTop) / (20 / (settings.canvasSize / 32));
      context.lineTo(finishX, finishY);
      context.closePath();
      context.stroke();
    }

    canvas.onmousedown = (e) => {
      this.data.isPaint = true;
      if (this.data.isPaint && this.data.currentTool === 'PEN') {
        addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, false, this.data, this.settings);
        redraw(this.data);
      } else if (this.data.currentTool === 'STRAIGHT-LINE') {
        addStartPoints(e, this.settings);
      }
    };

    canvas.onmousemove = (e) => {
      if (this.data.isPaint && this.data.currentTool === 'PEN') {
        addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true, this.data, this.settings);
        redraw(this.data);
      } if (this.data.currentTool === 'STRAIGHT-LINE' && isDown) {
        draw(e, this.settings);
      }
    };
    canvas.onmouseup = () => {
      if (this.data.currentTool === 'STRAIGHT-LINE' && isDown) {
        isDown = false;
      }
      this.data.isPaint = false;
      isDown = false;
      const currentFrameContext = this.clearFrame();
      currentFrameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
      // const canvasy = document.getElementById('canvas');
      // imageData = canvasy.getContext('2d').getImageData(0, 0, canvasy.width, canvasy.height);
      // const frame = document.querySelector('.frame');
      // frame.getContext('2d').putImageData(imageData, 0, 0, 0, 0, frame.width, frame.height);
    };

    canvas.onmouseleave = () => {
      this.data.isPaint = false;
      isDown = false;
      const currentFrameContext = this.clearFrame();
      currentFrameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
      // const frame = document.querySelector('.frame');
      // frame.getContext('2d').putImageData(imageData, 0, 0, 0, 0, 100, 20);
      // console.log(imageData);
    };
  }
}
