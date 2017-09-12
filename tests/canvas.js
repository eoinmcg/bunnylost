import assert from 'assert';
import Canvas from '../src/engine/canvas';

let c = new Canvas(320, 480);

describe('Canvas', function() {
  it('should be an function', function() {
    assert.equal(typeof Canvas, 'function');
  });
});
