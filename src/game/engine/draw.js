export default function Draw(c, ctx) {

  this.c = c; this.ctx = ctx; 
  this.clear = function(col = '#000', o = 1) {
    if (col.length === 3) {
      let code = col.join(',') + ',' + o
      col = `rgba(${code})`;
    }
    this.ctx.fillStyle = col;
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
  };

  this.circle = function(x, y, r, col, o = 1) {
    if (typeof col === 'object') {
      col = `rgba(${col[0]}, ${col[1]}, ${col[2]},${o})`;
    }
    this.ctx.fillStyle = col;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI*2, true); 
    this.ctx.closePath();
    this.ctx.fill();
  };

  this.rect = function(x, y, w, h, col, o = 1) {
    if (typeof col === 'object') {
      col = `rgba(${col[0]}, ${col[1]}, ${col[2]},${o})`;
    }
    this.ctx.fillStyle = col;
    this.ctx.fillRect(x, y, w, h, col);
  };

  this.img = function(i, x, y, scale = false) {
    if (scale) {
      i = this.resize(i, scale);
    }
    this.ctx.drawImage(i, ~~x, ~~y);
  };

  this.flip = function(i, flipH, flipV) {

    let c = this.mkCanvas(i.width, i.height),
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

  },

  this.resize = function(i, factor) {
    let c = this.mkCanvas(i.width * factor, i.height * factor),
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

  this.color = function(i, col, returnCanvas = false) {
    const c = this.mkCanvas(i.width, i.height),
          ctx = c.getContext('2d');
    let p = 0,
        image = new Image(),
        imageData;

    ctx.drawImage(i, 0, 0);
    imageData = ctx.getImageData(0, 0, i.width, i.height);

    for(p = 0;  p < imageData.data.length; p+=4) {
      imageData.data[p + 0] = col[0];
      imageData.data[p + 1] = col[1];
      imageData.data[p + 2] = col[2];
    }

    ctx.putImageData(imageData, 0, 0);
    image.src = c.toDataURL();
    return returnCanvas ? c : image;
  };

  this.mkCanvas = function(w, h) {

    var c = document.createElement('canvas'),
      ctx = c.getContext('2d');

    c.width = w;
    c.height = h;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    return c;
  };

  this.textWidth = function(s, f) {
    return ( s.length * (3 * f.scale) ) +
      ( s.length * (1 * f.scale) );
  };

  this.text = function(s,f,x,y) {
    let i = 0,
      ctx = this.ctx,
      firstChar = 65,
      offset = 0,
      w = 3 * f.scale,
      h = 5 * f.scale,
      spacing = 1 * f.scale,
      sW =  this.textWidth(s, f),
      charPos = 0;

    if (typeof(s) === 'number' || s[0] === '0') {
      s += '';
      offset = 43;
    }
    x = x || (this.c.width - sW) / 2;

    for (i = 0; i < s.length; i += 1) {
      charPos = ( ( s.charCodeAt(i) - firstChar ) + offset ) * (w + spacing);
      if (charPos > -1) {
        ctx.drawImage(f, 
          charPos, 0, 
          w, h,
          ~~x, ~~y,
          w, h);
      }
      x += w + spacing;
    }
  };
}
