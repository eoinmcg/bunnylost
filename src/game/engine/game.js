import Loader from './loader';
import Canvas from './canvas';
import Draw from './draw';
import Input from './input';

import H from './helpers';

export default function Game(options = {}) {
  const defaults = {
    w: 320,
    h: 480,
    orientation: 'portrait'
  };

  let ua = navigator.userAgent.toLowerCase();

  this.mobile = 'createTouch' in document || false;
  this.android = ua.indexOf('android') > -1;
  this.ios = /ipad|iphone|ipod/.test(ua);
  this.firefox = ua.indexOf('firefox') > -1;

  for (let n in defaults) { this[n] = defaults[n]; }
  this.options = Object.assign(defaults, options);
  this.sfx = options.SoundFX;
  this.dt   = 0;
  this.fps  = 60;
  this.frameStep = 1/ this.fps;
  this.frameCurr = 0;
  this.framePrev = H.timeStamp();
  this.stateName = 'title';
  this.H = H;

  this.states = options.states;
  this.availEnts = options.ents;

  this.score = 0;
  this.hiScore = 20;
  this.plays = 0;

  this.ents = [];
  this.imgs = [];
  this.fonts = [];
  this.events = [];
  this.transition = false;
// window.g = this;

  this.init = function() {
    const loader = new Loader(this.options.i);
    document.title = this.options.title;

    this.canvas = new Canvas(this.options.w, this.options.h);
    this.draw = new Draw(this.canvas.c, this.canvas.ctx);
    this.input = new Input(this.canvas.c, this.g);
    this.sfx.add(this.options.sfx);

    loader.start().then((res) => {
      this.imgs = res;
      this.makeFonts(this.imgs.font);
      document.getElementById('l').style.display = 'none';
      this.changeState(this.stateName);
      this.canvas.c.style.display = 'block';
      this.favIcon(this.draw.resize(this.imgs.carrot, 8));
      this.loop();
    });
  };

  this.makeFonts = function(f) {
    let i = 12;
    while (i-- > 1) {
      this.imgs['font_'+i] = this.draw.resize(f, i);
    }
  }

  this.favIcon = function(i) {
    let c = document.createElement('canvas'),
        ctx = c.getContext('2d'),
        l = document.createElement('link');
    c.width = c.height = 64;
    ctx.drawImage(i, 0, 0);
    l.type = 'image/x-icon';
    l.rel = 'shortcut icon';
    l.href = c.toDataURL('image/x-icon');
    document.getElementsByTagName('head')[0].appendChild(l);
  };

  this.changeState = function(state) {
    this.ents = [];
    this.events = [];
    this.state = new this.states[state](this);
    this.state.init();
    this.transition = false;
  };

  this.loop = function() {
    this.frameCurr = H.timeStamp();
    this.dt = this.dt + Math.min(1, (this.frameCurr - this.framePrev) / 1000);

    while(this.dt > this.frameStep) {
      this.dt = this.dt - this.frameStep;
      this.update(this.frameStep);
    }

    this.render(this.dt);
    this.framePrev = this.frameCurr;
    this.input.resetKeys();
    requestAnimationFrame(() => this.loop());
  };

  this.update = function(step) {
    this.fader = Math.sin(new Date().getTime() * 0.005);
    this.runEvents(step);
    this.state.update(step);

    let i = this.ents.length;
    while (i--) {
      if (this.ents[i].remove) {
        this.ents.splice(i, 1);
      }
    }
    this.input.click = false;
    if (this.transition) {
      this.transition.update();
      if (this.transition.done) {
        if (this.transition.changeTo) {
          this.changeState(this.transition.changeTo);
          this.transition = null;
        }
      }
    }

  };

  this.render = function(step) {
    this.state.render(step);
    if (this.transition) {
      this.transition.render();
    }

  };

  this.spawn = function(ent, opts) {
    const sprite = new this.availEnts[ent](this, opts);
    this.ents.push(sprite);
    return sprite;
  };

  this.addEvent = function(e) {
    this.events.push(e);
  }

  this.runEvents = function(step) {
    let i = this.events.length;
    while(i--) {
      let e = this.events[i]; 
      if (!e) {
        break;
      }
      e.time -= step * 100;
      if (e.time < 0) {
        e.cb.call(this);
        this.events.splice(i, 1);
      }
    }
  }
  
  return this;
}
