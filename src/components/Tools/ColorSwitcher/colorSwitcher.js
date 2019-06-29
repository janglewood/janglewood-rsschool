import './colorSwitcher.css';

export default class ColorSwitcher {
  constructor(data, settings) {
    this.data = data;
    this.settings = settings;
  }

  render() {
    const container = document.createElement('span');
    container.className = 'color-switchers-container';

    this.createColorSwitcher('primary', container);
    this.createColorSwitcher('secondary', container);

    document.querySelector('.left-sidebar').appendChild(container);

    this.setColor('primary');
    this.setColor('secondary');
  }

  createColorSwitcher(type, container) {
    const colorSwitcher = document.createElement('span');
    const color = this.settings[`${type}Color`];
    colorSwitcher.innerHTML = `<input type='color' class='color-switcher' value='${color}' id='${type}-switcher'>`;

    container.appendChild(colorSwitcher);

    container.appendChild(colorSwitcher);
  }

  setColor(type) {
    const colorSwitcher = document.querySelector(`#${type}-switcher`);
    colorSwitcher.parentNode.style.backgroundColor = colorSwitcher.value;

    colorSwitcher.oninput = () => {
      colorSwitcher.parentNode.style.backgroundColor = colorSwitcher.value;
      this.settings[`${type}Color`] = colorSwitcher.value;
    };
  }
}
