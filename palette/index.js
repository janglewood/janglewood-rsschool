var tool_state;
var prev_color = 'rgb(255, 255, 255)';
var cur_color = 'rgb(255, 255, 255)';

var paint_bucket = document.querySelector('.tools-container>:nth-child(1)');
var choose_color = document.querySelector('.tools-container>:nth-child(2)');
var move = document.querySelector('.tools-container>:nth-child(5)');
var transform = document.querySelector('.tools-container>:nth-child(6)');
var color_palette = document.querySelector('.color-palette');

function highlight(tool) {
    var tools = document.querySelectorAll('.tools-container>.item');
    for(var i = 0; i < tools.length; i++) {
        tools[i].style.color = '#000000';
    }
    tool.style.color = 'blue';
};

paint_bucket.onclick = function() {
    tool_state = tool_state === 'PAINT_BUCKET' ? undefined : 'PAINT_BUCKET';
    highlight(this);
};

choose_color.onclick = function(e) {
    tool_state = 'COLOR_PICKER';
    color_palette.style.display = 'grid';
    color_palette.style.top = `${e.pageY}px`;
    color_palette.style.left = `${e.pageX}px`;
    highlight(this);
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
        if(getComputedStyle(e.target).borderRadius === '100%') {
            e.target.style.borderRadius = '0%';
            e.target.className = 'squad';
        } else {
            e.target.style.borderRadius = '100%';
            e.target.className = 'circle';
        }
    }
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
};

document.querySelector('.palette-container').onmousedown = function(e) {
    if((e.target.className === 'circle' || e.target.className === 'squad') && tool_state === 'MOVE' && !e.target.className.includes('clone')) {
        var clone = e.target.cloneNode();
        clone.className += ' clone';
        e.target.className += ' origin';
        var coords = getCoords(e.target);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;
        clone.style.width = getComputedStyle(e.target).width;
        clone.style.height = getComputedStyle(e.target).height;

        clone.style.position = 'absolute';
        document.querySelector('.palette-container').appendChild(clone);

        moveAt(e, clone);

        clone.style.border = '1px dotted #000000';
        clone.style.opacity = '0.5';
        e.target.style.border = '1px dotted #000000';
        e.target.style.opacity = '0.5';

        function moveAt(e, elem) {
            elem.style.left = e.pageX - shiftX + 'px';
            elem.style.top = e.pageY - shiftY + 'px';
        };

        document.onmousemove = function(e) {
            moveAt(e, clone);
        };

        clone.onmouseup = function() {
            document.querySelector('.palette-container').onmouseup = function(e) {
                switchElems(e);
            };

            document.onmousemove = null;
            clone.onmouseup = null;
        };
    }
};

function switchElems(event) {
    var collection = [...document.elementsFromPoint(event.clientX, event.clientY)].filter(item => item.tagName === 'SPAN');
    var origin_color = getComputedStyle(document.querySelector('.origin')).backgroundColor;
    var origin_className = document.querySelector('.origin').className;

    if(collection.length < 2 || (collection[1].className !== 'squad' && collection[1].className !== 'circle')) {
        document.querySelector('.clone').remove();
        document.querySelector('.origin').style.border = '';
        document.querySelector('.origin').style.opacity = '';
        document.querySelector('.origin').className = document.querySelector('.origin').classList[0];
        return;
    };

    document.querySelector('.clone').remove();
    document.querySelector('.origin').style.backgroundColor = collection[1].style.backgroundColor;
    document.querySelector('.origin').style.border = '';
    document.querySelector('.origin').style.opacity = '';
    document.querySelector('.origin').className = collection[1].className;
    collection[1].style.backgroundColor = origin_color;
    collection[1].className = origin_className;
    document.querySelector('.origin').className = document.querySelector('.origin').classList[0];
};

transform.onclick = function(e) {
    tool_state = 'TRANSFORM';
    highlight(this);
};

move.onclick = function() {
    tool_state = 'MOVE';
    highlight(this);
};
