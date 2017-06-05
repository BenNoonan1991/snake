describe('Canvas', function() {
  var canvas;

  beforeEach(function() {
    canvas = new Canvas();
  });

  it('is has variable that has an element set to id my-canvas', function() {
    expect(element(by.id('my-canvas')).isPresent()).toBe(true);
  })

});
