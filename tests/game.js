import assert from 'assert';
import Game from '../src/engine/game';

describe('Game', function() {
  it('should be a function', function() {
    assert.equal(typeof Game, 'function');
  });
});
