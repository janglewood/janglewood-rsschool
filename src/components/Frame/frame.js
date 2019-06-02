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

    const cloneFrameBtn = document.createElement('span');
    cloneFrameBtn.className = 'button';
    cloneFrameBtn.innerText = 'Clone';

    cloneFrameBtn.onclick = () => {
      const clone = this.createFrame();
      clone.getContext('2d').drawImage(frame, 0, 0);
      container.insertBefore(clone, addFrameBtn);
    };

    const removeFrameBtn = document.createElement('span');
    removeFrameBtn.className = 'button';
    removeFrameBtn.innerText = 'Remove';

    removeFrameBtn.onclick = () => {
      if (document.querySelectorAll('.frame').length === 1) {
        console.log('You can not remove a single frame');
        return;
      }
      frame.remove();
      console.log(document.querySelectorAll('.frame').length);
      cloneFrameBtn.remove();
      removeFrameBtn.remove();
    };

    container.insertBefore(cloneFrameBtn, frame);
    container.insertBefore(removeFrameBtn, frame);

    return frame;
  }

  createAddFrameBtn() {
    const container = document.getElementsByClassName('frames-container')[0];

    const addFrameBtn = document.createElement('span');
    addFrameBtn.classList.add('add-frame', 'button');
    addFrameBtn.innerText = 'Add new frame';

    container.appendChild(addFrameBtn);

    addFrameBtn.onclick = () => {
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
