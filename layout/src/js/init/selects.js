import Select from '../components/select';
const selectElems = $.qsa('[data-select]');

if (selectElems) {
    const selects = [];
    selectElems.forEach(select => selects.push(new Select(select)));

    window.addEventListener('load', setSelectsSize);
    window.addEventListener('resize', setSelectsSize);

    function setSelectsSize() {
        selects.forEach(select => select.setSize());
    }
}
