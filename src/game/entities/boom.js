import {Sprite} from './sprite';

export class Boom extends Sprite {

  constructor(g, o){
    o.col = o.col || 6;
    o.i = o.i || 'ouch';
    super(g, o);
    this.startX = o.x;
    this.startY = o.y;
    this.group = 'na';
    this.magnitude = o.magnitude || 64;
    this.factor = 4;

  }

  update(step) {
    let g = this.g;

    this.scale += this.factor;
    if (this.scale > this.magnitude && this.factor > 0) {
      this.factor *= -1;
    }
    if (this.scale <= 1) {
      this.remove = true;
    }

    this.mkImg(this.o.i);
  }

  render() {
    let x = this.startX - (this.w /2),
        y = this.y - (this.h / 2),
        g = this.g;

    if (this.opacity < 1) {
      g.draw.ctx.globalAlpha = this.opacity;
    }
    g.draw.ctx.drawImage(this.i, x, y);

    if (this.opacity < 1) {
      g.draw.ctx.globalAlpha = 1;
    }
  }

}
