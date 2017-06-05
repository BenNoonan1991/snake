describe('Canvas', function() {
  var canvas;

  beforeEach(function() {
    canvas = new Canvas();
  });

  // it('is has variable that has an element set to id my-canvas', function() {
  //   var canvasElement = document.createElement('span');
  //   document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(canvasElement);
  //   expect(document.getElementById("myCanvas").innerHTML).toEqual('myCanvas');
  // });

  it('has a default  height of 350',function() {
    expect(canvas._height).toEqual(350);
  });

  it('has a default  width of 350',function() {
    expect(canvas._width).toEqual(350);
  });
});
