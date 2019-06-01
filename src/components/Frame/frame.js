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

    const frame = document.createElement('span');
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

    button.onclick = () => this.createFrame();
  }
}
