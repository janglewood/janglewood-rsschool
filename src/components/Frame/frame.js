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

  static allowDrop(e) {
    e.preventDefault();
  }

  static drag(e) {
    e.dataTransfer.setData('src', e.target.id);
  }

  drop(e) {
    e.preventDefault();

    const src = document.getElementById(e.dataTransfer.getData('src'));
    const srcNumber = src.querySelector('.frame-number').innerText;
    const srcParent = src.parentNode;
    const target = e.currentTarget.firstElementChild;
    src.querySelector('.frame-number').innerText = target.querySelector('.frame-number').innerText;
    target.querySelector('.frame-number').innerText = srcNumber;

    e.currentTarget.replaceChild(src, target);
    srcParent.appendChild(target);
    this.chooseCurrentFrame(src.querySelector('canvas'));
  }

  createFrame() {
    const container = document.getElementsByClassName('frames-container')[0];
    const addFrameBtn = document.getElementsByClassName('add-frame')[0];

    const dragContainer = document.createElement('span');

    dragContainer.ondrop = e => this.drop(e);
    dragContainer.ondragover = e => Frame.allowDrop(e);

    const frameContainer = document.createElement('span');
    frameContainer.className = 'frame-container';
    frameContainer.id = `drag${this.data.framesAmount}`;
    frameContainer.draggable = true;
    frameContainer.ondragstart = e => Frame.drag(e);

    dragContainer.appendChild(frameContainer);

    const frame = document.createElement('canvas');
    frame.className = 'frame';
    this.data.framesAmount++;

    frameContainer.appendChild(frame);
    container.insertBefore(dragContainer, addFrameBtn);

    frame.onclick = (e) => {
      this.chooseCurrentFrame(e.target);
    };
    frameContainer.onmouseover = () => {
      const buttons = [...frameContainer.querySelectorAll('.button')];
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'flex';
      }
    };
    frameContainer.onmouseleave = () => {
      const buttons = [...frameContainer.querySelectorAll('.button')];
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
      }
    };

    this.createFrameNumber(frameContainer);
    const cloneFrameBtn = this.createCloneFrameBtn(frameContainer, frame);
    this.createRemoveBtn(frameContainer, cloneFrameBtn);
    this.chooseCurrentFrame(frame);

    return frameContainer;
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

  createCloneFrameBtn(frameContainer, frame) {
    const cloneFrameBtn = document.createElement('span');
    cloneFrameBtn.classList.add('clone-frame', 'button');
    cloneFrameBtn.innerHTML = '<img src="../../assets/icons/clone.svg">';

    cloneFrameBtn.onclick = () => {
      const clone = this.createFrame();
      clone.querySelector('canvas').getContext('2d').drawImage(frame, 0, 0);
    };
    frameContainer.appendChild(cloneFrameBtn);
    return cloneFrameBtn;
  }

  createRemoveBtn(frame, cloneFrameBtn) {
    const removeFrameBtn = document.createElement('span');
    removeFrameBtn.classList.add('remove-frame', 'button');
    removeFrameBtn.innerHTML = '<img src="../../assets/icons/remove.svg">';

    removeFrameBtn.onclick = () => {
      if (document.querySelectorAll('.frame').length === 1) {
        console.log('You can not remove a single frame');
        return;
      }
      frame.remove();
      cloneFrameBtn.remove();
      removeFrameBtn.remove();
      this.data.framesAmount--;

      const frames = document.getElementsByClassName('frame-container');
      for (let i = 1; i <= frames.length; i++) {
        frames[i - 1].querySelector('.frame-number').innerText = i;
      }
    };
    frame.appendChild(removeFrameBtn);
  }

  createFrameNumber(frame) {
    const number = document.createElement('span');
    number.className = 'frame-number';
    number.innerText = this.data.framesAmount;

    frame.appendChild(number);
  }

  chooseCurrentFrame(frame) {
    const selected = document.querySelectorAll('.selected');
    if (selected.length) {
      for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
      }
    }
    frame.classList.add('selected');
    this.data.currentFrame = frame.parentNode.querySelector('.frame-number').innerText;

    this.data.clickX = [];
    this.data.clickY = [];
    this.data.clickDrag = [];
    this.data.clickSize = [];

    if (this.data.framesAmount > 1) {
      const canvas = document.getElementById('canvas');
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext('2d').drawImage(frame, 0, 0, canvas.width, canvas.height, 0, 0, 500, 500);
      // rewrite
    }
  }
}
