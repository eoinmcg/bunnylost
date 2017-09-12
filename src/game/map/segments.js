import H from '../engine/helpers';
import {Bridges} from './bridges';
import {Carrots} from './carrots';

const TILESIZE = 8;
const SCALE = 4;
const W = 320;

export const Segments = {
  water: {
    build: function() {
      let rows = H.rndArray(Bridges);
      rows.unshift(rndRow());
      rows.push(rndRow());
      return rows;
    }
  },
  rocks: {
    build: function() {
      let rows = [];
      let num = H.rnd(3,8);
      while (num--) {
        rows.push(rndRow());
      }
      return rows;
    }
  },
  hogs: {
    build: function() {
      let rows = [];
      let num = H.rnd(1,3);
      rows.push(rndRow());
      while(num--) {
        rows.push([0,0,0,0,0,0,0,0,0,0]);
        rows.push([0,0,0,0,0,0,0,0,0,0]);
        rows.push([0,0,0,0,0,0,0,0,0,0]);
      }
      rows.push(rndRow());
      rows.push(rndRow());
      return rows;
    }
  },
  carrots: {
    build: function() {
      let rows = H.rndArray(Carrots);
      rows.unshift(rndRow());
      rows.push(rndRow());
      return rows;
    }
  }
}

export const StartSeg = {
  build: function() {
    let rows = [];
    let i = 10;
    while (i--) {
      rows.push(rndRow());
    }
    return rows;
  }
}

const rndRow = (empty = false) => {
    let row = [4],
      w = W / (TILESIZE * SCALE) - 2;
    for( let x = 0; x < w; x++ ) {
      row.push ( (empty) ? 0 : Math.random() > 0.95 ? randomBlock() : 0 );
    }
    row.push(5);
    return row;
}

const randomBlock = () => {
  return H.rnd(1,3);
}
