class Effect extends HTMLElement {
  constructor() {
    super();
    if (this.getAttribute('type') !== 'button') {
      return;
    }
    this.EffNum = this.getAttribute('eff-num');
    this.container = this.querySelector('div[effect-parent]');
    this.createChild();
    this.addEventListener('mousemove', (e) => {
      this.onHover(e);
    })
    this.addEventListener('mouseleave', () => {
      this.leaveHover();
    })
  }
  createChild() {
    for (let i = 0; i < this.EffNum; i++) {
      this.span = document.createElement('span');
      this.container.append(this.span)
    }
  }
  randomRangeInt(min, max) {
    // console.log(Math.floor(Math.random() * (max - min)) + min);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  onHover(e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    // console.log(this.x,this.y);

    this.arr = this.querySelectorAll('div[effect-parent] span');
    this.arr.forEach((el) => {
      el.style.top = `${this.y}px`;
      el.style.left = `${this.x}px`;
      // el.style.animationDuration = '10s';
      // el.style.transform = `translateX(100%)`
    })
  }
  leaveHover() {
    this.arr = this.querySelectorAll('div[effect-parent] span');
    this.arr.forEach((el) => {
      el.setAttribute('style', '')
    })
  }
}
customElements.define('effect-custom', Effect);