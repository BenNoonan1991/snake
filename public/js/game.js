// var canvas = document.getElementById("myCanvas"),
// 	ctx = canvas.getContext("2d"),
// 		//Full width and height
// 	w = window.innerWidth,
// 	h = window.innerHeight;
// 	// canvas.height = h;
// 	// canvas.width = w;
//
//
// ctx.font = "30px Arial";
// ctx.strokeText("Hello World",10,50);
//
// 	var drawSnake = function(snakeToDraw) {
//     var drawableSnake = { color: "green", pixels: snakeToDraw };
//     var drawableObjects = [drawableSnake];
//     CHUNK.draw(drawableObjects);
//   }
//   var snake = [{ top: 0, left: 0}];
//   drawSnake(snake)
;(function() {
	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };

		this.bodies = [new Snake(this, gameSize)];

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		};
		tick();
	};
	Game.prototype= {
		update: function(){
			console.log("hi")
		},

		draw: function(screen, gameSize){
			screen.fillRect(30, 30, 40, 40);
		}
	};

	var Snake = function(game, gameSize) {
		this.game = game;
		this.size = { x:15, y:15 };
		this.center = { x:gameSize.x / 2, y:gameSize.y / 2 };
	};

	Snake.prototype = {
		update: function() {

		}
	};

};

	window.onload = function() {
		new Game("screen");
	};
})();
