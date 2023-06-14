import axios from 'axios';

const form = document.getElementById('form');
const formName = form.querySelector('input[name="name"]');
const formEmail = form.querySelector('input[name="email"]');
const formTel = form.querySelector('input[name="tel"]');
const formMessanger = form.querySelector('select[name="messanger"]');
// const formBtn = form.querySelector('button.btn');

let nameValue;
let emailValue;
let telValue;
let messangerValue = formMessanger.options[formMessanger.selectedIndex].text;
// let URL;

formName.addEventListener('input', () => {
    nameValue = formName.value;
    // changeURL();
});
formEmail.addEventListener('input', () => {
    emailValue = formEmail.value;
    // changeURL();
});
formTel.addEventListener('input', () => {
    telValue = formTel.value;
    // changeURL();
});
formMessanger.addEventListener('change', () => {
    messangerValue = formMessanger.options[formMessanger.selectedIndex].text;
    // changeURL();
});

// function changeURL() {
//     URL = `https://script.google.com/macros/s/AKfycby30uoPj6QPz3INjKcZciQEuOE38STWjTSpLBcRu1vMiYQgss-hkSBsVx33zpou1KFb/exec?p1=${nameValue}&p2=${emailValue}&p3=${telValue}&p4=${messangerValue}`;
// }

// formBtn.addEventListener('click', () => {
//     axios.post(URL).then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.error(error);
//     });
// });

form.addEventListener('submit', (event) => {
    event.preventDefault(); // предотвращает перезагрузку страницы
    const url = 'https://script.google.com/macros/s/AKfycbyGpNU3ak8Jkmlsg7BcVxaaTfvlruUMdofRcFl_e2VKq43m_Q6Df8kycwoFLZKtAeRy/exec';
    axios.post(url, {
        p1: nameValue,
        p2: emailValue,
        p3: telValue,
        p4: messangerValue,
    }).then(() => {
        console.log('success');
    }).catch(error => {
        console.error(error);
    });
});