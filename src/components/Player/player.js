import './player.css';
import GIF from '../../../gif';

let timer;

export default class Player {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  static createDownloadBtn(data) {
    const container = document.querySelector('.right-sidebar');
    const downloadBtn = document.createElement('span');
    downloadBtn.className = 'button';
    downloadBtn.innerText = 'Download .gif';

    downloadBtn.onclick = () => {
      Player.saveGif(data);
    };
    container.appendChild(downloadBtn);
  }

  static getCoords(x, y) {
    document.querySelector('.coords').innerText = `[${x}:${y}]`;
  }

  runPlayer() {
    let i = 0;
    const player = document.querySelector('.player');
    const fps = document.querySelector('input[type="range"]').value;

    function frame() {
      const frames = [...document.querySelectorAll('.frame')];
      if (i >= frames.length) {
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
  }

  static saveGif(data) {
    const frames = [...document.querySelectorAll('.frame')];

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: './gif.worker.js',
      width: 320,
      height: 320,
      transparent: 0x000000,
      background: 0x000000,
    });

    const fps = document.querySelector('input[type="range"]').value;

    for (let i = 0; i < frames.length; i++) {
      gif.addFrame(frames[i].getContext('2d'), { copy: true, delay: 1000 / fps });
    }
    gif.on('finished', (blob) => {
      const downloadGif = document.createElement('a');
      downloadGif.href = URL.createObjectURL(blob);
      downloadGif.download = data.userFileName === 'Type file name here' ? 'New sprite.gif' : `${data.userFileName}.gif`;
      downloadGif.click();
    });

    gif.render();
  }

  resetAnimation() {
    const player = document.querySelector('.player');
    clearInterval(timer);
    player.getContext('2d').clearRect(0, 0, player.width, player.height);
    this.runPlayer();
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
      this.resetAnimation();
    };

    const coords = document.createElement('span');
    coords.className = 'coords';

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
    rightSidebar.appendChild(coords);
    container.appendChild(rightSidebar);
    Player.createDownloadBtn(this.data);

    runAnimationBtn.onclick = () => {
      this.runPlayer();
    };

    document.querySelector('.add-frame').addEventListener('click', () => {
      this.resetAnimation();
    });

    document.querySelector('#canvas').addEventListener('mouseup', () => {
      if (this.data.framesAmount === 1) {
        this.resetAnimation();
      }
    });
    document.querySelector('#canvas').addEventListener('mouseleave', () => {
      if (this.data.framesAmount === 1) {
        this.resetAnimation();
      }
    });
    document.querySelector('#canvas').addEventListener('mousemove', (e) => {
      const canvas = document.querySelector('#canvas');
      const x = Math.round((e.pageX - canvas.offsetLeft) / 20);
      const y = Math.round((e.pageY - canvas.offsetTop) / 20);

      Player.getCoords(x, y);
    });

    fullScreenBtn.onclick = () => {
      player.requestFullscreen();
    };
  }
}
