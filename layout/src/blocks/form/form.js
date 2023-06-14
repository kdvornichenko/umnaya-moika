import axios from 'axios';
import { close } from '../modal/modal';

const modalPopup = document.querySelectorAll('[data-modal*="modal-popup"]');
const form = document.querySelectorAll('#form');

if (form.length) {
    const formName = document.querySelectorAll('input[name="name"]');
    const formEmail = document.querySelectorAll('input[name="email"]');
    const formTel = document.querySelectorAll('input[name="tel"]');
    const formMessanger = form[0].querySelector('select[name="messanger"]');

    let nameValue;
    let emailValue;
    let telValue;
    let messangerValue = formMessanger.options[formMessanger.selectedIndex].text;
    let URL;

    formName.forEach((item) => {
        item.addEventListener('input', () => {
            nameValue = item.value;
            changeURL();
        });
    });

    formEmail.forEach((item) => {
        item.addEventListener('input', () => {
            emailValue = item.value;
            changeURL();
        });
    });

    formTel.forEach((item) => {
        item.addEventListener('input', () => {
            telValue = item.value;
            changeURL();
        });
    });

    formMessanger.addEventListener('change', () => {
        messangerValue = formMessanger.options[formMessanger.selectedIndex].text;
        changeURL();
    });


    function changeURL() {
        URL = `https://script.google.com/macros/s/AKfycbw4izXnHm15xXFTfHHQXzqtsTviW0qcgXABvbjdnKaBvQ_60ttWiSsXBPQZjKaQvwSY-Q/exec?p1=${nameValue}&p2=${emailValue}&p3=${telValue}&p4=${messangerValue}`;
    }

    modalPopup.forEach((modal) => {
        const btn = modal.querySelector('.btn');
        const closeIcon = modal.querySelector('.modal__close');
        modal.addEventListener('click', (e) => {
            if (e.target === closeIcon || e.target.parentNode === closeIcon) {
                close(modal);
            }
            if (e.target === btn || e.target.parentNode === btn) {
                e.preventDefault;
                if (!modal.querySelector('select[name = "messanger"]')) {
                    messangerValue = '';
                }
                setTimeout(() => {
                    if (!btn.disabled) {
                        axios.post(URL)
                            .then(showLoader(btn.querySelector('.btn__text')))
                            .catch((error) => console.error(console.error(error)))
                            .finally(() => {
                                close(modal);
                                modal.querySelector('#form').reset();
                                hideLoader(btn.querySelector('.btn__text'));
                                window.location = '/thankyou.html';
                            });
                    }
                }, 200);
            }
        });
    });
}