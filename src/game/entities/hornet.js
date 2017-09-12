import {Sprite} from './sprite';

export class Hornet extends Sprite {
  constructor(g, opts) {
    opts.x = g.H.rnd(1,8) * opts.p.map.tileDim;
    opts.y = g.h + 20;
    opts.frames = 1;
    opts.scale = 4;
    opts.i = 'hornet';
    super(g, opts);
    this.speed = 220;
    this.group = 'baddies';
    this.shadow = g.draw.color(this.i, g.options.pal[0]);
  }

  update(step) {
    this.y -= this.speed * step;
    if (this.y < -this.h) {
      this.remove = true;
    }
  }

  render() {
    let g = this.g;
    g.draw.ctx.globalAlpha = 0.3;
    g.draw.img(this.shadow, this.x + 3, this.y + this.w/2);
    g.draw.ctx.globalAlpha = 1;
    super.render();
  }
}

