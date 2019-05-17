let mouseIsDown = false;
let firstTouch;
let scrollLeft;
let movesIsBeen = false;
export function scrollByClick(dir, data, model) {
    document.querySelector('.card-container').style.scrollBehavior = 'smooth';

    if (dir === 'back') {
        data.currentPage -= 1;
        data.currentPage = data.currentPage < 1 ? 1 : data.currentPage;
        document.querySelector('.card-container').scrollTo(data.clientWidth * (data.currentPage - 1), 0);
        document.querySelector('.center').innerText = data.currentPage;
    } else if (dir === 'forward') {
        document.querySelector('.card-container').scrollTo(data.clientWidth * data.currentPage, 0);
        data.currentPage += 1;
        if (data.currentPage === Math.floor(data.cardsCount / data.cardsOnPage)) {
            model.getData(document.querySelector('.search-input').value, data.pageToken);
        }
        document.querySelector('.center').innerText = data.currentPage;
    }
}
export function timeout(data) {
    const amountsOfVisibleCards = data.currentPage * data.cardsOnPage;
    const cardToShow = amountsOfVisibleCards - data.cardsOnPage + 1;
    data.clientWidth = document.documentElement.clientWidth;
    if (data.clientWidth >= 1366) {
        data.cardsOnPage = 4;
    }
    else if (data.clientWidth >= 1024 && data.clientWidth < 1366) {
        data.cardsOnPage = 3;
    }
    else if (data.clientWidth >= 768 && data.clientWidth < 1024) {
        data.cardsOnPage = 2;
    }
    else if (data.clientWidth < 768) {
        data.cardsOnPage = 1;
    }
    [...document.querySelectorAll('.card')].forEach((card) => { card.style.margin = `0 ${(data.clientWidth - data.cardsOnPage * 300) / (data.cardsOnPage * 2)}px`; });
    data.currentPage = Math.ceil(cardToShow / data.cardsOnPage);
    document.querySelector('.card-container').scrollTo(data.clientWidth * (data.currentPage - 1), 0);
}

export function mouseUp(e, cardContainer, data, model) {
    const width = data.clientWidth;
    const xCoords = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
    if (movesIsBeen) {
        cardContainer.style.scrollBehavior = 'smooth';
        if (xCoords > firstTouch) { // back
            if (xCoords - firstTouch > width * 0.05) {
                data.currentPage -= 1;
                data.currentPage = data.currentPage < 1 ? 1 : data.currentPage;
                cardContainer.scrollTo(width * (data.currentPage - 1), 0);
            }
            else {
                cardContainer.scrollTo(width * (data.currentPage - 1), 0);
            }
        }
        else if (xCoords < firstTouch) { // forward
            if (firstTouch - xCoords > width * 0.05) {
                cardContainer.scrollTo(width * data.currentPage, 0);
                data.currentPage += 1;
                if (data.currentPage === Math.floor(data.cardsCount / data.cardsOnPage)) {
                    model.getData(document.querySelector('.search-input').value, data.pageToken);
                }
            }
            else {
                cardContainer.scrollTo(width * (data.currentPage - 1), 0);
            }
        }
        cardContainer.style.scrollBehavior = 'auto';
    }
    cardContainer.classList.remove('active');
    movesIsBeen = false;
    mouseIsDown = false;
}

export function mouseDown(e, cardContainer) {
    const xCoords = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
    mouseIsDown = true;
    firstTouch = xCoords - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
    cardContainer.classList.add('active');
}

export function mouseLeave(cardContainer) {
    cardContainer.classList.remove('active');
    mouseIsDown = false;
}

export function mouseMove(e, cardContainer) {
    const xCoords = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
    if (mouseIsDown) {
        movesIsBeen = true;
        e.preventDefault();
        const x = xCoords - cardContainer.offsetLeft;
        const step = (x - firstTouch) * 1.5;
        cardContainer.scrollLeft = scrollLeft - step;
    }
}
