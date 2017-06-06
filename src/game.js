

var canvas = document.getElementById("myCanvas"),
	ctx = canvas.getContext("2d"),
		//Full width and height
	w = window.innerWidth,
	h = window.innerHeight;
// 	// canvas.height = h;
// 	var drawSnake = function(snakeToDraw) {
//    var drawableSnake = { color: "green", pixels: snakeToDraw };
//    var drawableObjects = [drawableSnake];
//   CHUNK.draw(drawableObjects);
// };

// var snake = [{ top: 0, left: 0}];
// CHUNK.executeNTimesPerSecond(advanceGame, 1);

var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10,10,50,50);
