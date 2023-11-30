// ============================
// Header
// ============================
class Header extends HTMLElement {
  constructor() {
    super()
    this.config = JSON.parse(this.getAttribute('config'));
    this.cta_mb = this.querySelector('.cta_menu_mb');
    this.menu_mobile = document.querySelector('#menu_mobile');
    this.cta_close_mobile = document.querySelector('.cta_close_menu');
    if (!this.config) {
      return
    };
    if (this.config.isSticky) {
      this.stickyHeader();
    }
    if (this.config.isTransparent) {

      this.transparentHeader()
    }
    this.menuMobile();
  }
  menuMobile() {
    let overlay = this.menu_mobile.querySelector('.overlay');
    if (!this.cta_mb) {
      return;
    }
    if (!this.menu_mobile) {
      return;
    }
    if (!this.cta_close_mobile) {
      return
    }
    this.cta_mb.addEventListener('click', () => {
      this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })
    overlay.addEventListener('click', () => {
      this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })
    this.cta_close_mobile.addEventListener('click', () => {
      this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })


  }
  stickyHeader() {

    if (!this.config) {
      return;
    }
    let self = this;
    window.addEventListener('scroll', function () {
      if (document.body.scrollTop > 56 || document.documentElement.scrollTop > 56) {
        // console.log(self);
        self.classList.add('header-sticky')
      } else {
        self.classList.remove('header-sticky')
      }
    })
  }
  transparentHeader() {

    this.classList.add('header-transparent')
  }

}
customElements.define('header-custom', Header)


// ============================
// Banner tabs-builder
// ============================

class tabsBuilder extends HTMLElement {
  constructor() {
    super();
    this.tabs = this.querySelectorAll('.tab-item');
    if (!this.tabs) {
      return;
    }
    if (window.innerWidth < 992) {
      return;
    }
    this.paramsDesktop = {
      grabCursor: true,
      slidesPerView: 'auto',
      initialSlide: 0,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: false,
        clickable: true,
      },
      on: {
        init: function () {
          console.log(" init");
        },
        update: function () {
          console.log('update');
        }
      },
    }
    this.paramsMobile = {
      grabCursor: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      centeredSlides: true,
      effect: "cards",
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: false,
        clickable: true,
      },
      cardsEffect: {
        perSlideOffset: 25,
        perSlideRotate: 15,
      },
      on: {
        init: function () {
          console.log(" init");
        },
        update: function () {
          console.log('update');
        }
      },
    }
    this.swiper = this.initSwiper(this.paramsDesktop);
    this.mySwiper = this.querySelector('.tab_content_inner.active .swiper').swiper;
    this.tabsList();
    this.tabscontent();
  }
  tabsList() {
    let self = this;
    this.tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        let tabs_active = self.querySelector('.tab-item.active');
        if (tabs_active) {
          tabs_active.classList.remove('active');
        }
        tab.classList.add('active');
        self.querySelector('.tab_content_inner.active').classList.remove('active');
        self.querySelector(`${tab.getAttribute('data-tab-trigger')}.tab_content_inner`).classList.add('active');
        // console.log(tab.getAttribute('data-tab-trigger'));
        let btn = self.querySelector('.tab_content_inner.active button.item.active');
        if (btn.getAttribute('aria-controls') == 'mobile') {
          self.swiper.destroy(true, true);
          self.swiper = self.initSwiper(self.paramsMobile);
          // self.swiper.slideTo(self.swiper.activeIndex, 2)
          // console.log(self.swiper);
        } else {
          self.swiper.destroy(true, true);
          self.swiper = self.initSwiper(self.paramsDesktop);
          // self.swiper.slideTo(self.swiper.activeIndex, 1)
          // console.log(self.swiper);
        }
      })
    })
  }
  tabscontent() {
    let self = this;
    let content_active = self.querySelector('.tab_content_inner.active');
    if (content_active) {
      let btns = self.querySelectorAll('button.item');
      if (btns) {
        btns.forEach(btn => {
          btn.addEventListener('click', function () {

            self.querySelector('.tab_content_inner.active button.item.active').classList.remove('active');
            btn.classList.add('active');

            self.querySelector('.tab_content_inner.active .swiper').setAttribute('slider-type', btn.getAttribute('aria-controls'));

            if (btn.getAttribute('aria-controls') == 'mobile') {
              self.swiper.destroy(true, true);
              self.swiper = self.initSwiper(self.paramsMobile);
              // self.swiper.slideTo(self.swiper.activeIndex, 2)
              // console.log(self.swiper);
            } else {
              self.swiper.destroy(true, true);
              self.swiper = self.initSwiper(self.paramsDesktop);
              // self.swiper.slideTo(self.swiper.activeIndex, 1)
              // console.log(self.swiper);
            }
          })
        })
      }
    }
  }
  initSwiper(params) {
    return new Swiper('.tab_content_inner.active .swiper', params);
  }

}
customElements.define('tabs-builder', tabsBuilder)


// ============================
// video custom
// ============================

// structor
// <video-custom config='{"time_start": 0}'>
//  html
//</video-custom>

class customVideo extends HTMLElement {
  constructor() {
    super();
    this.config = JSON.parse(this.getAttribute('config'));
    if (!this.config) {
      // return;
    }
    this.starttime = this.config.time_start;
    this.video = this.querySelector('#video');
    this.endtime = this.video.duration;
    this.playVideo();
  }
  playVideo() {
    let self = this;
    self.video.addEventListener('ended', function () {
      self.video.currentTime = self.starttime;
      // console.log();
      self.video.play();
    });

  }

}
customElements.define('custom-video', customVideo)