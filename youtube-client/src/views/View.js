export default class View {
    constructor(data) {
        this.data = data;
        this.defaultStyleConfig = {
            backgroundColor: '#d0d0d0',
            font: 'Robobo',
            display: 'flex',
            flexDirection: 'row',
        };
    }

    initialRender() {
        const {
            backgroundColor,
            font,
            display,
            flexDirection,
        } = this.defaultStyleConfig;

        const bodyStyle = document.body.style;
        bodyStyle.backgroundColor = backgroundColor;
        bodyStyle.fontFamily = font;
        bodyStyle.display = display;
        bodyStyle.flexDirection = flexDirection;
    }
}
