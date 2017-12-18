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
    let gameArea = document.querySelector('canvas');
    const widthToHeight = this.w / this.h;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    const newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        this.c.style.height = newHeight + 'px';
        this.c.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        this.c.style.width = newWidth + 'px';
        this.c.style.height = newHeight + 'px';
    }
    
    this.c.style.marginTop = (-newHeight/ 2) + 'px';
    this.c.style.marginLeft = (-newWidth / 2) + 'px';
    
  }

  this._resize = function() {
    let winH = window.innerHeight,
      winW = window.innerWidth,
      ratio = this.w / this.h,
      w2 = winH * ratio,
      h2 = winW * ratio;

    this.c.width = this.w;
    this.c.height = this.h;

    this.cx = this.w / 2;
    this.cy = this.h / 2;

    this.c.style.width = ~~(w2)+ 'px';
    this.c.style.height = ~~(winH) + 'px';
  };

  this.delayedResize = function(delay = 100) {
    window.setTimeout(() => {
      this.resize();
    }, delay);
  }

  window.addEventListener('resize', () => {
    this.delayedResize();
  });
  window.addEventListener('fullscreenchange', () => {
    this.delayedResize(150);
  });
  this.delayedResize(500);

  return {
    c: this.c,
    ctx: this.ctx
  };



}
