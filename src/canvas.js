function Canvas() {
    this._width = 350;
    this._height = 350;
}


Canvas.prototype.displayCanvas = function() {
  var mycanvas = document.getElementById('myCanvas');
  var ctx = mycanvas.getContext('2d');
};
