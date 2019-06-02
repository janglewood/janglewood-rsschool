import './player.css';

export default class Player {
  constructor(data) {
    this.data = data;
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const playerContainer = document.createElement('span');
    playerContainer.className = 'player-container';

    const player = document.createElement('canvas');
    player.className = 'player';

    const fps = document.createElement('input');
    fps.type = 'range';
    fps.min = 1;
    fps.max = 24;
    fps.step = 1;

    const fpsInfo = document.createElement('span');
    fpsInfo.innerText = `${fps.value} FPS`;

    fps.oninput = () => { fpsInfo.innerText = `${fps.value} FPS`; };

    const runAnimationBtn = document.createElement('span');
    runAnimationBtn.className = 'button';
    runAnimationBtn.innerText = 'Run animation';

    const fullScreenBtn = document.createElement('span');
    fullScreenBtn.className = 'button';
    fullScreenBtn.innerText = 'Full screen';

    playerContainer.appendChild(fullScreenBtn);
    playerContainer.appendChild(runAnimationBtn);
    playerContainer.appendChild(fps);
    playerContainer.appendChild(fpsInfo);
    playerContainer.appendChild(player);
    container.appendChild(playerContainer);

    runAnimationBtn.onclick = () => {
      let i = 0;
      const frames = document.querySelectorAll('.frame');
      setInterval(() => {
        if (i === frames.length) {
          i = 0;
        }
        player.getContext('2d').clearRect(0, 0, player.width, player.height);
        player.getContext('2d').drawImage(frames[i], 0, 0);
        i++;
      }, 1000 / fps.value);
    };

    fullScreenBtn.onclick = () => {
      player.requestFullscreen();
    };
  }
}
