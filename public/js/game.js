;(function() {
  var BLOCK_SIZE = 10;

	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };

		this.bodies = [new Snake(this, gameSize), this.addFood()];

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		};
		tick();
	};
	Game.prototype= {
		update: function() {
			for (var i = 0; i < this.bodies.length; i++) {
				this.bodies[i].update();
			}
		},

		draw: function(screen, gameSize) {
			screen.clearRect(0, 0, gameSize.x, gameSize.y);
			for (var i = 0; i < this.bodies.length; i++) {
				drawRect(screen, this.bodies[i]);
			}
		},

		addBody: function(body) {
			this.bodies.push(body);
		},

		addFood: function() {
			this.addBody(new Food(this));
		}
	};

	var Snake = function(game, gameSize) {
		this.game = game;
		this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
		this.center = { x:gameSize.x / 2, y:gameSize.y / 2 };
		this.keyboarder = new Keyboarder();
	};

	Snake.prototype = {
		update: function() {
			if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
				this.center.x -= 2;
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
				this.center.x += 2;
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
				this.center.y -= 2;
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
				this.center.y += 2;
			}

		},
	};

	var Food = function(game, GameSize) {
		this.game = game;

		while(this.center === undefined) {
			var center = this.game.randomSquare();
			if (this.game.isSquareFree(center)) {
				this.center = center;
			}
		}

		this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
	};

	Food.prototype = {
		draw: function(screen) {
			drawRect(screen, this, "green")
		}
	};

	var drawRect = function(screen, body) {
		screen.fillRect(body.center.x - body.size.x / 2,
										body.center.y - body.size.y / 2,
										body.size.x, body.size.y);
	};

	var Keyboarder = function() {
		var keyState = {};

		window.onkeydown = function(e) {
			keyState[e.keyCode] = true;
		};

		window.onkeyup = function(e) {
			keyState[e.keyCode] = false;
		};

		this.isDown = function(keyCode) {
			return keyState[keyCode] === true;
		};

		this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };
	};

	window.onload = function() {
		new Game("screen");
	};
})();
