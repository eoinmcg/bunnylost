
export class Title {

  constructor(g) {
    this.g = g;
  }

  init() {

    let g = this.g;

    this.curtain = g.h;

    this.font = g.H.mkFont(g, 5, 10);
    this.font2 = g.H.mkFont(g, 7, 10);
    this.font3 = g.H.mkFont(g, 4, 6);

    this.Sfont = g.H.mkFont(g, 5, 7);
    this.Sfont2 = g.H.mkFont(g, 7, 7);

    this.moon = {};
    this.moon.x = 50;
    this.moon.y = g.h * 2;
    this.moon.targetY = 10;

    this.sMoon = g.draw.color(g.imgs['splash'], g.options.pal[7], true);
  }

  update(step) {
    const g = this.g;
    for (let n of g.ents) { n.update(step); }
    if (g.input.click && this.moon.y === this.moon.targetY && !g.transition) {
      g.transition = new g.availEnts['fade']({
        g: g,
        col: 0,
        y: 0,
        targetY: g.h,
        changeTo: 'intro'
      });
    }

    let time = 750;
    let dist = this.moon.targetY - this.moon.y;
    this.moon.y = ~~g.H.tween(33, this.moon.y, dist, time)
  }

  render(step) {
    const g = this.g;

    g.draw.clear(g.options.pal[10]);
    for (let n of this.g.ents) { n.render(step); }

    g.draw.img(this.sMoon, 50, this.moon.y, 28);
    g.draw.img(g.imgs.splash, 50, this.moon.y, 27);

    if (this.moon.y === this.moon.targetY) {
      g.draw.ctx.globalAlpha = 0.5;
      g.draw.text('BUNNY', this.Sfont, false, 85);
      g.draw.text('LOST', this.Sfont2, false, 120);
      g.draw.ctx.globalAlpha = 1;
    }

    g.draw.text('BUNNY', this.font, false, 80);
    g.draw.text('LOST', this.font2, false, 115);

    g.draw.rect(0, 460, g.w, g.h, g.options.pal[0]);
    g.draw.img(g.imgs.tree, 0, 300, 10);
    g.draw.img(g.imgs.tree, 100, 280, 12);
    g.draw.img(g.imgs.tree, 200, 320, 8);
    g.draw.img(g.imgs.tree, 250, 420, 8);
    g.draw.img(g.imgs.tree, 270, 420, 9);
    g.draw.img(g.imgs.tree, 300, 420, 9);
    g.draw.img(g.imgs.tree, 260, 350, 13);

    g.draw.ctx.globalAlpha = 0.5;
    g.draw.img(g.imgs.tree, 60, 400, 3);
    g.draw.img(g.imgs.tree, 70, 410, 8);
    g.draw.img(g.imgs.tree, 120, 380, 5);
    g.draw.img(g.imgs.tree, 220, 380, 6);
    g.draw.img(g.imgs.tree, 280, 380, 4);
    g.draw.img(g.imgs.tree, 300, 380, 4);
    g.draw.ctx.globalAlpha = 1;

    if (g.fader > 0 && this.moon.y === this.moon.targetY) {
      g.draw.text(g.mobile ? 'TAP TO PLAY' : 'L OR R CURSORS', this.font3, false, 400);
    }

  }
}
