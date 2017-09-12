export default function Loader(images) {

  this.images = images;
  this.loaded = [];
  this.loadedImgs = 0;
  this.totalImgs = Object.keys(images).length;

  this.start = function() {
    const loader = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.loadImages(this.images);
    });

    return loader;
  };

  this.loadImages = function(i) {
    const append = 'data:image/gif;base64,';

    for (let n in i) {
      if (i.hasOwnProperty(n)) {
        this.loaded[n] = new Image();
        this.loaded[n].onload = this.checkLoaded();
        this.loaded[n].src = append + i[n];
      }
    }
  };

  this.checkLoaded = function() {
    this.loadedImgs += 1;

    if (this.loadedImgs === this.totalImgs) {
      setTimeout( () => this.resolve(this.loaded), 500 );
    }
  };

  this.makeFonts = function() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
  }



}
