/*** SPRITE ***/
var Sprite = function (sprite) {
    this.sprite = 'images/' + sprite;
    this.spCoor = {top: 0, right: 0, bottom: 0, left: 0};
};
Sprite.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
Sprite.prototype.initStartPosition = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
};
/*** ENEMY ***/
var Enemy = function (sprite) {
    Sprite.call(this, sprite);

    this.initStartPosition();
    this.enemySpeed = this.randomSpeed();
    this.pos = {};
};
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.initStartPosition = function () {
    var rowNum = Math.floor(Math.random() * 3);
    this.x = -101;
    this.y = [62, 145, 227][rowNum];
};
Enemy.prototype.randomSpeed = function () {
    return Math.floor(Math.random() * (30 - 10)) + 10;
};
Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.initStartPosition();
        this.enemySpeed = this.randomSpeed();
    } else {
        this.x += this.enemySpeed * dt;
    }
    this.pos.top = this.y;
    this.pos.bottom = this.y + 69; // 101 height of sprite
    this.pos.right = this.x + 101;
    this.pos.left = this.x;
};

/*** PLAYER ***/
var Player = function (sprite) {
    Sprite.call(this, sprite);

    this.initStartPosition();

    this.pos = {
        "top": 0,
        "bottom": 0,
        "right": 0,
        "left": 0
    };
};
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.initStartPosition = function () {
    this.x = 200;
    this.y = 386;
};
Player.prototype.update = function () {
    if (this.y < 0) {
        // add one point
        console.log("One Point for Player Artur");
        // return to initial position;
        this.initStartPosition();
    }
    this.pos.top = this.y;
    this.pos.bottom = this.y + 78; // 101 height of sprite
    this.pos.right = this.x + 67;
    this.pos.left = this.x;
};
Player.prototype.handleInput = function (direction) {
    if (direction === "up" && this.y > 0) {
        this.y -= 83;
    } else if (direction === "down" && this.y < 363) {
        this.y += 83;
    } else if (direction === "right" && this.x < 400) {
        this.x += 101;
    } else if (direction === "left" && this.x > 0) {
        this.x -= 101;
    }
};

/*** Initiation Part ***/
var enemy1 = new Enemy("enemy-bug.png");
var enemy2 = new Enemy("enemy-bug.png");
var enemy3 = new Enemy("enemy-bug.png");
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player("char-boy.png");

/*** Utility function ***/


/*** EVENT LISTENER ***/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function checkCollisions(p, e) {
    return !(e.pos.left > p.pos.right ||
        e.pos.right - 40 < p.pos.left ||
        e.pos.top > p.pos.bottom ||
        e.pos.bottom < p.pos.top);
}
