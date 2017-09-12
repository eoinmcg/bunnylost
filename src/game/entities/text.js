export class Text {

  constructor(g, o) {
    o.group = 'text';
    o.vy = o.vy || -10;
    o.vx = o.vx || 0;
    o.w = 10;
    o.w = 10;
    o.o = 1;
    o.alpha = 1;
    o.scale = o.scale || 4;
    o.col = o.col || 6;
    o.accel = o.accel || 0.5;
    o.fade = o.fade || 0.01;
    for (let n in o) {
      this[n] = o[n];
    }
    this.g = g;
    this.p = g.H.mkFont(g, o.scale, o.col);
  }

  update(step) {
    if (this.y < 0 || this.alpha < 0.1) {
      this.remove = true;
    }

    this.vy -= this.accel;
    this.alpha -= this.fade; 

    if (this.vx) {
      this.x += this.vx * step; 
    }
    this.y += this.vy * step; 
  }

  render() {
    let d = this.g.draw;
    if (this.text) {
      d.ctx.globalAlpha = this.alpha;
      d.text(this.text, this.p, this.x, this.y);
      d.ctx.globalAlpha = 1;
    } else if (this.o) {
      d.ctx.drawImage(this.i, this.x, this.y);
    }
  }
}
