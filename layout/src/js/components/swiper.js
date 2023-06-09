import Swiper, { Pagination, Navigation } from 'swiper';

// configure Swiper to use modules
Swiper.use([Pagination, Navigation]);
import 'swiper/css/bundle';

const swiperCases = new Swiper('.swiper-cases', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
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