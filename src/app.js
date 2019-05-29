import Header from './components/Header/header';
import Preview from './screens/Preview/preview';
import './style.css';

class App {
  constructor() {
    this.state = {
      mainScreen: true,
      userFileName: 'New sprite',
    };
  }

  start() {
    const header = new Header(this.state);
    const preview = new Preview(this.state);

    header.initialRender();
    preview.render();
  }
}

const app = new App();
app.start();

document.querySelectorAll('.action-container>.button')[0].onclick = (e) => {
    console.log(e);
}
