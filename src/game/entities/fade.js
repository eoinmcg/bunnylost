export class Fade {
  constructor(opts) {
    const g = opts.g;
    this.g = opts.g;
    this.col = g.options.pal[opts.col];
    this.y = opts.y;
    this.startY = opts.y;
    this.targetY = opts.targetY;
    this.done = false;
    this.changeTo = opts.changeTo || false;
  }

  update() {
    const g = this.g;
    let time = 250;
    let dist = this.targetY - this.y;
    this.y = ~~g.H.tween(33, this.y, dist, time);

    if (this.y > this.targetY - 10 || this.y === this.targetY) {
      this.done = true;
    }
  }

  render() {
    const g = this.g;
    g.draw.rect( 0, this.startY, g.w, this.y, this.col);
  }


}
