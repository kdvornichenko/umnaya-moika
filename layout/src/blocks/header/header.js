const header = $.qs('.js-header');

const headerAnimate = (e) => {
    if (e.direction == 'down' && e.scroll.y > 50) {
        header.classList.remove('is-active');
    }
    else {
        header.classList.add('is-active');
    }
};

document.addEventListener('customScroll', (e) => {
    headerAnimate(e.detail);
});

