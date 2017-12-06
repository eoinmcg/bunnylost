
export class Intro {

  constructor(g) {
    this.g = g;
  }

  init() {

    let g = this.g;

    this.font = g.H.mkFont(g, 5, 10);
    this.font2 = g.H.mkFont(g, 7, 10);
    this.font3 = g.H.mkFont(g, 4, 6);

    this.curtain = g.h;

    this.touches = 0;

    this.bunny = g.spawn('bunny', {x: 120, y: 400});

    this.addText('HALP!', 50);
    this.addText('I AM', 150);
    this.addText('LOST', 250);
    this.addText('IN THE', 350);
    this.addText('FOREST', 450);
    this.addText('OF DOOM', 550);
    this.addText('HALP ME', 750);
    this.addText('GET HOME', 850);
    this.addText('PLEASE', 1050);
    this.g.addEvent({
      time: 1150,
      cb: () => {
        this.g.transition = new this.g.availEnts['fade']({
          g: this.g,
          col: 0,
          y: 0,
          targetY: g.h,
          changeTo: 'main'
        });
      }
    });
    this.sounds = ['step', 'pew', 'zap', 'fart'];
  }

  update(step) {
    let i = this.g.input.keys;
    if (i.r || i.l) {
      this.touches += 1;
    }
    if (this.touches > 10) {
        this.g.changeState('main');
    }

    if (this.curtain > 1) {
      this.curtain -= 9;
    }
    for (let n of this.g.ents) { n.update(step); }
  }

  render(step) {
    const g = this.g;

    g.draw.clear(g.options.pal[10]);

    g.draw.ctx.globalAlpha = 0.5;
    g.draw.img(g.imgs.tree, 40, 300, 8);
    g.draw.img(g.imgs.tree, 290, 400, 3);
    g.draw.img(g.imgs.tree, 220, 380, 6);
    g.draw.ctx.globalAlpha = 1;

    g.draw.rect(0, g.h - 20, g.w, 20, g.options.pal[9]);
    g.draw.img(g.imgs.splash, 50, 0, 27);
    for (let n of this.g.ents) { n.render(step); }
    if (this.curtain) {
      g.draw.rect(0, 0,g.w, this.curtain, g.options.pal[0]);
    }
  }


  addText(text, delay, scale = 3, col = 'w') {
    this.g.addEvent({
      time: delay,
      cb: () => {
        const sfx = this.g.H.rndArray(this.sounds)
        this.g.sfx.play(sfx);
        this.g.spawn('text', {x: 100, y: 310, scale: 5, text: text, col: 4});
        this.bunny.flip.x = (this.bunny.flip.x) ? 0 : 1;
      }
    });
  }
}

