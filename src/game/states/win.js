
export class Win {

  constructor(g) {
    this.g = g;
  }

  init() {

    let g = this.g;

    this.curtain = g.h;

    this.font = g.H.mkFont(g, 7, 5);
    this.dings = 0;
    this.tick = 0;

    this.sun = {};
    this.sun.x = 50;
    this.sun.y = g.h * 2;
    this.sun.targetY = 10;

    this.sunImg = g.draw.color(g.imgs['boom'], g.options.pal[7], true);
    this.flower = g.draw.color(g.imgs['flower'], g.options.pal[3], true);
    this.flower2 = g.draw.color(g.imgs['flower'], g.options.pal[6], true);

    this.g.addEvent({
      time: 1000,
      cb: () => {
        this.g.changeState('title');
      }
    });
  }

  update(step) {
    const g = this.g;
    for (let n of g.ents) { n.update(step); }

    this.tick += 1;
    if ((this.tick % 30 === 0) && this.dings < 3) {
    this.dings += 1;
    g.sfx.play(this.dings === 3 ? 'fart' : 'coin');
    }

    let time = 350;
    let dist = this.sun.targetY - this.sun.y;
    this.sun.y = ~~g.H.tween(33, this.sun.y, dist, time)
  }

  render(step) {
    const g = this.g;

    g.draw.clear(g.options.pal[12]);
    for (let n of this.g.ents) { n.render(step); }

    g.draw.img(this.sunImg, 50, this.sun.y, 20);

    g.draw.text('YOU', this.font, false, 80);
    g.draw.text('WIN', this.font, false, 120);

    g.draw.rect(0, 436, g.w, g.h, g.options.pal[8]);
    g.draw.rect(0, 440, g.w, g.h, g.options.pal[9]);

    g.draw.img(this.flower, 50, 450, 5);
    g.draw.img(this.flower2, 150, 440, 4);
    g.draw.img(this.flower, 250, 430, 6);

    g.draw.ctx.globalAlpha = 0.5;
    g.draw.ctx.globalAlpha = 1;

  }
}

