import {Sprite} from './sprite';

export class P1 extends Sprite {

  constructor(g, opts) {
    opts.i = 'p1';
    opts.frames = 3;
    opts.scale = 4;
    super(g, opts);
    this.gap = this.p.map.tileDim;
    this.speed = 4;
    this.defaultSpeed = 4;
    this.collidesWith = 'baddies';
    this.anims = { 
      blink: { frames: [1,2,1,1,1,1], rate: 0.2 },
      run: { frames: [3], rate: 0.02 },
      push: { frames: [4], rate: 0.02 }
    };
    this.group = 'p1';
    this.changeAnim('blink');
    this.targetX = this.x;
    this.targetY = this.y;
    this.offsetY = -6;
    this.combo = 0;
  }

  update(step) {
    super.update(step);
    let isMoving = this.isMoving();

    if (!isMoving) {
      this.speed = this.defaultSpeed;
      this.y += step * (this.p.speed);
      this.targetY = this.y;
      if (this.anim.name !== 'blink') {
        this.changeAnim('blink');
      }
      this.pollInput();
    } else {
      this.targetY += step * (this.p.speed);
      if (this.x < this.targetX) { this.x += this.speed; }
      if (this.x > this.targetX) { this.x -= this.speed; }
      if (this.y < this.targetY) { this.y += this.speed; }
      if (this.y > this.targetY) { this.y -= this.speed; }
    }

    if (this.y > this.g.h) {
      this.kill();
      this.g.sfx.play('fart');
    }

    if (this.hurt > 0) {
      this.hurt -= 1;
    }
  }

  isMoving() {
    return this.x !== this.targetX || this.targetY !== this.y;
  }

  pollInput() {
    let i = this.g.input.keys;

    let tile  = this.p.map.tileDim;
    let newX = this.x;
    let newY = this.y;

    if (i.r && this.x < 288) {
      newX = this.x + tile;
    } else if (i.l && this.x > 0) {
      newX = this.x - tile;
    }

    newY = (newX != this.x && this.y > tile * 2) 
      ? this.y - tile : newY

    if (newX !== this.x || newY !== this.y) {
      let moveTo = this.p.map.getTile(newX, newY);
      if (moveTo === 1) {
        this.combo += 1;
      } else {
        this.combo = 0;
      }
      if (moveTo !== 2 && moveTo !== 4 && moveTo !== 5) {
        this.g.score += 1;
        this.changeAnim('run');
        this.g.sfx.play('step');
        this.flip.x = (this.x !== newX) 
          ? newX < this.x : this.flip.x;
        this.targetX = newX; this.targetY = newY;
      } else {
        this.g.sfx.play('bounce');
        this.flip.x = !this.flip.x;
        this.g.score -= 1;
        this.hurt = 10;
        newY = this.y + tile;
        newX = newX > this.x 
          ? this.x - tile : this.x + tile;
        this.speed = 8;
        this.targetX = newX; this.targetY = newY;
      }
    }
  }

  doDamage(o) {
    this.g.sfx.play('pew');
    this.kill();
    this.g.spawn('boom', {x: this.x, y: this.y, col: 3, magnitude: 32});
  }
}
