export default class Header {
  constructor(data) {
    this.data = data;
    this.text = 'I am header!';
  }

  initialRender() {
    const header = document.createElement('header');
    header.innerHTML = this.text;
    document.getElementsByClassName('page-wrapper')[0].appendChild(header);
  }
}
