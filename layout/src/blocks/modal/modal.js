import scroll from '~/js/helpers/stop-scroll';

const onEscape = e => {
    if (e.keyCode === 27) {
        const el = $.qs('.modal--active');

        if (!el) return false;

        const { modal } = el.dataset;
        close(el, modal);
    }
};

export const init = () => {
    // Open
    $.delegate('[data-modal-open]', (e, el) => {
        const modal = $.qs(`[data-modal="${el.dataset.modalOpen}"]`);
        // const modalName = el.dataset.modalOpen;
        if (!modal) return false;
        setTimeout(() => {
            el.dataset.modalClose = 'modal-menu';
            delete el.dataset.modalOpen;
        }, 500);
        open(modal);
    });

    // Load
    $.delegate('[data-modal-url]', (e, el) => {
        load(el.dataset.modalUrl, el.dataset.modalTab);
    });

    // Close
    $.delegate('[data-modal-close]', (e, el) => {
        const modal = $.qs(`[data-modal="${el.dataset.modalClose}"]`);
        if (!modal) return false;


        setTimeout(() => {
            el.dataset.modalOpen = 'modal-menu';
            delete el.dataset.modalClose;
        }, 500);

        close(modal);
    });
};

export function load(url) {
    fetch(url)
        .then((response) => response.text())
        .then((html) => {
            const modal = document.createElement('div');
            modal.innerHTML = html;
            const trueModal = $.qs('section', modal);
            $.qsa('.js-modals section').forEach((el) => {
                if (el.dataset.modal == trueModal.dataset.modal)
                    el.remove();
            });
            $.qs('.js-modals').appendChild(trueModal);
            open(trueModal);
        });
}

export function open(el) {
    const modalName = el.dataset.modal;
    $.qs('body').classList.add(`modal-${modalName}-active`);

    $.dispatch({
        el: document,
        name: 'beforeModalOpen',
        detail: { modalName },
    });

    scroll.disable(el);
    el.classList.add('modal--active');
    window.addEventListener('keydown', onEscape);

    $.dispatch({
        el: document,
        name: 'afterModalOpen',
        detail: { modalName },
    });
}

export function close(el) {
    const modalName = el.dataset.modal;
    $.qs('body').classList.remove(`modal-${modalName}-active`);

    $.dispatch({
        el: document,
        name: 'beforeModalClose',
        detail: { modalName },
    });

    scroll.enable();
    el.classList.remove('modal--active');
    window.removeEventListener('keydown', onEscape);

    $.dispatch({
        el: document,
        name: 'afterModalClose',
        detail: { modalName },
    });
}
