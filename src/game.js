var canvas = document.getElementById("myCanvas"),
	ctx = canvas.getContext("2d"),
		//Full width and height
	w = window.innerWidth,
	h = window.innerHeight;
	// canvas.height = h;
	// canvas.width = w;


ctx.font = "30px Arial";
ctx.strokeText("Hello World",10,50);

	var drawSnake = function(snakeToDraw) {
    var drawableSnake = { color: "green", pixels: snakeToDraw };
    var drawableObjects = [drawableSnake];
    CHUNK.draw(drawableObjects);
  }
  var snake = [{ top: 0, left: 0}];
  drawSnake(snake)
