/*** SPRITE ***/
var Sprite = function (sprite) {
    this.sprite = 'images/' + sprite;
};
Sprite.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*** ENEMY ***/
var Enemy = function (sprite) {
    Sprite.call(this, sprite);
};
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

/*** PLAYER ***/
var Player = function (sprite) {
    Sprite.call(this, sprite);

    var positionInit = {x: 200, y: 386};
    this.x = positionInit.x;
    this.y = positionInit.y;
};
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    //
};
Player.prototype.handleInput = function () {
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
var allEnemies = [enemy1];

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
