import {Sprite} from './sprite';

export class Bat extends Sprite {
  constructor(g, opts) {
    opts.frames = 2;
    opts.scale = 4;
    opts.x = g.H.rnd(1,8) * opts.p.map.tileDim;
    opts.y = -g.h;
    opts.i = 'bat';
    super(g, opts);
    this.speed = 220;
    this.group = 'baddies';
    this.shadow = g.draw.color(this.i, g.options.pal[0]);
    this.anims = { 
      fly: { frames: [1,2], rate: 0.01 },
    };
    this.changeAnim('fly');
    this.range = g.H.rnd(1,6) / 1000;
  }

  update(step) {
    super.update(step);
    this.y += this.speed * step;
    this.x += Math.sin(new Date().getTime() * this.range);
  }

  render() {
    let g = this.g;
    g.draw.ctx.globalAlpha = 0.2;
      g.draw.ctx.drawImage(this.shadow, 
        ( this.frame * this.w ) - this.w, 0,
        this.w, this.h,
        ~~this.x + 3, ~~this.y + this.h / 2,
        this.w, this.h
        );
    g.draw.ctx.globalAlpha = 1;
    super.render();
  }
}

