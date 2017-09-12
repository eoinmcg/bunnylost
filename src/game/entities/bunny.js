import {Sprite} from './sprite';

export class Bunny extends Sprite {


  constructor(g, opts) {
    opts.i = 'p1';
    opts.frames = 3;
    opts.scale = 8;
    super(g, opts);
    this.anims = { 
      blink: { frames: [1,2,1,1,1,1], rate: 0.2 },
    }
    this.changeAnim('blink');
  }

}

