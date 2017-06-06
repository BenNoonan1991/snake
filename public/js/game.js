var canvas = document.getElementById("myCanvas"),
	context = canvas.getContext("2d"),
	w = window.innerWidth,
	h = window.innerHeight;

	console.log(1)

var grd = context.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
context.fillStyle = grd;
context.fillRect(10,10,50,50);
//
// 	 var drawSnake = function(snakeToDraw) {
//    var drawableSnake = { color: "green", pixels: snakeToDraw };
//    var drawableObjects = [drawableSnake];
//    CHUNK.draw(drawableObjects);
// };
//
// var snake = [{ top: 0, left: 0}];
// CHUNK.executeNTimesPerSecond(advanceGame, 1);
//
// var grd = context.createLinearGradient(0,0,200,0);
// grd.addColorStop(0,"red");
// grd.addColorStop(1,"white");
// context.fillStyle = grd;
// context.fillRect(10,10,50,50);
