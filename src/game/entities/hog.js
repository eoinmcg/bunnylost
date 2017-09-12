import {Sprite} from './sprite';

export class Hog extends Sprite {
  constructor(g, opts) {
    opts.i = 'hog';
    opts.frames = 2;
    opts.scale = 3.5;
    super(g, opts);
    this.reset();
    this.group = 'baddies';
    this.anims = { 
      run: { frames: [1,2], rate: 0.045 },
    };
    this.changeAnim('run');
  }


  reset() {
    this.y = 0;
    if (Math.random() > 0.5) {
      this.x = 0;
      this.dir = 1;
      this.flip.x = 1;
    } else {
      this.x = this.g.w;
      this.dir = -1;
      this.flip.x = 0;
    }
    this.speed = this.g.H.rnd(100, 160);
  }

  update(step) {
    super.update(step);
    if (this.x >  this.g.w) {
      this.dir = -1;
      this.flip.x = 0;
    }
    if (this.x < -this.w) {
      this.dir = 1;
      this.flip.x = 1;
    }
    this.x += (this.dir * step) * this.speed;
    this.y += step * (this.p.speed);
  }

}
