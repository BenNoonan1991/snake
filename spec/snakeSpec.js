describe('Snake', function() {
  var snake;

  beforeEach(function() {
    snake = new Snake();
  });

  it('has a default size of 10', function(){
    expect(snake.defaultSnakeSize()).toEqual(10);
  });

  it('has a default score of 0', function() {
    expect(snake.defaultScore()).toEqual(0);
  });

  it('defaults to an empty array', function() {
    expect(snake.size).toEqual([]);
  })
});
