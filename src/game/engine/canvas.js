export default function Canvas(w, h) {

  this.w = w;
  this.h = h;

  this.c = document.getElementsByTagName('canvas')[0];
  this.ctx = this.c.getContext('2d');
  this.c.width = w;
  this.c.height = h;
  this.c.style.width = w+'px';
  this.c.style.height = h+'px';


  this.resize = function() {
    let winH = window.innerHeight,
      ratio = this.w / this.h,
      w2 = winH * ratio,
      fullScreen = !window.screenTop && !window.screenY;

    this.c.width = this.w;
    this.c.height = this.h;

    this.cx = this.w / 2;
    this.cy = this.h / 2;

    this.c.style.width = ~~(w2)+ 'px';
    this.c.style.height = ~~(winH) + 'px';

    if (fullScreen) {
      this.c.classList.add('fullscreen');
    } else {
      this.c.classList.remove('fullscreen');
    }

  };

  window.addEventListener('resize', () => {
    this.resize();
  });
  this.resize();

  return {
    c: this.c,
    ctx: this.ctx
  };



}
