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

  clearFrame(frame) {
    const currentFrameContext = frame.getContext('2d');
    currentFrameContext.clearRect(0, 0, frame.width, frame.height);
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
    this.data.drawColor = [];
    this.data.clickDrag = [];
    this.data.clickSize = [];

    this.data.startX = [];
    this.data.startY = [];
    this.data.lineColor = [];
    this.data.finishX = [];
    this.data.finishY = [];

    function addClick(x, y, dragging, data, settings, primary) {
      data.clickX.push(x / (20 / (settings.canvasSize / 32)));
      data.clickY.push(y / (20 / (settings.canvasSize / 32)));
      data.clickDrag.push(dragging);
      data.clickSize.push(data.penSize);
      data.drawColor.push(primary ? settings.primaryColor : settings.secondaryColor);
    }

    function redraw(data) {
      for (let i = 0; i < data.clickX.length; i++) {
        context.strokeStyle = data.drawColor[i];
        context.lineJoin = 'miter';

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

    function addStartPoints(e, data, settings, primary) {
      data.startX.push((e.pageX - canvas.offsetLeft) / (20 / (settings.canvasSize / 32)));
      data.startY.push((e.pageY - canvas.offsetTop) / (20 / (settings.canvasSize / 32)));
      data.lineColor.push(primary ? settings.primaryColor : settings.secondaryColor);
    }

    function addFinishPoints(e, data, settings) {
      data.finishX.push((e.pageX - canvas.offsetLeft) / (20 / (settings.canvasSize / 32)));
      data.finishY.push((e.pageY - canvas.offsetTop) / (20 / (settings.canvasSize / 32)));
    }


    function drawLine(data) {
      const dataLength = data.startX.length - 1;
      context.strokeStyle = data.lineColor[dataLength];
      context.lineJoin = 'miter';

      context.beginPath();
      context.moveTo(data.startX[dataLength], data.startY[dataLength]);

      context.lineTo(data.finishX[dataLength], data.finishY[dataLength]);
      context.closePath();
      context.stroke();
    }

    function erase(x, y, data, settings) {
      canvas.getContext('2d').clearRect(x / (20 / (settings.canvasSize / 32)), y / (20 / (settings.canvasSize / 32)), data.penSize, data.penSize);
    }

    canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };

    canvas.onmousedown = (e) => {
      this.data.isPaint = true;
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      if (this.data.isPaint && this.data.currentTool === 'PEN') {
        if (e.which === 3) {
          addClick(x, y, false, this.data, this.settings, false);
        } else {
          addClick(x, y, false, this.data, this.settings, true);
        }
        redraw(this.data, this.settings);
      } else if (this.data.currentTool === 'STRAIGHT-LINE') {
        if (e.which === 3) {
          addStartPoints(e, this.data, this.settings, false);
        } else {
          addStartPoints(e, this.data, this.settings, true);
        }
      } else if (this.data.currentTool === 'ERASER') {
        erase(x, y, this.data, this.settings);
      }
    };

    canvas.onmousemove = (e) => {
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      if (this.data.isPaint && this.data.currentTool === 'PEN') {
        if (e.which === 3) {
          addClick(x, y, true, this.data, this.settings, false);
        } else {
          addClick(x, y, true, this.data, this.settings, true);
        }
        redraw(this.data, this.settings);
      } else if (this.data.currentTool === 'ERASER' && this.data.isPaint) {
        erase(x, y, this.data, this.settings);
      }
    };

    canvas.onmouseup = (e) => {
      if (this.data.isPaint && this.data.currentTool === 'STRAIGHT-LINE') {
        addFinishPoints(e, this.data, this.settings);
        drawLine(this.data);
      }
      this.data.isPaint = false;
      const currentFrameContext = this.clearFrame(document.getElementsByClassName('frame')[this.data.currentFrame - 1]);
      currentFrameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
    };

    canvas.onmouseleave = (e) => {
      if (this.data.isPaint && this.data.currentTool === 'STRAIGHT-LINE') {
        addFinishPoints(e, this.data, this.settings);
        drawLine(this.data);
      }
      this.data.isPaint = false;
      const currentFrameContext = this.clearFrame(document.getElementsByClassName('frame')[this.data.currentFrame - 1]);
      currentFrameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
    };
  }
}
