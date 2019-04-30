window.onload = () => checkStorage();

var tool_state,
    prev_color = 'rgb(255, 255, 255)',
    cur_color = 'rgb(255, 255, 255)';

var paint_bucket = document.querySelector('.tools-container>:nth-child(1)');
var color_picker = document.querySelector('.tools-container>:nth-child(2)');
var move = document.querySelector('.tools-container>:nth-child(5)');
var transform = document.querySelector('.tools-container>:nth-child(6)');
var color_palette = document.querySelector('.color-palette');

function checkStorage() {
    if(localStorage.getItem('tool_state') !== null) {
        tool_state = localStorage.getItem('tool_state');
        highlight(window[tool_state.toLowerCase()]);
    }
    if(localStorage.getItem('cur_color') !== null) {
        prev_color = localStorage.getItem('prev_color');
        cur_color = localStorage.getItem('cur_color');
        document.querySelector('#cur_color').style.backgroundColor = cur_color;
        document.querySelector('#prev_color').style.backgroundColor = prev_color;
    }
    if(localStorage.getItem('palette_state') !== null) {
        document.querySelector('.palette-container').innerHTML = localStorage.getItem('palette_state');
    }
}

function highlight(tool) {
    var tools = document.querySelectorAll('.tools-container>.item');
    for(var i = 0; i < tools.length; i++) {
        tools[i].style.color = '#000000';
    }
    tool.style.color = 'blue';
}

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
}

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
    }

    document.querySelector('.clone').remove();
    document.querySelector('.origin').style.backgroundColor = collection[1].style.backgroundColor;
    document.querySelector('.origin').style.border = '';
    document.querySelector('.origin').style.opacity = '';
    document.querySelector('.origin').className = collection[1].className;
    collection[1].style.backgroundColor = origin_color;
    collection[1].className = origin_className;
    document.querySelector('.origin').className = document.querySelector('.origin').classList[0];

    localStorage.setItem('palette_state', document.querySelector('.palette-container').innerHTML);
}

function setDefaultColor(color) {
    prev_color = cur_color;
    localStorage.setItem('prev_color', cur_color);
    cur_color = color;
    localStorage.setItem('cur_color', cur_color);
    document.querySelector('#cur_color').style.backgroundColor = cur_color;
    document.querySelector('#prev_color').style.backgroundColor = prev_color;
}

paint_bucket.onclick = function() {
    tool_state = 'PAINT_BUCKET';
    localStorage.setItem('tool_state', tool_state);
    highlight(this);
};

color_picker.onclick = function(e) {
    tool_state = 'COLOR_PICKER';
    localStorage.setItem('tool_state', tool_state);
    color_palette.style.display = 'grid';
    color_palette.style.top = `${e.pageY}px`;
    color_palette.style.left = `${e.pageX}px`;
    highlight(this);
};

document.querySelector('.color-palette').onclick = function(e) {
    if(e.target.className === 'color-palette') return;
    else {
        prev_color = cur_color;
        localStorage.setItem('prev_color', cur_color);
        cur_color = getComputedStyle(e.target).backgroundColor;
        localStorage.setItem('cur_color', cur_color);
        document.querySelector('#cur_color').style.backgroundColor = cur_color;
        document.querySelector('#prev_color').style.backgroundColor = prev_color;

        color_palette.style.display = 'none';
    }
}

document.querySelector('#default-red').onclick = setDefaultColor.bind(this, '#ff0000');

document.querySelector('#default-blue').onclick = setDefaultColor.bind(this, '#0000ff');

document.querySelector('.palette-container').onclick = function(e) {
    if(tool_state === 'PAINT_BUCKET') {
        if(e.target.className === 'palette-container') {
            return;
        } else {
            e.target.style.backgroundColor = cur_color;
            localStorage.setItem('palette_state', document.querySelector('.palette-container').innerHTML);
        }
    } else if(tool_state === 'COLOR_PICKER') {
        prev_color = cur_color;
        localStorage.setItem('prev_color', cur_color);
        if(e.target.className === 'palette-container') {
            localStorage.setItem('cur_color', cur_color);
        } else {
            cur_color = getComputedStyle(e.target).backgroundColor;
            localStorage.setItem('cur_color', cur_color);
        }
        document.querySelector('#cur_color').style.backgroundColor = cur_color;
        document.querySelector('#prev_color').style.backgroundColor = prev_color;

        color_palette.style.display = 'none';
    } else if(tool_state === 'TRANSFORM') {
        if(getComputedStyle(e.target).borderRadius === '100%') {
            e.target.style.borderRadius = '0%';
            e.target.className = 'squad';
            localStorage.setItem('palette_state', document.querySelector('.palette-container').innerHTML);
        } else {
            e.target.style.borderRadius = '100%';
            e.target.className = 'circle';
            localStorage.setItem('palette_state', document.querySelector('.palette-container').innerHTML);
        }
    }
};

document.querySelector('.palette-container').onmousedown = function(e) {
    function moveAt(e, elem) {
        elem.style.left = e.pageX - shiftX + 'px';
        elem.style.top = e.pageY - shiftY + 'px';
    }

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

transform.onclick = function() {
    tool_state = 'TRANSFORM';
    localStorage.setItem('tool_state', tool_state);
    highlight(this);
};

move.onclick = function() {
    tool_state = 'MOVE';
    localStorage.setItem('tool_state', tool_state);
    highlight(this);
};

document.onkeypress = function(e) {
    if(e.code === 'KeyP') {
        tool_state = 'PAINT_BUCKET';
        localStorage.setItem('tool_state', tool_state);
        highlight(paint_bucket);
    } else if(e.code ==='KeyC') {
        tool_state = 'COLOR_PICKER';
        localStorage.setItem('tool_state', tool_state);
        color_palette.style.display = 'grid';
        color_palette.style.top = `${e.pageY}px`;
        color_palette.style.left = `${e.pageX}px`;
        highlight(color_picker);
    } else if(e.code === 'KeyM') {
        tool_state = 'MOVE';
        localStorage.setItem('tool_state', tool_state);
        highlight(move);
    } else if(e.code === 'KeyT') {
        tool_state = 'TRANSFORM';
        localStorage.setItem('tool_state', tool_state);
        highlight(transform);
    } else if(e.code === 'Delete') {
        localStorage.clear();
        document.location.reload();
    }
}
