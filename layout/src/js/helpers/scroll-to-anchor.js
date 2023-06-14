const menuLinks = document.querySelectorAll('.menu-link');

const scrollToAnchor = (anchorId) => {
    const element = document.querySelector(`section#${anchorId}`);
    if (element) {
        document.body.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth',
        });
    }
};
menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            scrollToAnchor(link.getAttribute('id'));
        }, 10);
    });
});