import './player.css';
import GIF from '../../../gifshot';

export default class Player {
  constructor(data) {
    this.data = data;
  }

  addBackgroundColor(imageURI, backgroundColor) {
    console.log(this);
    const image = new Image();
    image.src = imageURI;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 449;
    canvas.height = 449;

    // Add background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0);
    console.log(canvas.toDataURL());
    return canvas.toDataURL();
  }

  runPlayer() {
    // const fps = document.querySelector('input[type="range"]');
    // const player = document.querySelector('.player');
    const frames = [...document.querySelectorAll('.frame')];
    const images = frames.map(frame => frame.toDataURL());
    // const prepareImage = images.map(image => this.addBackgroundColor(image, 'yellow'));
    GIF.createGIF({
      images: images,
      gifWidth: 449,
      gifHeight: 449,
    }, (obj) => {
      if (!obj.error) {
        const { image } = obj;
        const animatedImage = document.createElement('img');
        animatedImage.src = image;
        document.body.appendChild(animatedImage);
      }
    });
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
