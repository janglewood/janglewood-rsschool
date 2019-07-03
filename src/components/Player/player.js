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
    // // const fps = document.querySelector('input[type="range"]');
    // // const player = document.querySelector('.player');
    const frames = [...document.querySelectorAll('.frame')];
    // const images = frames.map(frame => frame.toDataURL());
    // // const prepareImage = images.map(image => this.addBackgroundColor(image, 'yellow'));
    // GIF.createGIF({
    //   images: images,
    //   gifWidth: 449,
    //   gifHeight: 449,
    // }, (obj) => {
    //   if (!obj.error) {
    //     const { image } = obj;
    //     const animatedImage = document.createElement('img');
    //     animatedImage.src = image;
    //     document.body.appendChild(animatedImage);
    //   }
    // });
    var gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: './gif.worker.js',
      // width: '500px',
      // height: '500px',
      background: '#fff',
      transparent: 'rgba(0,0,0,0)'
    });
    const canva = document.createElement('canvas');
    canva.setAttribute('width', 640);
    canva.setAttribute('height', 640);
    // canva.style.display = 'none';
    // canva.style.width = `${canva.width * 20 / (32 / 32)}px`;
    // canva.style.height = `${canva.height * 20 / (32 / 32)}px`;
    // document.body.appendChild(canva);

    for (let i = 0; i < frames.length; i++) {
      gif.addFrame(frames[i]);
    }

    // or a canva element
    // gif.addFrame(frames[0], {delay: 200});
    // gif.addFrame(frames[1], {delay: 200});

    
    // or copy the pixels from a canva context

    // gif.addFrame(frames[1].getContext('2d'), {copy: true});
    
    gif.on('finished', function(blob) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      document.body.appendChild(img);
    });
    
    gif.render();
  }

  render() {
    const container = document.getElementsByClassName('editor-container')[0];

    const rightSidebar = document.createElement('span');
    rightSidebar.className = 'right-sidebar';

    const player = document.createElement('canva');
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
