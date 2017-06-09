'use strict'

describe('Snake', function() {
  // var game;
  var snake;
  beforeEach(function() {
    // game = new Game();
    snake = new Snake();
  });

  it('has a default size of 10', function(){
    expect(snake.blocks).toEqual([]);
  });

});
