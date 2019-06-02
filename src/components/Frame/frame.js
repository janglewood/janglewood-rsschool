import './frame.css';

export default class Frame {
  constructor(data) {
    this.data = data;
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const framesContainer = document.createElement('span');
    framesContainer.className = 'frames-container';

    container.appendChild(framesContainer);
    this.data.framesAmount = 0;
    this.createAddFrameBtn();
    this.createFrame();
  }

  createFrame() {
    const container = document.getElementsByClassName('frames-container')[0];
    const addFrameBtn = document.getElementsByClassName('add-frame')[0];

    const frame = document.createElement('canvas');
    frame.className = 'frame';
    frame.innerText = ++this.data.framesAmount;

    container.insertBefore(frame, addFrameBtn);
  }

  createAddFrameBtn() {
    const container = document.getElementsByClassName('frames-container')[0];

    const button = document.createElement('span');
    button.classList.add('add-frame', 'button');
    button.innerText = 'Add new frame';

    container.appendChild(button);

    button.onclick = () => {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      document.getElementsByClassName('frame')[this.data.framesAmount - 1].getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 300, 150);
      this.data.clickX = [];
      this.data.clickY = [];
      this.data.clickDrag = [];
      this.data.clickSize = [];
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.createFrame();
    };
  }
}
