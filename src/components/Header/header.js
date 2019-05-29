import './header.css';
import '../../assets/fonts/pixel-font.ttf';

export default class Header {
  constructor(data) {
    this.data = data;
  }
}

Header.prototype.initialRender = () => {
  const header = document.createElement('header');

  const pageWrapper = document.getElementsByClassName('page-wrapper')[0];
  header.innerHTML = 'Piskel clone';

  const createBtn = document.createElement('span');
  createBtn.className = 'button';
  createBtn.innerText = 'Create new sprite';
  createBtn.id = 'iii';

  // const input = document.createElement('input');
  // input.type = 'text';
  // input.placeholder = this.data.userFileName;
  // input.oninput = () => { this.data.userFileName = input.value; console.log(input.value); };

  header.appendChild(createBtn);
  pageWrapper.appendChild(header);
};
