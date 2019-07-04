import './player.css';
import GIF from '../../../gif';

let timer;

export default class Player {
  constructor(data) {
    this.data = data;
  }

  runPlayer() {
    let i = 0;
    const frames = [...document.querySelectorAll('.frame')];
    const player = document.querySelector('.player');
    const fps = document.querySelector('input[type="range"]').value;

    function frame() {
      const framesLength = frames.length;
      if (i >= framesLength) {
        i = 0;
      }
      player.getContext('2d').clearRect(0, 0, player.width, player.height);
      player.getContext('2d').drawImage(frames[i], 0, 0, frames[i].width, frames[i].height, 0, 0, player.width, player.height);
      i++;
    }

    timer = setInterval(frame, 1000 / fps);
    player.onclick = () => {
      this.data.playerOnPause = true;
      clearInterval(timer);
    };
    console.log(fps);
  }

  saveGif() {
    console.log(this);
    const frames = [...document.querySelectorAll('.frame')];

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: './gif.worker.js',
      width: 320,
      height: 320,
      transparent: 'rgba(0,0,0,0)',
      background: 'rgba(0,0,0,0)',
    });

    for (let i = 0; i < frames.length; i++) {
      gif.addFrame(frames[i].getContext('2d'), { copy: true, delay: 2000 });
    }

    gif.on('finished', (blob) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        document.querySelector('.right-sidebar').appendChild(img);
      };
    });

    gif.render();
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const rightSidebar = document.createElement('span');
    rightSidebar.className = 'right-sidebar';

    const player = document.createElement('canvas');
    player.className = 'player';

    const fps = document.createElement('input');
    fps.type = 'range';
    fps.min = 1;
    fps.max = 24;
    fps.step = 1;

    const fpsInfo = document.createElement('span');
    fpsInfo.innerText = `${fps.value} FPS`;

    fps.oninput = () => {
      fpsInfo.innerText = `${fps.value} FPS`;
    };

    const runAnimationBtn = document.createElement('span');
    runAnimationBtn.className = 'button';
    runAnimationBtn.innerText = 'Run animation';

    const fullScreenBtn = document.createElement('span');
    fullScreenBtn.className = 'button';
    fullScreenBtn.innerText = 'Full screen';

    rightSidebar.appendChild(fullScreenBtn);
    rightSidebar.appendChild(runAnimationBtn);
    rightSidebar.appendChild(fps);
    rightSidebar.appendChild(fpsInfo);
    rightSidebar.appendChild(player);
    container.appendChild(rightSidebar);

    runAnimationBtn.onclick = () => {
      this.runPlayer();
    };

    document.querySelector('.add-frame').addEventListener('click', () => {
      clearInterval(timer);
      document.querySelector('.player').getContext('2d').clearRect(0, 0, document.querySelector('.player').width, document.querySelector('.player').height);
      this.runPlayer();
    });

    fullScreenBtn.onclick = () => {
      player.requestFullscreen();
    };
  }
}
