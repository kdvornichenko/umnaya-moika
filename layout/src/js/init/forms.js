import Form from '~/js/components/form';

$.each('[data-form]', form => {
    new Form(form);
});
