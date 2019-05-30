export default class Editor {
  constructor(data) {
    this.data = data;
  }

  render() {
    this.data.mainScreenIsActive = false;
    document.getElementsByClassName('preview')[0].remove();

    const editorContainer = document.createElement('main');
    editorContainer.className = 'editor-container';
    document.getElementsByClassName('page-wrapper')[0].appendChild(editorContainer);
  }
}
