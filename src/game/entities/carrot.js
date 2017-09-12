import {Sprite} from './sprite';

export class Carrot extends Sprite {
  constructor(g, opts) {
    super(g, opts);
    this.group = 'carrot';
    this.speed = 200;
  }

  update(step) {
    this.x -= this.speed * step;
    this.y -= this.speed * step * 2;
    if (this.y < 0) {
      this.remove;
    }
  }

}


