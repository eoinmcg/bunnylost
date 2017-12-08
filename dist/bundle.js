/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	var _base = __webpack_require__(7);

	var _base2 = _interopRequireDefault(_base);

	var _title = __webpack_require__(10);

	var _intro = __webpack_require__(11);

	var _main = __webpack_require__(12);

	var _win = __webpack_require__(17);

	var _p = __webpack_require__(18);

	var _carrot = __webpack_require__(20);

	var _hog = __webpack_require__(21);

	var _hornet = __webpack_require__(22);

	var _bat = __webpack_require__(23);

	var _text = __webpack_require__(24);

	var _boom = __webpack_require__(25);

	var _bunny = __webpack_require__(26);

	var _fade = __webpack_require__(27);

	var _soundfx = __webpack_require__(28);

	var _soundfx2 = _interopRequireDefault(_soundfx);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = _base2.default;
	options.states = { title: _title.Title, main: _main.Main, intro: _intro.Intro, win: _win.Win };
	options.ents = { p1: _p.P1, carrot: _carrot.Carrot, text: _text.Text, hog: _hog.Hog, hornet: _hornet.Hornet, bat: _bat.Bat, boom: _boom.Boom, bunny: _bunny.Bunny, fade: _fade.Fade };
	options.SoundFX = _soundfx2.default;

	new _game2.default(options).init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Game;

	var _loader = __webpack_require__(2);

	var _loader2 = _interopRequireDefault(_loader);

	var _canvas = __webpack_require__(3);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _draw = __webpack_require__(4);

	var _draw2 = _interopRequireDefault(_draw);

	var _input = __webpack_require__(5);

	var _input2 = _interopRequireDefault(_input);

	var _helpers = __webpack_require__(6);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Game() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var defaults = {
	    w: 320,
	    h: 480,
	    orientation: 'portrait'
	  };

	  var ua = navigator.userAgent.toLowerCase();

	  this.mobile = 'createTouch' in document || false;
	  this.android = ua.indexOf('android') > -1;
	  this.ios = /ipad|iphone|ipod/.test(ua);
	  this.firefox = ua.indexOf('firefox') > -1;

	  for (var n in defaults) {
	    this[n] = defaults[n];
	  }
	  this.options = Object.assign(defaults, options);
	  this.sfx = options.SoundFX;
	  this.dt = 0;
	  this.fps = 60;
	  this.frameStep = 1 / this.fps;
	  this.frameCurr = 0;
	  this.framePrev = _helpers2.default.timeStamp();
	  this.stateName = 'title';
	  this.H = _helpers2.default;

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

	  this.init = function () {
	    var _this = this;

	    var loader = new _loader2.default(this.options.i);
	    document.title = this.options.title;

	    this.canvas = new _canvas2.default(this.options.w, this.options.h);
	    this.draw = new _draw2.default(this.canvas.c, this.canvas.ctx);
	    this.input = new _input2.default(this.canvas.c, this.g);
	    this.sfx.add(this.options.sfx);

	    loader.start().then(function (res) {
	      _this.imgs = res;
	      _this.makeFonts(_this.imgs.font);
	      document.getElementById('l').style.display = 'none';
	      _this.changeState(_this.stateName);
	      _this.canvas.c.style.display = 'block';
	      _this.favIcon(_this.draw.resize(_this.imgs.carrot, 8));
	      _this.loop();
	    });
	  };

	  this.makeFonts = function (f) {
	    var i = 12;
	    while (i-- > 1) {
	      this.imgs['font_' + i] = this.draw.resize(f, i);
	    }
	  };

	  this.favIcon = function (i) {
	    var c = document.createElement('canvas'),
	        ctx = c.getContext('2d'),
	        l = document.createElement('link');
	    c.width = c.height = 64;
	    ctx.drawImage(i, 0, 0);
	    l.type = 'image/x-icon';
	    l.rel = 'shortcut icon';
	    l.href = c.toDataURL('image/x-icon');
	    document.getElementsByTagName('head')[0].appendChild(l);
	  };

	  this.changeState = function (state) {
	    this.ents = [];
	    this.events = [];
	    this.state = new this.states[state](this);
	    this.state.init();
	    this.transition = false;
	  };

	  this.loop = function () {
	    var _this2 = this;

	    this.frameCurr = _helpers2.default.timeStamp();
	    this.dt = this.dt + Math.min(1, (this.frameCurr - this.framePrev) / 1000);

	    while (this.dt > this.frameStep) {
	      this.dt = this.dt - this.frameStep;
	      this.update(this.frameStep);
	    }

	    this.render(this.dt);
	    this.framePrev = this.frameCurr;
	    this.input.resetKeys();
	    requestAnimationFrame(function () {
	      return _this2.loop();
	    });
	  };

	  this.update = function (step) {
	    this.fader = Math.sin(new Date().getTime() * 0.005);
	    this.runEvents(step);
	    this.state.update(step);

	    var i = this.ents.length;
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

	  this.render = function (step) {
	    this.state.render(step);
	    if (this.transition) {
	      this.transition.render();
	    }
	  };

	  this.spawn = function (ent, opts) {
	    var sprite = new this.availEnts[ent](this, opts);
	    this.ents.push(sprite);
	    return sprite;
	  };

	  this.addEvent = function (e) {
	    this.events.push(e);
	  };

	  this.runEvents = function (step) {
	    var i = this.events.length;
	    while (i--) {
	      var e = this.events[i];
	      if (!e) {
	        break;
	      }
	      e.time -= step * 100;
	      if (e.time < 0) {
	        e.cb.call(this);
	        this.events.splice(i, 1);
	      }
	    }
	  };

	  return this;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Loader;
	function Loader(images) {

	  this.images = images;
	  this.loaded = [];
	  this.loadedImgs = 0;
	  this.totalImgs = Object.keys(images).length;

	  this.start = function () {
	    var _this = this;

	    var loader = new Promise(function (resolve, reject) {
	      _this.resolve = resolve;
	      _this.reject = reject;
	      _this.loadImages(_this.images);
	    });

	    return loader;
	  };

	  this.loadImages = function (i) {
	    var append = 'data:image/gif;base64,';

	    for (var n in i) {
	      if (i.hasOwnProperty(n)) {
	        this.loaded[n] = new Image();
	        this.loaded[n].onload = this.checkLoaded();
	        this.loaded[n].src = append + i[n];
	      }
	    }
	  };

	  this.checkLoaded = function () {
	    var _this2 = this;

	    this.loadedImgs += 1;

	    if (this.loadedImgs === this.totalImgs) {
	      setTimeout(function () {
	        return _this2.resolve(_this2.loaded);
	      }, 500);
	    }
	  };

	  this.makeFonts = function () {
	    var _this3 = this;

	    return new Promise(function (resolve, reject) {
	      _this3.resolve = resolve;
	      _this3.reject = reject;
	    });
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Canvas;
	function Canvas(w, h) {
	  var _this = this;

	  this.w = w;
	  this.h = h;

	  this.c = document.getElementsByTagName('canvas')[0];
	  this.ctx = this.c.getContext('2d');
	  this.c.width = w;
	  this.c.height = h;
	  this.c.style.width = w + 'px';
	  this.c.style.height = h + 'px';

	  this.resize = function () {
	    var winH = window.innerHeight,
	        ratio = this.w / this.h,
	        w2 = winH * ratio,
	        fullScreen = !window.screenTop && !window.screenY;

	    this.c.width = this.w;
	    this.c.height = this.h;

	    this.cx = this.w / 2;
	    this.cy = this.h / 2;

	    this.c.style.width = ~~w2 + 'px';
	    this.c.style.height = ~~winH + 'px';

	    if (fullScreen) {
	      this.c.classList.add('fullscreen');
	    } else {
	      this.c.classList.remove('fullscreen');
	    }
	  };

	  window.addEventListener('resize', function () {
	    _this.resize();
	  });
	  this.resize();

	  return {
	    c: this.c,
	    ctx: this.ctx
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = Draw;
	function Draw(c, ctx) {

	  this.c = c;this.ctx = ctx;
	  this.clear = function () {
	    var col = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#000';
	    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	    if (col.length === 3) {
	      var code = col.join(',') + ',' + o;
	      col = 'rgba(' + code + ')';
	    }
	    this.ctx.fillStyle = col;
	    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
	  };

	  this.circle = function (x, y, r, col) {
	    var o = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

	    if ((typeof col === 'undefined' ? 'undefined' : _typeof(col)) === 'object') {
	      col = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ',' + o + ')';
	    }
	    this.ctx.fillStyle = col;
	    this.ctx.beginPath();
	    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	    this.ctx.closePath();
	    this.ctx.fill();
	  };

	  this.rect = function (x, y, w, h, col) {
	    var o = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

	    if ((typeof col === 'undefined' ? 'undefined' : _typeof(col)) === 'object') {
	      col = 'rgba(' + col[0] + ', ' + col[1] + ', ' + col[2] + ',' + o + ')';
	    }
	    this.ctx.fillStyle = col;
	    this.ctx.fillRect(x, y, w, h, col);
	  };

	  this.img = function (i, x, y) {
	    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	    if (scale) {
	      i = this.resize(i, scale);
	    }
	    this.ctx.drawImage(i, ~~x, ~~y);
	  };

	  this.flip = function (i, flipH, flipV) {

	    var c = this.mkCanvas(i.width, i.height),
	        ctx = c.getContext('2d'),
	        scaleH = flipH ? -1 : 1,
	        scaleV = flipV ? -1 : 1,
	        posX = flipH ? i.width * -1 : 0,
	        posY = flipV ? i.height * -1 : 0;

	    c.width = i.width;
	    c.height = i.height;

	    ctx.save();
	    ctx.scale(scaleH, scaleV);
	    ctx.drawImage(i, posX, posY, i.width, i.height);
	    ctx.restore();

	    return c;
	  }, this.resize = function (i, factor) {
	    var c = this.mkCanvas(i.width * factor, i.height * factor),
	        ctx = c.getContext('2d');

	    if (c.width) {
	      ctx.save();
	      ctx.scale(factor, factor);
	      ctx.drawImage(i, 0, 0);
	      ctx.restore();
	    }
	    c.scale = factor;
	    return c;
	  };

	  this.color = function (i, col) {
	    var returnCanvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    var c = this.mkCanvas(i.width, i.height),
	        ctx = c.getContext('2d');
	    var p = 0,
	        image = new Image(),
	        imageData = void 0;

	    ctx.drawImage(i, 0, 0);
	    imageData = ctx.getImageData(0, 0, i.width, i.height);

	    for (p = 0; p < imageData.data.length; p += 4) {
	      imageData.data[p + 0] = col[0];
	      imageData.data[p + 1] = col[1];
	      imageData.data[p + 2] = col[2];
	    }

	    ctx.putImageData(imageData, 0, 0);
	    image.src = c.toDataURL();
	    return returnCanvas ? c : image;
	  };

	  this.mkCanvas = function (w, h) {

	    var c = document.createElement('canvas'),
	        ctx = c.getContext('2d');

	    c.width = w;
	    c.height = h;
	    ctx.mozImageSmoothingEnabled = false;
	    ctx.imageSmoothingEnabled = false;

	    return c;
	  };

	  this.textWidth = function (s, f) {
	    return s.length * (3 * f.scale) + s.length * (1 * f.scale);
	  };

	  this.text = function (s, f, x, y) {
	    var i = 0,
	        ctx = this.ctx,
	        firstChar = 65,
	        offset = 0,
	        w = 3 * f.scale,
	        h = 5 * f.scale,
	        spacing = 1 * f.scale,
	        sW = this.textWidth(s, f),
	        charPos = 0;

	    if (typeof s === 'number' || s[0] === '0') {
	      s += '';
	      offset = 43;
	    }
	    x = x || (this.c.width - sW) / 2;

	    for (i = 0; i < s.length; i += 1) {
	      charPos = (s.charCodeAt(i) - firstChar + offset) * (w + spacing);
	      if (charPos > -1) {
	        ctx.drawImage(f, charPos, 0, w, h, ~~x, ~~y, w, h);
	      }
	      x += w + spacing;
	    }
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Input;
	function Input(canvas, g) {
	  var _this = this;

	  var l = window.addEventListener;
	  var s = this;

	  this.c = canvas;
	  this.g = g;
	  this.click = 0;

	  this.keys = { l: 0, r: 0 };

	  this.resetKeys = function () {
	    _this.keys = { l: 0, r: 0 };
	  };

	  l('keydown', function (e) {
	    switch (e.keyCode) {
	      case 39:
	        _this.keys.r = 1;_this.click = true;break;
	      case 37:
	        _this.keys.l = 1;_this.click = true;break;
	    }
	  });

	  l('touchstart', function (e) {
	    e.preventDefault();
	    _this.click = true;
	    _this.trackTouch(e.touches);
	  });

	  l('touchmove', function (e) {
	    e.preventDefault();
	  });

	  l('touchend', function (e) {
	    e.preventDefault();
	    _this.trackTouch(e.touches);
	    _this.click = false;
	  });

	  this.trackTouch = function (touches) {

	    var c = _this.c,
	        offsetX = c.offsetLeft,
	        scale = parseInt(c.style.width, 10) / c.width;

	    var x = ~~(touches[0].pageX - offsetX) / scale;

	    if (x < c.width / 2) {
	      _this.keys.l = 1;
	    } else {
	      _this.keys.r = 1;
	    }
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  timeStamp: function timeStamp() {
	    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	  },

	  rnd: function rnd(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	  },

	  rndArray: function rndArray(a) {
	    return a[~~(Math.random() * a.length)];
	  },

	  mkCanvas: function mkCanvas(w, h) {
	    var c = document.createElement('canvas');
	    var ctx = c.getContext('2d');

	    c.width = w;
	    c.height = h;

	    ctx.mozImageSmoothingEnabled = false;
	    ctx.msImageSmoothingEnabled = false;
	    ctx.imageSmoothingEnabled = false;

	    return c;
	  },

	  mkFont: function mkFont(g, size, col) {
	    var font = g.draw.color(g.imgs['font_' + size], g.options.pal[col], true);
	    font.scale = size;
	    return font;
	  },

	  /*
	  http://jsfiddle.net/jessefreeman/FJzcc/1/
	  T: current Time
	  B: start Value
	  C: change in value
	  D: duration
	  */
	  tween: function tween(t, b, c, d) {
	    return c * t / d + b;
	  }

	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _images = __webpack_require__(8);

	var _images2 = _interopRequireDefault(_images);

	var _sfx = __webpack_require__(9);

	var _sfx2 = _interopRequireDefault(_sfx);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  title: 'BUNNY LOST',
	  pal: [// AndroidArts16 - https://androidarts.com/palette/16pal.htm
	  [0, 0, 0], // 0 ash
	  [73, 60, 43], // 1 oldpoop
	  [164, 100, 34], // 2 newpoop
	  [190, 38, 51], // 3 bloodred
	  [224, 111, 139], // 4 pigmeat
	  [235, 137, 49], // 5 blaze
	  [255, 255, 255], // 6 blind
	  [247, 226, 107], // 7 zornskin
	  [47, 72, 78], // 8 shadegreen
	  [68, 137, 26], // 9 slimegreen
	  [27, 38, 50], // 10 nightblue
	  [0, 87, 132], // 11 seablue
	  [49, 162, 242], // 12 skyblue
	  [178, 220, 239]],
	  i: _images2.default,
	  sfx: _sfx2.default
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = { 'bat': 'R0lGODlhEAAIAKECAAAAAL4mMzGi8jGi8iH5BAEKAAIALAAAAAAQAAgAAAIdlGBolysBQHBQuhgvdkfphYVKCIpldnqJunLdUgAAOw==', 'boom': 'R0lGODlhDAAMAIABAP///zGi8iH5BAEKAAEALAAAAAAMAAwAAAIWjAMJd+pr3otSoYqz3uli+oET40FGAQA7', 'carrot': 'R0lGODlhCAAIAKEDAKRkIkSJGuuJMTGi8iH5BAEKAAMALAAAAAAIAAgAAAIS3IJha8oD0gLCGVodXmEz8RgFADs=', 'flower': 'R0lGODlhCAAIAIABAABXhDGi8iH5BAEKAAEALAAAAAAIAAgAAAIJjI+ZoMyrolQFADs=', 'font': 'R0lGODlhjwAFAIABAAAAAP///yH5BAEKAAEALAAAAACPAAUAAAJzDGKHcLzOFDRJ0UbXzdJ2lFQbRo5ipJ1TA7XsW2KanNWyZXpuzuNSz5txQDZTChSrsI6kXfOHDNmcl9+LKXxiU7fHBwV2zFxJzwZbGiazq+kyqua2h0I6vEhLh977Dm1fBaW1BvUwYmYY16UiuDN29VhRAAA7', 'hog': 'R0lGODlhFAAJAKEDAL4mM+Bvi////zGi8iH5BAEKAAMALAAAAAAUAAkAAAIjnI8Ykbc91kuSGTFA0BNrbglVNYjjc6ZpdDqtIjWkQtcWhBQAOw==', 'hornet': 'R0lGODlhBgAHAMIEAEk8K74mM7Lc7/fiazGi8jGi8jGi8jGi8iH5BAEKAAQALAAAAAAGAAcAAAMSSAEQ9GM8IpigIopbwYXSBEwJADs=', 'lilly': 'R0lGODlhCAAIAMIBAESJGjGi8qPOJ7Lc7zGi8jGi8jGi8jGi8iH5BAEKAAQALAAAAAAIAAgAAAMUGLoMDus9JYEYod4s97DCpgwkFiQAOw==', 'mushroom': 'R0lGODlhCAAIAKEDAL4mM+Bvi////zGi8iH5BAEKAAMALAAAAAAIAAgAAAISnI8TkRuAgDtOsmEXPEKk3hkFADs=', 'ouch': 'R0lGODlhCAAIAIABAL4mMzGi8iH5BAEKAAEALAAAAAAIAAgAAAIMTIBgl8gNo5wvrWYKADs=', 'p1': 'R0lGODlhFQAJAMIEAEk8K+Bvi7Lc7////zGi8jGi8jGi8jGi8iH5BAEKAAQALAAAAAAVAAkAAAMzSLrcK+JFqKi1bGYSH99d9VUQxZUdmgoAS7YAWQ5DGUQ1dBO5cPeCGm0W7NU2ntBH2UgAADs=', 'rock': 'R0lGODlhCAAIAKEDAC9ITp2dnf///zGi8iH5BAEKAAMALAAAAAAIAAgAAAITnI+hcRvCgHtBzmoXGCB304VDAQA7', 'skull': 'R0lGODlhBwAGAKECAL4mM////zGi8jGi8iH5BAEKAAIALAAAAAAHAAYAAAIMVH4GEHv8kJzI2CAKADs=', 'tile': 'R0lGODlhCAAIAIAAADGi8jGi8iH5BAEKAAEALAAAAAAIAAgAAAIHjI+py+1dAAA7', 'tree': 'R0lGODlhCAAUAIABAAAAADGi8iH5BAEKAAEALAAAAAAIABQAAAIejGF5msjhGohqPstwRXh6qUGaF4qUSX1bqh6kSyIFADs=', 'wall': 'R0lGODlhCAAIAIABAEk8KzGi8iH5BAEKAAEALAAAAAAIAAgAAAILhB15G+sPo2wopQIAOw==', 'water': 'R0lGODlhCAAIAIAAADGi8jGi8iH5BAEKAAEALAAAAAAIAAgAAAIHhI+py+1dAAA7', 'water2': 'R0lGODlhCAAIAKEAADGi8rLc7zGi8jGi8iH5BAEKAAIALAAAAAAIAAgAAAIJhI+py+0QoowFADs=' };

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  step: [200, 40, 2, 2, 0.2, 2],
	  coin: [500, 0, 10, 20, 0.1],
	  fart: [50, 50, 10, 10, 1, 1],
	  jump: [150, 30, 15, 20, 0.5],
	  bounce: [260, -60, 15, 15, 0.5, 2],
	  pew: [920, -80, 20, 15, 0.2, 0],
	  zap: [500, -200, 40, 10, 0.25, 0]
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Title = exports.Title = function () {
	  function Title(g) {
	    _classCallCheck(this, Title);

	    this.g = g;
	  }

	  _createClass(Title, [{
	    key: 'init',
	    value: function init() {

	      var g = this.g;

	      this.curtain = g.h;

	      this.font = g.H.mkFont(g, 5, 10);
	      this.font2 = g.H.mkFont(g, 7, 10);
	      this.font3 = g.H.mkFont(g, 4, 6);

	      this.Sfont = g.H.mkFont(g, 5, 7);
	      this.Sfont2 = g.H.mkFont(g, 7, 7);

	      this.moon = {};
	      this.moon.x = 50;
	      this.moon.y = -250;
	      this.moon.targetY = 40;
	      this.moonDist = 0;

	      this.sMoon = g.draw.color(g.imgs['boom'], g.options.pal[7], true);
	    }
	  }, {
	    key: 'update',
	    value: function update(step) {
	      var g = this.g;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = g.ents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var n = _step.value;
	          n.update(step);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (g.input.click && this.moonDist < 25 && !g.transition) {
	        var plays = 0;
	        try {
	          plays = window.sessionStorage.getItem('plays') || 0;
	          plays = parseInt(plays, 10);
	        } catch (e) {
	          // console.log(e);
	        }
	        var nextState = plays > 0 ? 'main' : 'intro';
	        g.transition = new g.availEnts['fade']({
	          g: g,
	          col: 0,
	          y: 0,
	          targetY: g.h,
	          changeTo: nextState
	        });
	      }

	      var time = 750;
	      this.moonDist = this.moon.targetY - this.moon.y;
	      this.moon.y = ~~g.H.tween(33, this.moon.y, this.moonDist, time);
	    }
	  }, {
	    key: 'render',
	    value: function render(step) {
	      var g = this.g;

	      g.draw.clear(g.options.pal[10]);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.g.ents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var n = _step2.value;
	          n.render(step);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      g.draw.img(this.sMoon, 50, this.moon.y, 19);
	      g.draw.img(g.imgs.boom, 50, this.moon.y, 18);

	      if (this.moonDist < 25) {
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

	      if (g.fader > 0 && this.moonDist < 25) {
	        g.draw.text(g.mobile ? 'TAP TO PLAY' : 'L OR R CURSORS', this.font3, false, 400);
	      }
	    }
	  }]);

	  return Title;
	}();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Intro = exports.Intro = function () {
	  function Intro(g) {
	    _classCallCheck(this, Intro);

	    this.g = g;
	  }

	  _createClass(Intro, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      var g = this.g;

	      this.font = g.H.mkFont(g, 5, 10);
	      this.font2 = g.H.mkFont(g, 7, 10);
	      this.font3 = g.H.mkFont(g, 4, 6);
	      this.skipFont = g.H.mkFont(g, 5, 7);

	      this.curtain = g.h;
	      this.bunny = g.spawn('bunny', { x: 120, y: 350 });

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
	        cb: function cb() {
	          _this.g.transition = new _this.g.availEnts['fade']({
	            g: _this.g,
	            col: 0,
	            y: 0,
	            targetY: g.h,
	            changeTo: 'main'
	          });
	        }
	      });
	      this.sounds = ['step', 'pew', 'zap', 'fart'];
	      window.i = this.i;
	    }
	  }, {
	    key: 'update',
	    value: function update(step) {
	      if (this.g.input.keys.r) {
	        this.g.changeState('main');
	      }

	      if (this.curtain > 1) {
	        this.curtain -= 9;
	      }
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.g.ents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var n = _step.value;
	          n.update(step);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(step) {
	      var g = this.g;

	      g.draw.clear(g.options.pal[10]);

	      g.draw.ctx.globalAlpha = 0.5;
	      g.draw.img(g.imgs.tree, 40, 260, 8);
	      g.draw.img(g.imgs.tree, 290, 360, 3);
	      g.draw.img(g.imgs.tree, 220, 340, 6);
	      g.draw.ctx.globalAlpha = 1;

	      g.draw.rect(0, g.h - 60, g.w, 60, g.options.pal[9]);
	      g.draw.rect(0, g.h - 60, g.w, 10, g.options.pal[8]);
	      g.draw.img(g.imgs.boom, 50, 10, 20);
	      g.draw.text('SKIP', this.skipFont, g.w - 90, g.h - 34);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.g.ents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var n = _step2.value;
	          n.render(step);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      if (this.curtain) {
	        g.draw.rect(0, 0, g.w, this.curtain, g.options.pal[0]);
	      }
	    }
	  }, {
	    key: 'addText',
	    value: function addText(text, delay) {
	      var _this2 = this;

	      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
	      var col = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'w';

	      this.g.addEvent({
	        time: delay,
	        cb: function cb() {
	          var sfx = _this2.g.H.rndArray(_this2.sounds);
	          _this2.g.sfx.play(sfx);
	          _this2.g.spawn('text', { x: 100, y: 310, scale: 5, text: text, col: 4 });
	          _this2.bunny.flip.x = _this2.bunny.flip.x ? 0 : 1;
	        }
	      });
	    }
	  }]);

	  return Intro;
	}();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Main = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _map = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Main = exports.Main = function () {
	  function Main(g) {
	    _classCallCheck(this, Main);

	    this.g = g;
	  }

	  _createClass(Main, [{
	    key: 'init',
	    value: function init() {
	      var g = this.g;
	      this.speed = 60;
	      this.map = new _map.Map(g, { p: this });
	      this.p1 = g.spawn('p1', { x: 160, y: 320, p: this });
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
	  }, {
	    key: 'update',
	    value: function update(step) {
	      var g = this.g;
	      if (this.curtain > 1) {
	        this.curtain -= 13;
	      }
	      this.map.update(step);
	      if (Math.random() > 0.99) {
	        g.spawn(g.score > 75 ? 'bat' : 'hornet', { p: this });
	      }
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.g.ents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var n = _step.value;
	          n.update(step);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (this.p1.dead) {
	        if (this.gameOver === 0 && this.g.score > this.g.hiScore) {
	          this.g.spawn('text', { x: 40, y: 150, scale: 6, text: 'NEW HISCORE', col: 5, accel: 0.2, fade: 0.001 });
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
	          g.spawn('carrot', { x: this.p1.x, y: this.p1.y, i: 'carrot', scale: 3 });
	          break;
	        case 6:
	        case 7:
	        case 8:
	          if (!this.p1.isMoving()) {
	            this.p1.kill();
	            this.g.sfx.play('pew');
	            g.spawn('boom', { x: this.p1.x, y: this.p1.y, i: 'boom', magnitude: 32 });
	          }
	          break;
	        case 2:
	          break;
	        case 0:

	          break;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(step) {
	      var g = this.g;
	      g.draw.clear(g.options.pal[10]);
	      this.map.render();
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.g.ents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var n = _step2.value;
	          n.render(step);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      g.draw.rect(0, 0, g.w, 32, g.options.pal[0]);
	      g.draw.rect(0, 32, g.w, 4, g.options.pal[0], 0.3);

	      g.draw.text(g.score, this.font, 75, 6);
	      g.draw.text('HI ', this.font, g.w - 100, 6);
	      g.draw.text(g.hiScore, this.font, g.w - 50, 6);
	      // backbutton pos
	      // g.draw.rect(0, 0, 50, 50, g.options.pal[7], 1)

	      if (this.p1.dead) {
	        g.draw.rect(0, 180, this.gameOver * 10, 160, g.options.pal[6], 0.8);
	      }
	      if (this.gameOver * 10 > g.w && g.fader > 0) {
	        g.draw.text('GAME', this.fontB, false, 200);
	        g.draw.text('OVER', this.fontB, false, 260);
	      }

	      if (this.curtain) {
	        g.draw.rect(0, 0, g.w, this.curtain, g.options.pal[0]);
	      }
	    }
	  }, {
	    key: 'helpText',
	    value: function helpText() {
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
	  }, {
	    key: 'addText',
	    value: function addText(text, delay) {
	      var _this = this;

	      var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

	      this.g.addEvent({
	        time: delay,
	        cb: function cb() {
	          _this.g.spawn('text', { x: x, y: 310, scale: 4, text: text, col: 6 });
	        }
	      });
	    }
	  }]);

	  return Main;
	}();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Map = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(6);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _segments = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = exports.Map = function () {
	  function Map(g, o) {
	    _classCallCheck(this, Map);

	    this.g = g;
	    this.p = o.p;

	    this.tileSize = 8;
	    this.scale = 4;

	    this.tileDim = this.tileSize * this.scale;
	    this.tileX = this.g.w / this.tileDim;
	    this.tileY = this.g.h / this.tileDim;

	    this.w = g.w / (this.tileSize * this.scale);
	    this.vx = 0;
	    this.vy = 1;

	    this.cx = 0;
	    this.cy = 0;

	    this.tick = 0;
	    this.waves = 0;

	    var water2 = g.draw.resize(g.imgs['water2'], this.scale);
	    var water3 = g.draw.flip(water2, 1, 1);

	    this.tileSet = [g.draw.resize(g.imgs['tile'], this.scale), g.draw.resize(g.imgs['carrot'], this.scale - 1), g.draw.resize(g.imgs['rock'], this.scale), g.draw.resize(g.imgs['flower'], this.scale), g.draw.resize(g.imgs['wall'], this.scale), g.draw.flip(g.draw.resize(g.imgs['wall'], this.scale), true, false), g.draw.resize(g.imgs['water'], this.scale), water2, water3, g.draw.resize(g.imgs['lilly'], this.scale), g.draw.resize(g.imgs['mushroom'], this.scale)];

	    this.data = [];
	    this.block = this.makeBlock();

	    while (this.data.length <= this.tileY / 2) {
	      this.data.push(this.newRow());
	    }

	    while (this.data.length <= this.tileY + 6) {
	      this.data.unshift(this.newRow());
	    }
	  }

	  _createClass(Map, [{
	    key: 'newRow',
	    value: function newRow() {
	      var empty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      var row = [4],
	          w = this.g.w / (this.tileSize * this.scale) - 2;
	      for (var x = 0; x < w; x++) {
	        row.push(empty ? 0 : Math.random() > 0.95 ? this.randomBlock() : 0);
	      }
	      row.push(5);
	      return row;
	    }
	  }, {
	    key: 'nextRow',
	    value: function nextRow() {
	      if (!this.block.length) {
	        this.block = this.makeBlock();
	      }
	      var row = this.block.pop();
	      if (row[0] === 0) {
	        this.g.spawn('hog', { p: this.p });
	      }
	      return row;
	    }
	  }, {
	    key: 'randomBlock',
	    value: function randomBlock() {
	      return _helpers2.default.rnd(1, 3);
	    }
	  }, {
	    key: 'update',
	    value: function update(step) {
	      this.cy += ~~(this.p.speed * step);
	      this.tick += 1;
	      if (this.tick > 1000) {
	        this.tick = 0;
	      }
	      this.waves = Math.floor(this.tick / 40) % 2 ? 0 : 1;

	      if (this.cy > this.tileDim) {
	        this.data.shift();
	        this.data.push(this.nextRow());
	        this.cy -= this.tileDim;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var x = 0,
	          y = this.cy,
	          g = this.g,
	          c = _helpers2.default.mkCanvas(g.w, g.h),
	          ctx = c.getContext('2d'),
	          h = this.g.h / (this.tileSize * this.scale),
	          cy = this.cy,
	          tiles = this.tileSet,
	          t = this,
	          p = this.p,
	          wh = this.tileDim,
	          ripple = void 0;

	      for (var i = 0; i < h; i += 1) {
	        var row = this.data[this.data.length - i - 1];
	        x = 0;
	        row.forEach(function (cell) {
	          if (cell) {
	            ctx.drawImage(tiles[cell], x, y);
	            if (_this.waves === 1 && (cell === 8 || cell === 7)) {
	              // ctx.fillStyle = '#31a2f2';
	              // ctx.fillRect(x, y, wh, wh);
	            } else if (cell === 6) {
	              if (Math.random() > 0.95) {
	                var pos = g.H.rnd(wh / 4, wh - wh / 4);
	                ctx.fillStyle = '#fff';
	                ctx.fillRect(x + pos, y + pos, 8, 4);
	              }
	            }
	          }
	          x += wh;
	        });
	        y += wh;
	      }

	      g.draw.ctx.drawImage(c, 0, 0);
	    }
	  }, {
	    key: 'getTile',
	    value: function getTile(ox, oy) {
	      var x = flr(ox / this.tileDim);
	      var y = flr(flr(oy / this.tileDim) - flr(this.cy / this.tileDim));

	      var hitRow = this.data[this.data.length - y - 1];
	      return hitRow[x];
	    }
	  }, {
	    key: 'setTile',
	    value: function setTile(ox, oy) {
	      var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	      var x = flr(ox / this.tileDim);
	      var y = flr(flr(oy / this.tileDim) - flr(this.cy / this.tileDim));
	      this.data[this.data.length - y - 1][x] = val;
	    }
	  }, {
	    key: 'exactFit',
	    value: function exactFit(ox, oy) {
	      var x = ox / this.tileDim;
	      var y = flr(oy / this.tileDim);
	      // when cy = 32, will throw false
	      var cy = this.cy === this.tileDim ? 0 : this.cy;

	      var fit = x * this.tileDim === ox && y * this.tileDim + cy === oy;
	      return fit;
	    }
	  }, {
	    key: 'makeBlock',
	    value: function makeBlock() {
	      var rnd = this.g.H.rndArray(Object.keys(_segments.Segments));
	      return _segments.Segments[rnd].build();
	    }
	  }]);

	  return Map;
	}();

	var flr = Math.floor;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StartSeg = exports.Segments = undefined;

	var _helpers = __webpack_require__(6);

	var _helpers2 = _interopRequireDefault(_helpers);

	var _bridges = __webpack_require__(15);

	var _carrots = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TILESIZE = 8;
	var SCALE = 4;
	var W = 320;

	var Segments = exports.Segments = {
	  water: {
	    build: function build() {
	      var rows = _helpers2.default.rndArray(_bridges.Bridges);
	      rows.unshift(rndRow());
	      rows.push(rndRow());
	      return rows;
	    }
	  },
	  rocks: {
	    build: function build() {
	      var rows = [];
	      var num = _helpers2.default.rnd(3, 8);
	      while (num--) {
	        rows.push(rndRow());
	      }
	      return rows;
	    }
	  },
	  hogs: {
	    build: function build() {
	      var rows = [];
	      var num = _helpers2.default.rnd(1, 3);
	      rows.push(rndRow());
	      while (num--) {
	        rows.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	        rows.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	        rows.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	      }
	      rows.push(rndRow());
	      rows.push(rndRow());
	      return rows;
	    }
	  },
	  carrots: {
	    build: function build() {
	      var rows = _helpers2.default.rndArray(_carrots.Carrots);
	      rows.unshift(rndRow());
	      rows.push(rndRow());
	      return rows;
	    }
	  }
	};

	var StartSeg = exports.StartSeg = {
	  build: function build() {
	    var rows = [];
	    var i = 10;
	    while (i--) {
	      rows.push(rndRow());
	    }
	    return rows;
	  }
	};

	var rndRow = function rndRow() {
	  var empty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	  var row = [4],
	      w = W / (TILESIZE * SCALE) - 2;
	  for (var x = 0; x < w; x++) {
	    row.push(empty ? 0 : Math.random() > 0.95 ? randomBlock() : 0);
	  }
	  row.push(5);
	  return row;
	};

	var randomBlock = function randomBlock() {
	  return _helpers2.default.rnd(1, 3);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Bridges = exports.Bridges = [[[8, 8, 8, 8, 8, 9, 9, 8, 8, 8], [6, 6, 6, 6, 9, 9, 9, 9, 6, 6], [7, 7, 7, 9, 9, 9, 9, 9, 7, 7]], [[8, 8, 8, 8, 9, 9, 8, 8, 8, 8], [7, 7, 7, 7, 9, 9, 7, 7, 7, 7]], [[8, 8, 8, 9, 8, 8, 9, 9, 8, 8], [6, 6, 9, 6, 9, 6, 9, 9, 6, 6], [7, 9, 7, 7, 9, 9, 9, 7, 9, 7]], [[8, 8, 8, 8, 9, 9, 8, 8, 8, 8], [6, 6, 6, 6, 9, 9, 6, 6, 6, 6], [6, 6, 6, 6, 9, 9, 6, 6, 6, 6], [6, 6, 6, 6, 9, 9, 6, 6, 6, 6], [9, 9, 7, 9, 9, 9, 9, 7, 9, 9]]];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Carrots = exports.Carrots = [[[4, 0, 0, 0, 0, 0, 0, 0, 0, 5], [4, 1, 0, 0, 0, 0, 0, 0, 1, 5], [4, 0, 1, 0, 0, 0, 0, 1, 0, 5], [4, 0, 0, 1, 0, 0, 1, 0, 0, 5], [4, 0, 0, 0, 1, 1, 0, 0, 0, 5], [4, 0, 0, 0, 1, 1, 0, 0, 0, 5], [4, 0, 0, 1, 0, 0, 1, 0, 0, 5], [4, 0, 1, 0, 0, 0, 0, 1, 0, 5], [4, 1, 0, 0, 0, 0, 0, 0, 1, 5]], [[4, 0, 0, 0, 0, 0, 0, 0, 1, 5], [4, 0, 0, 0, 0, 0, 0, 1, 0, 5], [4, 0, 0, 0, 0, 0, 1, 0, 0, 5], [4, 0, 0, 0, 0, 1, 0, 0, 0, 5], [4, 0, 0, 0, 1, 0, 0, 0, 0, 5], [4, 0, 0, 1, 0, 0, 0, 0, 0, 5], [4, 0, 1, 0, 0, 0, 0, 0, 0, 5], [4, 1, 0, 0, 0, 0, 0, 0, 0, 5]], [[4, 0, 0, 0, 0, 0, 0, 0, 0, 5], [4, 1, 0, 0, 0, 0, 0, 0, 0, 5], [4, 0, 1, 0, 0, 0, 0, 0, 0, 5], [4, 0, 0, 1, 0, 0, 0, 0, 0, 5], [4, 0, 0, 0, 1, 0, 0, 0, 0, 5], [4, 0, 0, 0, 0, 1, 0, 0, 0, 5], [4, 0, 0, 0, 0, 0, 1, 0, 0, 5], [4, 0, 0, 0, 0, 0, 0, 1, 0, 5], [4, 0, 0, 0, 0, 0, 0, 0, 1, 5]], [[4, 0, 0, 0, 1, 0, 0, 0, 0, 5], [4, 0, 0, 0, 0, 1, 0, 0, 0, 5], [4, 0, 0, 0, 1, 0, 0, 0, 0, 5], [4, 0, 0, 0, 0, 1, 0, 0, 0, 5], [4, 0, 0, 0, 1, 0, 0, 0, 0, 5], [4, 0, 0, 0, 0, 1, 0, 0, 0, 5]]];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Win = exports.Win = function () {
	  function Win(g) {
	    _classCallCheck(this, Win);

	    this.g = g;
	  }

	  _createClass(Win, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      var g = this.g;

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
	        cb: function cb() {
	          _this.g.changeState('title');
	        }
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(step) {
	      var g = this.g;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = g.ents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var n = _step.value;
	          n.update(step);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      this.tick += 1;
	      if (this.tick % 30 === 0 && this.dings < 3) {
	        this.dings += 1;
	        g.sfx.play(this.dings === 3 ? 'fart' : 'coin');
	      }

	      var time = 350;
	      var dist = this.sun.targetY - this.sun.y;
	      this.sun.y = ~~g.H.tween(33, this.sun.y, dist, time);
	    }
	  }, {
	    key: 'render',
	    value: function render(step) {
	      var g = this.g;

	      g.draw.clear(g.options.pal[12]);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.g.ents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var n = _step2.value;
	          n.render(step);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

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
	  }]);

	  return Win;
	}();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.P1 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var P1 = exports.P1 = function (_Sprite) {
	  _inherits(P1, _Sprite);

	  function P1(g, opts) {
	    _classCallCheck(this, P1);

	    opts.i = 'p1';
	    opts.frames = 3;
	    opts.scale = 4;

	    var _this = _possibleConstructorReturn(this, (P1.__proto__ || Object.getPrototypeOf(P1)).call(this, g, opts));

	    _this.gap = _this.p.map.tileDim;
	    _this.speed = 4;
	    _this.defaultSpeed = 4;
	    _this.collidesWith = 'baddies';
	    _this.anims = {
	      blink: { frames: [1, 2, 1, 1, 1, 1], rate: 0.2 },
	      run: { frames: [3], rate: 0.02 },
	      push: { frames: [4], rate: 0.02 }
	    };
	    _this.group = 'p1';
	    _this.changeAnim('blink');
	    _this.targetX = _this.x;
	    _this.targetY = _this.y;
	    _this.offsetY = -6;
	    _this.combo = 0;
	    return _this;
	  }

	  _createClass(P1, [{
	    key: 'update',
	    value: function update(step) {
	      _get(P1.prototype.__proto__ || Object.getPrototypeOf(P1.prototype), 'update', this).call(this, step);
	      var isMoving = this.isMoving();

	      if (!isMoving) {
	        this.speed = this.defaultSpeed;
	        this.y += step * this.p.speed;
	        this.targetY = this.y;
	        if (this.anim.name !== 'blink') {
	          this.changeAnim('blink');
	        }
	        this.pollInput();
	      } else {
	        this.targetY += step * this.p.speed;
	        if (this.x < this.targetX) {
	          this.x += this.speed;
	        }
	        if (this.x > this.targetX) {
	          this.x -= this.speed;
	        }
	        if (this.y < this.targetY) {
	          this.y += this.speed;
	        }
	        if (this.y > this.targetY) {
	          this.y -= this.speed;
	        }
	      }

	      if (this.y > this.g.h) {
	        this.kill();
	        this.g.sfx.play('fart');
	      }

	      if (this.hurt > 0) {
	        this.hurt -= 1;
	      }
	    }
	  }, {
	    key: 'isMoving',
	    value: function isMoving() {
	      return this.x !== this.targetX || this.targetY !== this.y;
	    }
	  }, {
	    key: 'pollInput',
	    value: function pollInput() {
	      var i = this.g.input.keys;

	      var tile = this.p.map.tileDim;
	      var newX = this.x;
	      var newY = this.y;

	      if (i.r) {
	        newX = this.x + tile;
	      } else if (i.l) {
	        newX = this.x - tile;
	      }

	      newY = newX != this.x && this.y > tile * 2 ? this.y - tile : newY;

	      if (newX !== this.x || newY !== this.y) {
	        var moveTo = this.p.map.getTile(newX, newY);
	        if (moveTo === 1) {
	          this.combo += 1;
	        } else {
	          this.combo = 0;
	        }
	        if (moveTo !== 2 && moveTo !== 4 && moveTo !== 5) {
	          this.g.score += 1;
	          this.changeAnim('run');
	          this.g.sfx.play('step');
	          this.flip.x = this.x !== newX ? newX < this.x : this.flip.x;
	          this.targetX = newX;this.targetY = newY;
	        } else {
	          this.g.sfx.play('bounce');
	          this.flip.x = !this.flip.x;
	          this.g.score -= 1;
	          this.hurt = 10;
	          newY = this.y + tile;
	          newX = newX > this.x ? this.x - tile : this.x + tile;
	          this.speed = 8;
	          this.targetX = newX;this.targetY = newY;
	        }
	      }
	    }
	  }, {
	    key: 'doDamage',
	    value: function doDamage(o) {
	      this.g.sfx.play('pew');
	      this.kill();
	      this.g.spawn('boom', { x: this.x, y: this.y, col: 3, magnitude: 32 });
	    }
	  }]);

	  return P1;
	}(_sprite.Sprite);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sprite = exports.Sprite = function () {
	  function Sprite(g, o) {
	    _classCallCheck(this, Sprite);

	    this.g = g;
	    this.o = o;
	    this.id = Date.now() + '-' + g.ents.length;
	    this.dead = false;
	    this.remove = false;
	    this.offsetY = 0;
	    this.name = o.i;

	    for (var n in o) {
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

	  _createClass(Sprite, [{
	    key: 'update',
	    value: function update(step) {
	      if (this.collidesWith) {
	        this.hitGroup(this.collidesWith);
	      }
	      this.updateAnim(step);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var g = this.g,
	          i = this.hurt ? this.iHurt : this.i,
	          frame = this.frame;

	      if (i) {
	        if (this.flip.y) {
	          i = g.draw.flip(i, 0, 1);
	        }
	        if (this.flip.x) {
	          i = g.draw.flip(i, 1, 0);
	          frame = this.frames - this.frame + 1;
	        }
	        g.draw.ctx.drawImage(i, frame * this.w - this.w, 0, this.w, this.h, ~~this.x, ~~this.y + this.offsetY, this.w, this.h);
	      } else {
	        this.g.draw.rect(~~this.x, ~~this.y, this.w, this.h, this.col);
	      }
	    }
	  }, {
	    key: 'updateAnim',
	    value: function updateAnim(step) {
	      if (this.frameNext < 0) {
	        this.frameNext = this.anim.rate;
	        this.anim.counter += 1;

	        if (this.anim.counter >= this.anim.frames.length) {
	          if (this.anim.next) {
	            this.changeAnim(this.anim.next);
	          } else {
	            this.anim.counter = 0;
	          }
	        }
	        this.frame = this.anim.frames[this.anim.counter];
	      }
	      this.frameNext -= this.g.dt;
	    }
	  }, {
	    key: 'hitGroup',
	    value: function hitGroup(group) {
	      var g = this.g,
	          i = g.ents.length;
	      while (i--) {
	        if (g.ents[i] && g.ents[i].group === group && g.ents[i].id !== this.id && this.hit(g.ents[i]) && g.ents[i].dead === false) {
	          this.doDamage(g.ents[i]);
	          g.ents[i].receiveDamage(this);
	        }
	      }
	    }
	  }, {
	    key: 'hit',
	    value: function hit(o) {
	      var p1 = this;
	      var half = p1.h / 2;
	      var hh = o.name === 'hog' ? -6 : this.h;
	      hh = this.h;
	      return !(o.y + o.h < p1.y + half || o.y > p1.y + half / 2 || o.x + o.w < p1.x || o.x > p1.x + p1.w);
	    }
	  }, {
	    key: 'receiveDamage',
	    value: function receiveDamage(o) {}
	  }, {
	    key: 'doDamage',
	    value: function doDamage(o) {}
	  }, {
	    key: 'kill',
	    value: function kill() {
	      this.dead = this.remove = true;
	    }
	  }, {
	    key: 'mkImg',
	    value: function mkImg(name) {
	      if (!this.i) {
	        return;
	      }
	      var g = this.g;
	      this.i = g.draw.resize(g.imgs[name], this.scale);
	      this.w = this.i.width / this.frames;
	      this.h = this.i.height;
	      this.iHurt = g.draw.color(this.i, [190, 38, 51]);
	    }
	  }, {
	    key: 'changeAnim',
	    value: function changeAnim(name) {
	      if (this.anim && this.anim.name && this.anim.name === name) {
	        return;
	      }
	      this.anim = this.anims[name];
	      this.anim.name = name;
	      this.anim.counter = 0;
	      this.frame = this.anim.frames[0];
	      this.frameNext = this.anim.rate;
	    }
	  }]);

	  return Sprite;
	}();

	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Carrot = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Carrot = exports.Carrot = function (_Sprite) {
	  _inherits(Carrot, _Sprite);

	  function Carrot(g, opts) {
	    _classCallCheck(this, Carrot);

	    var _this = _possibleConstructorReturn(this, (Carrot.__proto__ || Object.getPrototypeOf(Carrot)).call(this, g, opts));

	    _this.group = 'carrot';
	    _this.speed = 200;
	    return _this;
	  }

	  _createClass(Carrot, [{
	    key: 'update',
	    value: function update(step) {
	      this.x -= this.speed * step;
	      this.y -= this.speed * step * 2;
	      if (this.y < 0) {
	        this.remove;
	      }
	    }
	  }]);

	  return Carrot;
	}(_sprite.Sprite);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Hog = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hog = exports.Hog = function (_Sprite) {
	  _inherits(Hog, _Sprite);

	  function Hog(g, opts) {
	    _classCallCheck(this, Hog);

	    opts.i = 'hog';
	    opts.frames = 2;
	    opts.scale = 3.5;

	    var _this = _possibleConstructorReturn(this, (Hog.__proto__ || Object.getPrototypeOf(Hog)).call(this, g, opts));

	    _this.reset();
	    _this.group = 'baddies';
	    _this.anims = {
	      run: { frames: [1, 2], rate: 0.045 }
	    };
	    _this.changeAnim('run');
	    return _this;
	  }

	  _createClass(Hog, [{
	    key: 'reset',
	    value: function reset() {
	      this.y = 0;
	      if (Math.random() > 0.5) {
	        this.x = 0;
	        this.dir = 1;
	        this.flip.x = 1;
	      } else {
	        this.x = this.g.w;
	        this.dir = -1;
	        this.flip.x = 0;
	      }
	      this.speed = this.g.H.rnd(100, 160);
	    }
	  }, {
	    key: 'update',
	    value: function update(step) {
	      _get(Hog.prototype.__proto__ || Object.getPrototypeOf(Hog.prototype), 'update', this).call(this, step);
	      if (this.x > this.g.w) {
	        this.dir = -1;
	        this.flip.x = 0;
	      }
	      if (this.x < -this.w) {
	        this.dir = 1;
	        this.flip.x = 1;
	      }
	      this.x += this.dir * step * this.speed;
	      this.y += step * this.p.speed;
	    }
	  }]);

	  return Hog;
	}(_sprite.Sprite);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Hornet = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hornet = exports.Hornet = function (_Sprite) {
	  _inherits(Hornet, _Sprite);

	  function Hornet(g, opts) {
	    _classCallCheck(this, Hornet);

	    opts.x = g.H.rnd(1, 8) * opts.p.map.tileDim;
	    opts.y = g.h + 20;
	    opts.frames = 1;
	    opts.scale = 4;
	    opts.i = 'hornet';

	    var _this = _possibleConstructorReturn(this, (Hornet.__proto__ || Object.getPrototypeOf(Hornet)).call(this, g, opts));

	    _this.speed = 220;
	    _this.group = 'baddies';
	    _this.shadow = g.draw.color(_this.i, g.options.pal[0]);
	    return _this;
	  }

	  _createClass(Hornet, [{
	    key: 'update',
	    value: function update(step) {
	      this.y -= this.speed * step;
	      if (this.y < -this.h) {
	        this.remove = true;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var g = this.g;
	      g.draw.ctx.globalAlpha = 0.3;
	      g.draw.img(this.shadow, this.x + 3, this.y + this.w / 2);
	      g.draw.ctx.globalAlpha = 1;
	      _get(Hornet.prototype.__proto__ || Object.getPrototypeOf(Hornet.prototype), 'render', this).call(this);
	    }
	  }]);

	  return Hornet;
	}(_sprite.Sprite);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bat = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bat = exports.Bat = function (_Sprite) {
	  _inherits(Bat, _Sprite);

	  function Bat(g, opts) {
	    _classCallCheck(this, Bat);

	    opts.frames = 2;
	    opts.scale = 4;
	    opts.x = g.H.rnd(1, 8) * opts.p.map.tileDim;
	    opts.y = -g.h;
	    opts.i = 'bat';

	    var _this = _possibleConstructorReturn(this, (Bat.__proto__ || Object.getPrototypeOf(Bat)).call(this, g, opts));

	    _this.speed = 220;
	    _this.group = 'baddies';
	    _this.shadow = g.draw.color(_this.i, g.options.pal[0]);
	    _this.anims = {
	      fly: { frames: [1, 2], rate: 0.01 }
	    };
	    _this.changeAnim('fly');
	    _this.range = g.H.rnd(1, 3) / 1000;
	    return _this;
	  }

	  _createClass(Bat, [{
	    key: 'update',
	    value: function update(step) {
	      _get(Bat.prototype.__proto__ || Object.getPrototypeOf(Bat.prototype), 'update', this).call(this, step);
	      this.y += this.speed * step;
	      this.x += Math.sin(new Date().getTime() * this.range);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var g = this.g;
	      g.draw.ctx.globalAlpha = 0.2;
	      g.draw.ctx.drawImage(this.shadow, this.frame * this.w - this.w, 0, this.w, this.h, ~~this.x + 3, ~~this.y + this.h / 2, this.w, this.h);
	      g.draw.ctx.globalAlpha = 1;
	      _get(Bat.prototype.__proto__ || Object.getPrototypeOf(Bat.prototype), 'render', this).call(this);
	    }
	  }]);

	  return Bat;
	}(_sprite.Sprite);

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Text = exports.Text = function () {
	  function Text(g, o) {
	    _classCallCheck(this, Text);

	    o.group = 'text';
	    o.vy = o.vy || -10;
	    o.vx = o.vx || 0;
	    o.w = 10;
	    o.w = 10;
	    o.o = 1;
	    o.alpha = 1;
	    o.scale = o.scale || 4;
	    o.col = o.col || 6;
	    o.accel = o.accel || 0.5;
	    o.fade = o.fade || 0.01;
	    for (var n in o) {
	      this[n] = o[n];
	    }
	    this.g = g;
	    this.p = g.H.mkFont(g, o.scale, o.col);
	  }

	  _createClass(Text, [{
	    key: 'update',
	    value: function update(step) {
	      if (this.y < 0 || this.alpha < 0.1) {
	        this.remove = true;
	      }

	      this.vy -= this.accel;
	      this.alpha -= this.fade;

	      if (this.vx) {
	        this.x += this.vx * step;
	      }
	      this.y += this.vy * step;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var d = this.g.draw;
	      if (this.text) {
	        d.ctx.globalAlpha = this.alpha;
	        d.text(this.text, this.p, this.x, this.y);
	        d.ctx.globalAlpha = 1;
	      } else if (this.o) {
	        d.ctx.drawImage(this.i, this.x, this.y);
	      }
	    }
	  }]);

	  return Text;
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Boom = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Boom = exports.Boom = function (_Sprite) {
	  _inherits(Boom, _Sprite);

	  function Boom(g, o) {
	    _classCallCheck(this, Boom);

	    o.col = o.col || 6;
	    o.i = o.i || 'ouch';

	    var _this = _possibleConstructorReturn(this, (Boom.__proto__ || Object.getPrototypeOf(Boom)).call(this, g, o));

	    _this.startX = o.x;
	    _this.startY = o.y;
	    _this.group = 'na';
	    _this.magnitude = o.magnitude || 64;
	    _this.factor = 4;

	    return _this;
	  }

	  _createClass(Boom, [{
	    key: 'update',
	    value: function update(step) {
	      var g = this.g;

	      this.scale += this.factor;
	      if (this.scale > this.magnitude && this.factor > 0) {
	        this.factor *= -1;
	      }
	      if (this.scale <= 1) {
	        this.remove = true;
	      }

	      this.mkImg(this.o.i);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var x = this.startX - this.w / 2,
	          y = this.y - this.h / 2,
	          g = this.g;

	      if (this.opacity < 1) {
	        g.draw.ctx.globalAlpha = this.opacity;
	      }
	      g.draw.ctx.drawImage(this.i, x, y);

	      if (this.opacity < 1) {
	        g.draw.ctx.globalAlpha = 1;
	      }
	    }
	  }]);

	  return Boom;
	}(_sprite.Sprite);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Bunny = undefined;

	var _sprite = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bunny = exports.Bunny = function (_Sprite) {
	  _inherits(Bunny, _Sprite);

	  function Bunny(g, opts) {
	    _classCallCheck(this, Bunny);

	    opts.i = 'p1';
	    opts.frames = 3;
	    opts.scale = 8;

	    var _this = _possibleConstructorReturn(this, (Bunny.__proto__ || Object.getPrototypeOf(Bunny)).call(this, g, opts));

	    _this.anims = {
	      blink: { frames: [1, 2, 1, 1, 1, 1], rate: 0.2 }
	    };
	    _this.changeAnim('blink');
	    return _this;
	  }

	  return Bunny;
	}(_sprite.Sprite);

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fade = exports.Fade = function () {
	  function Fade(opts) {
	    _classCallCheck(this, Fade);

	    var g = opts.g;
	    this.g = opts.g;
	    this.col = g.options.pal[opts.col];
	    this.y = opts.y;
	    this.startY = opts.y;
	    this.targetY = opts.targetY;
	    this.done = false;
	    this.changeTo = opts.changeTo || false;
	  }

	  _createClass(Fade, [{
	    key: "update",
	    value: function update() {
	      var g = this.g;
	      var time = 250;
	      var dist = this.targetY - this.y;
	      this.y = ~~g.H.tween(33, this.y, dist, time);

	      if (this.y > this.targetY - 10 || this.y === this.targetY) {
	        this.done = true;
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var g = this.g;
	      g.draw.rect(0, this.startY, g.w, this.y, this.col);
	    }
	  }]);

	  return Fade;
	}();

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	// https://github.com/foumart/JS.13kGames by @foumartgames
	var SoundFX = function () {

	  var data = {};
	  var ua = navigator.userAgent.toLowerCase();

	  var ios = /ipad|iphone|ipod/.test(ua);

	  function add(d) {
	    data = d;
	  }

	  function play(id) {
	    if (ios) {
	      return;
	    }
	    playSound(data[id]);
	  }

	  function getMasterVolume() {
	    return 1;
	  }
	  var soundContext = new (window.AudioContext || window.webkitAudioContext)();
	  // sine is the oscillator's default, but we use square as default
	  var oscTypes = ['square', 'sawtooth', 'triangle', 'sine'];

	  // https://codereview.stackexchange.com/questions/47889/alternative-to-setinterval-and-settimeout
	  function _interval(callback, delay) {
	    var now = Date.now,
	        rAF = requestAnimationFrame,
	        start = now(),
	        stop,
	        intervalFunc = function intervalFunc() {
	      now() - start < delay || (start += delay, callback());
	      stop || rAF(intervalFunc);
	    };
	    rAF(intervalFunc);
	    return {
	      clear: function clear() {
	        stop = 1;
	      }
	    };
	  }

	  function playSound(d) {
	    var _d = _slicedToArray(d, 6),
	        _freq = _d[0],
	        _incr = _d[1],
	        _delay = _d[2],
	        _times = _d[3],
	        _vol = _d[4],
	        _d$ = _d[5],
	        _type = _d$ === undefined ? 0 : _d$;

	    var osc = soundContext.createOscillator(); // instantiate oscillator
	    _type = _type === undefined ? 0 : _type;
	    osc.frequency.value = _freq;
	    osc.type = oscTypes[_type];

	    var modulationGain = soundContext.createGain(); // instantiate modulation for sound volume control
	    modulationGain.gain.value = 0;

	    osc.connect(modulationGain);
	    modulationGain.connect(soundContext.destination);
	    osc.start();

	    var i = 0;
	    var interval = _interval(playTune, _delay);

	    function playTune() {
	      osc.frequency.value = _freq + _incr * i;
	      modulationGain.gain.value = (1 - i / _times) * _vol * getMasterVolume();
	      i += 1;
	      if (i > _times) {
	        interval.clear();
	        osc.stop();
	      }
	    }
	  }
	  return {
	    add: add,
	    play: play
	  };
	}();

	exports.default = SoundFX;

/***/ }
/******/ ]);