export default function Input(canvas, g) {

  let l = window.addEventListener;
  let s = this;

  this.c = canvas;
  this.g = g;
  this.click = 0;
  this.x = 0;
  this.y = 0;

  this.keys = { l: 0, r: 0 };

  this.resetKeys = () => {
    this.keys = { l: 0, r: 0 };
  }

  l('keydown', (e) => {
    switch (e.keyCode) {
      case 39: this.keys.r = 1; this.click = true; break;
      case 37: this.keys.l = 1; this.click = true; break;
    }
  });

  l('touchstart', (e) => {
    this.click = true;
    this.trackTouch(e.touches);
  });

  l('touchmove', (e) => {
    this.preventDefault();
    this.trackTouch(e.touches);
  });

  l('touchend', (e) => {
    e.preventDefault();
    this.trackTouch(e.touches);
    this.click = false;
  });

  this.trackTouch = (touches) => {

    let c = this.c,
      offsetX = c.offsetLeft,
      scale = parseInt(c.style.width, 10) / c.width;

    const x = ~~(touches[0].pageX - offsetX) / scale;
    // alert(x + ', ' + c.width);

    if (x < c.width / 2) {
      this.keys.l = 1;
    } else {
      this.keys.r = 1;
    }
  };
}
