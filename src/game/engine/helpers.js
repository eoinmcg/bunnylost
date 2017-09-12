export default {

  timeStamp: function() {
    return window.performance && window.performance.now ?
      window.performance.now() : new Date().getTime();
  },

  rnd: function (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  rndArray: function(a) {
      return a[~~(Math.random() * a.length)]; 
  },

  mkCanvas: function(w, h) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    
    c.width = w;
    c.height = h;

		ctx.mozImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

    return c;
  },

  mkFont: function(g, size, col) {
    let font = g.draw.color(g.imgs['font_'+size], g.options.pal[col], true);
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
  tween: function(t, b, c, d) {
    return c*t/d + b;
  }

};
