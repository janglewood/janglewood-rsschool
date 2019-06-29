import './settings.css';
import DrawField from '../DrawField/drawField';

export default class Settings {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  render() {
    this.createSizeSettings();
  }

  redraw() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.strokeStyle = '000000';
    context.lineJoin = 'miter';

    for (let i = 0; i < this.data.clickX.length; i++) {
      context.beginPath();
      if (this.data.clickDrag[i] && i) {
        context.moveTo(this.data.clickX[i - 1], this.data.clickY[i - 1]);
      } else {
        context.moveTo(this.data.clickX[i] - 1, this.data.clickY[i]);
      }
      context.lineTo(this.data.clickX[i], this.data.clickY[i]);
      context.closePath();
      context.lineWidth = this.data.clickSize[i];
      context.stroke();
    }
  }

  drawLine() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.strokeStyle = '000000';
    context.lineJoin = 'miter';

    const dataLength = this.data.startX.length - 1;

    for (let i = 0; i < dataLength; i++) {
      context.beginPath();
      context.moveTo(this.data.startX[i], this.data.startY[i]);

      context.lineTo(this.data.finishX[i], this.data.finishY[i]);
      context.closePath();
      context.stroke();
    }
  }


  createSizeSettings() {
    const drawField = new DrawField(this.data, this.settings);
    const sizeSettings = document.createElement('span');
    sizeSettings.className = 'size-settings-container';

    for (let i = 32; i <= 128; i *= 2) {
      const sizeItem = document.createElement('span');
      const canvas = document.getElementById('canvas');
      sizeItem.innerText = `${i}x${i}`;
      sizeItem.onclick = () => {
        this.settings.canvasSize = i;
        drawField.setCanvasSize(canvas, canvas.getContext('2d'));
        this.redraw();
        this.drawLine();
        const currentFrameContext = drawField.clearFrame(this.data);
        currentFrameContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
      };

      sizeSettings.appendChild(sizeItem);
    }

    document.getElementsByClassName('right-sidebar')[0].appendChild(sizeSettings);
  }
}
