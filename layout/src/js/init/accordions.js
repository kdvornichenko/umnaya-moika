import Accordion from '~/js/components/accordion';

window.addEventListener('load', () => {
    const accContainers = $.qsa('[data-acc]');
    const accordions = [];
  
    if (accContainers) {
        accContainers.forEach(acc => {
            const accordion = new Accordion(acc);
            accordion.init();
            accordions.push(accordion);
        });
    
        document.addEventListener('accordion:update', e => {
            const acc = accordions.find(accordion => accordion.$acc === e.detail.el);
            acc.setContentSize();
        });
  
        window.addEventListener('resize', () => {
            accordions.forEach(accordion => {
                accordion.setContentSize();
            });
        });
    }
});
