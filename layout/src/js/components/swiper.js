import Swiper, { Pagination, Navigation } from 'swiper';

// configure Swiper to use modules
Swiper.use([Pagination, Navigation]);
import 'swiper/css/bundle';

const swiperCases = new Swiper('.swiper-cases', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next--cases',
        prevEl: '.swiper-button-prev--cases',
    },
    pagination: {
        el: '.swiper-pagination--cases',
        type: 'bullets',
    },
    breakpoints: {
        1300: {
            spaceBetween: 0,
        },
        320: {
            spaceBetween: 30,
        },
    },
});
swiperCases;

const swiperSupport = new Swiper('.swiper-support', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination--support',
        type: 'bullets',
    },
    spaceBetween: 16,
});
swiperSupport;

const swiperPartners = new Swiper('.swiper-partners', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination--partners',
        type: 'bullets',
    },
    spaceBetween: 16,
});
swiperPartners;