var tool_state;
var prev_color = 'rgb(255, 255, 255)';
var cur_color = 'rgb(255, 255, 255)';

var paint_bucket = document.querySelector('.tools-container>:nth-child(1)');
var choose_color = document.querySelector('.tools-container>:nth-child(2)');
var transform = document.querySelector('.tools-container>:nth-child(6)');
var color_palette = document.querySelector('.color-palette');


paint_bucket.onclick = function() {
    tool_state = tool_state === 'PAINT_BUCKET' ? undefined : 'PAINT_BUCKET';
};

choose_color.onclick = function(e) {
    tool_state = 'COLOR_PICKER';
    color_palette.style.display = 'grid';
    color_palette.style.top = `${e.pageY}px`;
    color_palette.style.left = `${e.pageX}px`;
};

for(var i = 0; i < document.querySelectorAll('.color-palette>span').length; i++) {
    document.querySelectorAll('.color-palette>span')[i].onclick = function(e) {
        prev_color = cur_color;
        cur_color = getComputedStyle(e.target).backgroundColor;
        document.querySelector('#cur_color').style.backgroundColor = cur_color;
        document.querySelector('#prev_color').style.backgroundColor = prev_color;

        color_palette.style.display = 'none';
    }
};

document.querySelector('#default-red').onclick = function(e) {
    prev_color = cur_color;
    cur_color = '#ff0000';
    document.querySelector('#cur_color').style.backgroundColor = cur_color;
    document.querySelector('#prev_color').style.backgroundColor = prev_color;
};

document.querySelector('#default-blue').onclick = function(e) {
    prev_color = cur_color;
    cur_color = '#0000ff';
    document.querySelector('#cur_color').style.backgroundColor = cur_color;
    document.querySelector('#prev_color').style.backgroundColor = prev_color;
};

document.querySelector('.palette-container').onclick = function(e) {
    if(tool_state === 'PAINT_BUCKET') {
        e.target.className === 'palette-container' ? null : e.target.style.backgroundColor = cur_color;
    } else if(tool_state === 'COLOR_PICKER') {
        prev_color = cur_color;
        cur_color = e.target.className === 'palette-container' ? cur_color : getComputedStyle(e.target).backgroundColor;
        document.querySelector('#cur_color').style.backgroundColor = cur_color;
        document.querySelector('#prev_color').style.backgroundColor = prev_color;

        color_palette.style.display = 'none';
    } else if(tool_state === 'TRANSFORM') {
        e.target.className === 'circle' ? e.target.className = 'squad' : e.target.className = 'circle';
    }
};

transform.onclick = function(e) {
    tool_state = 'TRANSFORM';
};
