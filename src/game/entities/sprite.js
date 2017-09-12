export class Sprite {

  constructor(g, o) {
    this.g = g;
    this.o = o;
    this.id = Date.now() + '-' + g.ents.length;
    this.dead = false;
    this.remove = false;
    this.offsetY = 0;
    this.name = o.i;

    for (let n in o) {
      this[n] = o[n];
    }

    this.lastPos = { x: this.x, y: this.y };
    this.flip = { x: 0, y: 0 };

    this.scale = o.scale || 1;
    this.frame = o.frame || 1;
    this.frames = o.frames || 1;
    this.frameRate = o.frameRate || 80;
    this.frameNext = o.frameNext || 0;
    this.mkImg(o.i);
    this.hurt = false;

    this.anims = { idle: { frames: [1], rate: 80 } };
    this.changeAnim('idle');
  }

  update(step) {
    if (this.collidesWith) {
      this.hitGroup(this.collidesWith);
    }
    this.updateAnim(step);
  }

  render() {
    let g = this.g,
      i = (this.hurt) ? this.iHurt : this.i,
      frame = this.frame;

    if (i) {
      if (this.flip.y) {
        i = g.draw.flip(i, 0, 1);
      }
      if (this.flip.x) {
        i = g.draw.flip(i, 1, 0);
        frame = this.frames - this.frame + 1;
      }
      g.draw.ctx.drawImage(i, 
        ( frame * this.w ) - this.w, 0,
        this.w, this.h,
        ~~this.x, ~~this.y + this.offsetY,
        this.w, this.h
      );
    } else {
      this.g.draw.rect(~~this.x, ~~this.y, this.w, this.h, this.col);
    }
  }

  updateAnim(step) {
    if (this.frameNext < 0) {
      this.frameNext = this.anim.rate;
      this.anim.counter += 1;

      if (this.anim.counter >= this.anim.frames.length) {
        if (this.anim.next) {
          this.changeAnim(this.anim.next);
        }
        else {
          this.anim.counter = 0;
        }
      }
      this.frame = this.anim.frames[this.anim.counter];
    }
    this.frameNext -= this.g.dt;
  }

  hitGroup(group) {
    let g = this.g,
      i = g.ents.length;
    while (i--) {
      if (g.ents[i] && g.ents[i].group === group && 
        g.ents[i].id !== this.id && this.hit(g.ents[i]) &&
        g.ents[i].dead === false) {
          this.doDamage(g.ents[i]);
          g.ents[i].receiveDamage(this);
      } 
    }
  }

  hit(o) {
    let p1 = this;
    let half = p1.h / 2;
    let hh = o.name === 'hog' ? -6 : this.h;
    hh = this.h;
    return !((o.y+o.h<p1.y + half) || (o.y>p1.y+(half/2)) ||
      (o.x+o.w<p1.x) || (o.x>p1.x+p1.w));
  }

  receiveDamage(o) {
  }

  doDamage(o) {
  }

  kill() {
    this.dead = this.remove = true;
  }

  mkImg(name) {
    if (!this.i) {return; }
    let g = this.g;
    this.i = g.draw.resize(g.imgs[name], this.scale);
    this.w = ( this.i.width / this.frames);
    this.h = this.i.height;
    this.iHurt = g.draw.color(this.i, [190,38,51]);
  }

  changeAnim(name) {
    if (this.anim && this.anim.name && this.anim.name === name) {
      return;
    }
    this.anim = this.anims[name];
    this.anim.name = name;
    this.anim.counter = 0;
    this.frame = this.anim.frames[0];
    this.frameNext = this.anim.rate;
  }

};
