// ============================
// Header
// ============================
class Header extends HTMLElement {
  constructor() {
    super()
    this.config = this.getAttribute('config');
    this.cta_mb = this.querySelector('.cta_menu_mb');
    this.menu_mobile = document.querySelector('#menu_mobile');
    if (!this.config) {
      return
    };
    this.menuMobile()
  }
  menuMobile() {
    let overlay = this.menu_mobile.querySelector('.overlay');
    if (!this.cta_mb) {
      return;
    }
    if (!this.menu_mobile) {
      return;
    }
    this.cta_mb.addEventListener('click', () => {
      this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })
    overlay.addEventListener('click', () => {
      this.cta_mb.classList.toggle('open');
      this.menu_mobile.classList.toggle('open')
    })

  }

}
customElements.define('header-custom', Header)
// ============================
// Header nav_link active
// ============================

