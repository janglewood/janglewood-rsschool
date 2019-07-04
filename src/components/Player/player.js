import './player.css';
import GIF from '../../../gif';

export default class Player {
  constructor(data) {
    this.data = data;
  }

  addBackgroundColor(imageURI, backgroundColor) {
    console.log(this);
    const image = new Image();
    image.src = imageURI;

    const canva = document.createElement('canva');
    const ctx = canva.getContext('2d');

    canva.width = 449;
    canva.height = 449;

    // Add background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canva.width, canva.height);

    ctx.drawImage(image, 0, 0);
    console.log(canva.toDataURL());
    return canva.toDataURL();
  }

  runPlayer() {
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
        const player = document.querySelector('.player');
        console.log(img);
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

    fullScreenBtn.onclick = () => {
      player.requestFullscreen();
    };
  }
}
