import './header.css';
import '../../assets/fonts/pixel-font.ttf';

export default class Header {
  constructor(data) {
    this.data = data;
  }

  addFileNameInput() {
    const header = document.querySelector('header');
    const headerBtn = document.querySelector('header>.button');

    const input = document.createElement('input');
    input.classname = 'file-name';
    input.type = 'text';
    input.placeholder = this.data.userFileName;

    input.oninput = () => { this.data.userFileName = input.value; };

    header.insertBefore(input, headerBtn);
  }
}

Header.prototype.initialRender = () => {
  const header = document.createElement('header');

  const pageWrapper = document.getElementsByClassName('page-wrapper')[0];
  header.innerHTML = 'Piskel clone';

  const createBtn = document.createElement('span');
  createBtn.classList.add('button', 'create-sprite');
  createBtn.innerText = 'Create new sprite';

  header.appendChild(createBtn);
  pageWrapper.appendChild(header);
};
