import assert from 'assert';
import Data from '../src/data/base';


describe('Data', function() {
  it('should be an object', function() {
    assert.equal(typeof Data, 'object');
  });
  it('should have a title property', function() {
    assert.ok(Data.hasOwnProperty('title'));
  });
  it('should have an images property', function() {
    assert.ok(Data.hasOwnProperty('i'));
  });
  it('images should be an array', function() {
    assert.equal(typeof Data.i, 'object');
  });
});
