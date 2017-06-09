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
  //
  // it('has a default score of 0', function() {
  //   expect(snake.defaultScore()).toEqual(0);
  // });
  //
  // it('defaults to an empty array', function() {
  //   expect(snake.size).toEqual([]);
  // })
});
