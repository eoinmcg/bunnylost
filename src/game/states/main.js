import {Map} from '../map/map';

export class Main {

  constructor(g) {
    this.g = g;
  }

  init() {
    let g = this.g;
    this.speed = 60;
    this.map = new Map(g, {p: this});
    this.p1 = g.spawn('p1', {x: 160, y: 320, p: this});
    this.font = g.H.mkFont(g, 4, 6);
    this.fontB = g.H.mkFont(g, 10, 3);
    this.g.draw.clear(g.options.pal[11]);
    this.tile = 0;
    this.g.score = 0;
    this.curtain = g.h;
    this.gameOver = 0;

    if (this.g.plays === 0) {
      this.helpText();
    }
  }

  update(step) {
    const g = this.g;
    if (this.curtain > 1) {
      this.curtain -= 13;
    }
    this.map.update(step);
    if (Math.random() > 0.99) {
      g.spawn(g.score > 75 ? 'bat' : 'hornet', { p: this });
    }
    for (let n of this.g.ents) { n.update(step); }
    if (this.p1.dead) {
      if (this.gameOver === 0 && this.g.score > this.g.hiScore) {
        this.g.spawn('text', {x: 40, y: 150, scale: 6, text:'NEW HISCORE', col: 5, accel: 0.2, fade: 0.001});
        this.g.hiScore = this.g.score;
      }
      this.speed = 0;
      this.gameOver += 1;
      if (g.input.click && this.gameOver > 75) {
        g.plays += 1;
        try {
          window.sessionStorage.setItem('plays', g.plays);
        } catch (e) {
          // console.log(e);
        }
        g.changeState('main');
      }
      return;
    }

    this.tile = this.map.getTile(this.p1.x, this.p1.y);
    switch (this.tile) {
      case 1:
        g.sfx.play('coin');
        g.score += 1;
        this.map.setTile(this.p1.x, this.p1.y, 0);
        g.spawn('carrot', {x: this.p1.x, y: this.p1.y, i: 'carrot', scale: 3});
        break;
      case 6:
      case 7:
      case 8:
        if (!this.p1.isMoving()) {
          this.p1.kill();
          this.g.sfx.play('pew');
          g.spawn('boom', {x: this.p1.x, y: this.p1.y, i: 'boom', magnitude: 32});
        }
        break;
      case 2:
        break;
      case 0:

        break;
    }
  }

  render(step) {
    const g = this.g;
    g.draw.clear(g.options.pal[10]);
    this.map.render();
    for (let n of this.g.ents) { n.render(step); }
    g.draw.rect(0, 0, g.w, 32, g.options.pal[0])
    g.draw.rect(0, 32, g.w, 4, g.options.pal[0], 0.3)

    g.draw.text(g.score, this.font, 75, 6);
    g.draw.text('HI ', this.font, g.w - 100, 6);
    g.draw.text(g.hiScore, this.font, g.w - 50, 6);
    // backbutton pos
    // g.draw.rect(0, 0, 50, 50, g.options.pal[7], 1)

    if (this.p1.dead) {
      g.draw.rect(0, 180, this.gameOver * 10, 160, g.options.pal[6], 0.8)
    }
    if (this.gameOver * 10 > g.w &&  g.fader > 0) {
      g.draw.text('GAME', this.fontB, false, 200);
      g.draw.text('OVER', this.fontB, false, 260);
    }

    if (this.curtain) {
      g.draw.rect(0, 0,g.w, this.curtain, g.options.pal[0]);
    }
  }

  helpText() {
    if (this.g.mobile) {
      this.addText('TAP HERE', 50, 10);
      this.addText('TO JUMP LEFT', 150, 10);
      this.addText('TAP HERE', 250, 190);
      this.addText('TO JUMP RIGHT', 350, 110);
    } else {
      this.addText('LEFT CURSOR', 50, 10);
      this.addText('JUMPS LEFT', 150, 10);
      this.addText('RIGHT CURSOR', 250, 120);
      this.addText('JUMPS RIGHT', 350, 130);
    }
  }

  addText(text, delay, x = 10) {
    this.g.addEvent({
      time: delay,
      cb: () => {
        this.g.spawn('text', {x: x, y: 310, scale: 4, text: text, col: 6});
      }
    });
  }
}
