describe('Canvas', function() {
  var canvas;

  beforeEach(function() {
    canvas = new Canvas();
  });

  it('has a default height of 400',function() {
    expect(canvas._height).toEqual(400);
  });

  it('has a default width of 400',function() {
    expect(canvas._width).toEqual(400);
  });
});
