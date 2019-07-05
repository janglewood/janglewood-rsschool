import './settings.css';
import ModalFrame from '../ModalFrame/modal';

export default class Settings {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  render() {
    this.createSizeSettings();
  }


  createSizeSettings() {
    const sizeSettings = document.createElement('span');
    sizeSettings.className = 'size-settings-container';

    for (let i = 32; i <= 128; i *= 2) {
      const sizeItem = document.createElement('span');
      sizeItem.className = 'button';
      sizeItem.innerText = `${i}x${i}`;
      sizeItem.onclick = () => {
        const modalFrame = new ModalFrame(this.data, this.settings);
        modalFrame.render('Do you really want to change resolution of the canvas? It\'s will create a new project and all changes will be lost.', true);
        this.settings.canvasSize = i;
      };

      sizeSettings.appendChild(sizeItem);
    }

    document.getElementsByClassName('right-sidebar')[0].appendChild(sizeSettings);
  }
}
