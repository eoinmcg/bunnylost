var fs = require('fs');

var files = fs.readdirSync('a'),
  ext = '.gif',
  re = /\"/gi,
  encoded = {},
  output = 'export default ',
  totalImages = 0,
  n;

var encode = function(img) {

  var i =  fs.readFileSync(img);
  i = i.toString('base64');
  console.log(i);

  return i;
};

for (n in files) {
  if (files[n].indexOf(ext) !== -1) {
    encoded[files[n].replace(ext, '')] = encode('a/'+files[n]);
    totalImages += 1;
  } 

}

encoded = JSON.stringify(encoded);
encoded = encoded.replace(re, "'");
output += encoded + ';';

console.log('IMAGES ENCODED');
console.log('BYTES: ' + output.length);
console.log('IMAGES: ' + totalImages);

fs.writeFileSync('src/game/data/images.js', output);
