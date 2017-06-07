;(function() {

	var BLOCK_SIZE = 10;

	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		this.size = { x: screen.canvas.width, y: screen.canvas.height };
    this.center = { x: this.size.x / 2, y: this.size.y / 2 };

		this.bodies = createWalls(this).concat(new Snake(this, this.size));
    this.addFood();

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen);
			requestAnimationFrame(tick);
		};
		tick();
	};

	Game.prototype= {
		update: function() {
			for (var i = 0; i < this.bodies.length; i++) {
				if(this.bodies[i].update !== undefined) {
					this.bodies[i].update();
				}
			}
		},

		draw: function(screen) {
			screen.clearRect(0, 0, this.size.x, this.size.y);
			for (var i = 0; i < this.bodies.length; i++) {
				this.bodies[i].draw(screen);
			}
		},

		addBody: function(body) {
			this.bodies.push(body);
		},

		addFood: function() {
			this.addBody(new Food(this));
		},

    randomSquare: function() {
      return {
        x: Math.floor(this.size.x / BLOCK_SIZE * Math.random()) * BLOCK_SIZE + BLOCK_SIZE / 2,
        y: Math.floor(this.size.y / BLOCK_SIZE * Math.random()) * BLOCK_SIZE + BLOCK_SIZE / 2
      };
    },

		isSquareFree: function(center) {
			return this.bodies.filter(function(block) {
				return isColliding(block, { center: center, size: { x: BLOCK_SIZE, y: BLOCK_SIZE }});
			}).length === 0;
		}

	};

	var Snake = function(game) {
		this.game = game;
		this.center = { x: this.game.center.x, y: this.game.center.y };
		this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
		this.direction = { x: 1, y: 0};
		this.blocks = [];

		this.keyboarder = new Keyboarder();
		this.lastMove = 0;
	};

	Snake.prototype = {
		update: function() {
			this.handleKeyboard();

			var now = new Date().getTime();
			if (now > this.lastMove + 100) {
				this.move();
				this.lastMove = now;
			}
		},

    draw: function(screen) {
      drawRect(screen, this, "black");
    },

		move: function() {
			var prevBlockCenter = { x: this.center.x, y: this.center.y};
			this.center.x += this.direction.x * BLOCK_SIZE;
			this.center.y += this.direction.y * BLOCK_SIZE;

			// for (var i = 0; i < this.blocks.length; i++);
			// var oldCenter = this.blocks[i].center;
			// this.blocks[i].center = { x: prevBlockCenter.x, y: prevBlockCenter.y};
			// prevBlockCenter = oldCenter;
		},

		handleKeyboard: function() {
			if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.direction.x !== 1) {
				this.direction.x = -1;
				this.direction.y= 0;
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.direction.x !== -1) {
				this.direction.y = 1;
				this.direction.x = 0;
			}

			if (this.keyboarder.isDown(this.keyboarder.KEYS.UP) && this.direction.y !== 1) {
				this.direction.x = -1;
				this.direction.y= 0;
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN) && this.direction.y !== -1) {
				this.direction.y = 1;
				this.direction.x = 0;
			}
		}
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
			drawRect(screen, this, "red");
		}
	};

	var drawRect = function(screen, body) {
		screen.fillRect(body.center.x - body.size.x / 2,
										body.center.y - body.size.y / 2,
										body.size.x, body.size.y);
	};

	var isColliding = function() {

	};

	var Keyboarder = function() {
		var keyState = {};

		window.addEventListener('keydown', function(e) {
			keyState[e.keyCode] = true;
		});

		window.addEventListener('keyup', function(e) {
			keyState[e.keyCode] = false;
		});

		this.isDown = function(keyCode) {
			return keyState[keyCode] === true;
		};

		this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };
	};

	var WallBlock = function(game, center, size) {
    this.game = game;
    this.center = center;
    this.size = size;
  };

	WallBlock.prototype = {
    draw: function(screen) {
      drawRect(screen, this, "black");
    }
  };

	var BodyBlock = function(game, center) {
    this.game = game;
    this.center = center;
    this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
  };

  BodyBlock.prototype = {
    draw: function(screen) {
      drawRect(screen, this, "black");
    }
  };

	var createWalls = function(game) {
    var walls = [];
    walls.push(new WallBlock(game,
                             { x: game.center.x, y: BLOCK_SIZE / 2 },
                             { x: game.size.x, y: BLOCK_SIZE })); // top

    walls.push(new WallBlock(game,
                             { x: game.size.x - BLOCK_SIZE / 2, y: game.center.y },
                             { x: BLOCK_SIZE, y: game.size.y - BLOCK_SIZE * 2 })); // right

    walls.push(new WallBlock(game,
                             { x: game.center.x, y: game.size.y - BLOCK_SIZE / 2 },
                             { x: game.size.x, y: BLOCK_SIZE })); // bottom

    walls.push(new WallBlock(game,
                             { x: BLOCK_SIZE / 2, y: game.center.y },
                             { x: BLOCK_SIZE, y: game.size.y - BLOCK_SIZE * 2 })); // left
    return walls;
  };

	var drawRect = function(screen, body, color) {
    screen.fillStyle = color;
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
                    body.size.x, body.size.y);
  };

	window.onload = function() {
		new Game("screen");
	};
})();
