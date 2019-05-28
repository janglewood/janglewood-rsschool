
console.log('Hello, guest!');
document.getElementsByTagName('body')[0].style.backgroundColor = 'pink';

function x() {
    document.getElementsByTagName('body')[0].style.backgroundColor = 'yellow';
}
setTimeout(x, 2000);