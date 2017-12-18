import H from '../engine/helpers';
import {Segments, StartSeg} from './segments';

export class Map {

  constructor(g, o) {

    this.g = g;
    this.p = o.p;

    this.tileSize = 8;
    this.scale = 4;

    this.tileDim = this.tileSize * this.scale;
    this.tileX = this.g.w / this.tileDim;
    this.tileY = this.g.h / this.tileDim;

    this.w = g.w / ( this.tileSize * this.scale )
    this.vx = 0;
    this.vy = 1;

    this.cx = 0;
    this.cy = 0;

    this.tick = 0;
    this.waves = 0;

    let water2 = g.draw.resize(g.imgs['water2'], this.scale);
    let water3 = g.draw.flip(water2, 1, 1);

    this.tileSet = [
      g.draw.resize(g.imgs['tile'], this.scale),
      g.draw.resize(g.imgs['carrot'], this.scale - 1),
      g.draw.resize(g.imgs['rock'], this.scale),
      g.draw.resize(g.imgs['flower'], this.scale),
      g.draw.resize(g.imgs['wall'], this.scale),
      g.draw.flip(g.draw.resize(g.imgs['wall'], this.scale), true, false),
      g.draw.resize(g.imgs['water'], this.scale),
      water2,
      water3,
      g.draw.resize(g.imgs['lilly'], this.scale),
      g.draw.resize(g.imgs['mushroom'], this.scale),
    ];

    this.data = [];
    this.block = this.makeBlock();

    while(this.data.length <= this.tileY / 2) {
      this.data.push(this.newRow());
    }

    while(this.data.length <= this.tileY + 6) {
      this.data.unshift(this.newRow());
    }

  }

  newRow(empty = false) {
    let row = [4],
      w = this.g.w / (this.tileSize * this.scale) - 2;
    for( let x = 0; x < w; x++ ) {
      row.push ( (empty) ? 0 : Math.random() > 0.95 ? this.randomBlock() : 0 );
    }
    row.push(5);
    return row;
  }

  nextRow() {
    if (!this.block.length) {
      this.block = this.makeBlock();
    }
    let row = this.block.pop();
    if (row[0] === 0) {
      this.g.spawn('hog', {p: this.p});
    }
    return row;
  }

  randomBlock() {
    return H.rnd(1,3);
  }

  update(step) {
    this.cy += ~~(  this.p.speed  * step );
    this.tick += 1;
    if (this.tick > 1000) {
      this.tick = 0;
    }
    this.waves = (Math.floor(this.tick / 40) % 2) ? 0 : 1

    if (this.cy > this.tileDim) {
      this.data.shift();
      this.data.push(this.nextRow());
      this.cy -= (this.tileDim);
    }
  }

  render() {
    let x = 0, y = this.cy, 
      g = this.g,
      c = H.mkCanvas(g.w, g.h),
      ctx = c.getContext('2d'),
      h = this.g.h / (this.tileSize * this.scale),
      cy = this.cy,
      tiles = this.tileSet,
      t = this,
      p = this.p,
      wh = this.tileDim,
      ripple;

    let col = 1;
    for (let i = 0; i < h; i += 1) {
      let row = this.data[this.data.length - i - 1];
      x = 0;
      row.forEach((cell) => {
        if (cell) {
          ctx.drawImage(tiles[cell],x, y);
          if (cell === 7 && this.waves === 1) {
            ctx.fillStyle = '#31a2f2';
            ctx.fillRect(x, y, wh, wh);
          } else if (cell === 8 && this.waves !== 1) {
            ctx.fillStyle = '#31a2f2';
            ctx.fillRect(x, y, wh, wh);
          } else if (cell === 6) {
            if (Math.random() > 0.95) {
              let pos = g.H.rnd(wh/4, wh - (wh/4))
              ctx.fillStyle = '#fff';
              ctx.fillRect(x + pos, y + pos, 8, 4);
            }
          }
        }
            // ctx.strokeStyle = '#000';
            // ctx.strokeRect(x, y, wh, wh);
        x += wh;
      });
      y += wh;
    }

    g.draw.ctx.drawImage(c, 0, 0);

  }

  getTile(ox, oy) {
    let x = flr( ox / this.tileDim );
    let y = flr( flr( oy / this.tileDim ) - flr( this.cy / this.tileDim ) );

    let hitRow = this.data[this.data.length - y - 1];
    return hitRow[x];
  }

  setTile(ox, oy, val = 0) {
    let x = flr( ox / this.tileDim );
    let y = flr( flr( oy / this.tileDim ) - flr( this.cy / this.tileDim ) );
    this.data[this.data.length - y - 1][x] = val;
  }

  exactFit(ox, oy) {
    let x = ox / this.tileDim;
    let y = flr(oy / this.tileDim);
    // when cy = 32, will throw false
    let cy = this.cy === this.tileDim ? 0 : this.cy;

    let fit = x * this.tileDim === ox && (y * this.tileDim) + cy === oy;
    return fit;
  }

  makeBlock() {
    let rnd = this.g.H.rndArray(Object.keys(Segments));
    return Segments[rnd].build();
  }

}

const flr = Math.floor;
