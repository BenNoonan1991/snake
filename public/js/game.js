
;(function() {
	var BLOCK_SIZE = 10;

	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };
		this.size = { x: screen.canvas.width, y: screen.canvas.height };
    this.center = { x: this.size.x / 2, y: this.size.y / 2 };
		this.bodies = createWalls(this).concat(new HeadBlock(this));

		this.bodies = [new Snake(this, gameSize)];

		var self = this;
		var tick = function() {
			self.update();
			// self.wallsDraw(screen, gameSize);
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

		draw: function(screen, gameSize){
			screen.clearRect(0, 0, gameSize.x, gameSize.y);
			for (var i = 0; i < this.bodies.length; i++) {
				drawRect(screen, this.bodies[i]);
			}
		}

	};
	//
	// Game.prototype= {
	//
	// 	update: function() {
	// 		for (var i = 0; i < this.bodies.length; i++) {
	// 			this.bodies[i].update();
	// 		}
	// 	},
	// 	wallsDraw: function(screen, gameSize){
	// 		screen.clearRect(0, 0, gameSize.x, gameSize.y);
	// 		for (var i = 0; i < this.walls.length; i++) {
	// 			drawRect(screen, this.walls[i]);
	// 		}
	// 	}
	//
	// };

	var Snake = function(game, gameSize) {
		this.game = game;
		this.size = { x:15, y:15 };
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

	var HeadBlock = function(game) {
    this.game = game;
    this.center = { x: this.game.center.x, y: this.game.center.y };
    this.direction = { x: 1, y: 0 };
    this.size = { x: BLOCK_SIZE, y: BLOCK_SIZE };
    this.blocks = [];

    this.keyboarder = new Keyboarder();
    this.lastMove = 0;

    this.addBlock = false;
  };

	HeadBlock.prototype = {
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
    }
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

	window.onload = function() {
		new Game("screen");
	};
})();
