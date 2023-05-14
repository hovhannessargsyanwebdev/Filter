const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  lazy: true,  
  // preloadImages: false,
  slidesPerView: 1,

  spaceBetween: 30,   
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    clickable: true
  },
  speed: 1500,
  // autoplay: {
  //   loop: true,
  //   delay: 2000,
  //   // disableOnInteraction: false,
  //   pauseOnMouseEnter: true,
  // },
})

const detailsModalSwiper = new Swiper('.details-modal-swiper', {
  direction: 'horizontal',
  slidesPerView: 1,

  speed: 800,
  autoplay: {
    loop: true,
    delay: 5000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})



