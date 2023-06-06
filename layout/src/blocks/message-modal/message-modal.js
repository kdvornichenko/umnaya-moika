import {open, close} from '../modal/modal';

// Функция для бэка
function renderMessageModal(data) {
    let linkHTML = data.link ? `<a href="${data.link.href}" class="message-modal__link btn"><span class="btn__text">${data.link.text}</span></a>` : '';
    const modal = document.createElement('section');
    modal.className = 'modal modal--message-modal modal--message';
    modal.setAttribute('data-modal', 'message-modal');
    modal.innerHTML = `
        <button class="modal__overlay" type="button" data-modal-close="message-modal"></button>
        <div class="modal__container">
            <div class="modal__content">
                <div class="message-modal">
                    <button class="btn--close message-modal__close u-center" type="button" data-modal-close="message-modal"></button>
                    <p class="message-modal__title">${data.title}</p>
                    <p class="message-modal__text">${data.text}</p>
                    ${linkHTML}
                </p>
            </div>      
        </div>
    `;
    document.body.append(modal);

    open(modal);
    setTimeout(() => {
        if (modal) {
            close(modal);
        }
    }, 8000);
}

document.addEventListener('afterModalClose', e => {
    const modalName = e.detail.modalName;
    if (modalName === 'message-modal') {
        setTimeout(() => {
            $.qs(`[data-modal=${modalName}]`).remove();
        }, 300);
    }
});

window.renderMessageModal = renderMessageModal;
