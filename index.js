$(document).on('DOMContentLoaded', function () {
  // topbar
  let swiperOptions = {
    speed: 10000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    loop: true,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    spaceBetween: 0,
    grabCursor: false,
    allowTouchMove: false
  };
  let topbar = new Swiper(".topbar .swiper", swiperOptions);

  // active link
  $(document).on('click', '.header .nav_link', function () {
    console.log(1);
    $('.header').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })
  // active link on mobile
  $(document).on('click', '#menu_mobile .nav_link', function () {
    console.log(1);
    $('#menu_mobile').find('.nav_link.active').removeClass('active');
    $(this).addClass('active')
  })
  $(window).on('resize', function () {
    if (window.innerWidth > 1149) {
      $('#menu_mobile,.cta_menu_mb.open').removeClass('open');
    }
  })
  $(window).on('load', function () {
    $('.header .header_wrap').addClass('open');
    $('.header .logo_brand').addClass('effect-running');
  });
})