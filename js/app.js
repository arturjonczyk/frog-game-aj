/*** SPRITE ***/
var Sprite = function(sprite, width, height) {
    this.sprite = 'images/' + sprite;
    this.spritePoint = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    this.width = width;
    this.height = height;

};
Sprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Sprite.prototype.updateSpriteCoor = function() {
    this.spritePoint.top = this.y;
    this.spritePoint.bottom = this.y + this.height; // 101 height of sprite
    this.spritePoint.right = this.x + this.width;
    this.spritePoint.left = this.x;
};
Sprite.prototype.initStartPosition = function() {
    if (this.constructor === Enemy) {
        var rowNum = Math.floor(Math.random() * 3);
        this.x = -this.width;
        this.y = [62, 145, 227][rowNum];
    } else if (this.constructor === Player) {
        this.x = 200;
        this.y = 386;
    }
};

/*** ENEMY ***/
var Enemy = function(sprite, width, height) {
    Sprite.call(this, sprite, width, height);

    this.initStartPosition();
    this.enemySpeed = this.randomSpeed();
};
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.randomSpeed = function(max, min) {
    max = max || 30;
    min = min || 10;
    return Math.floor(Math.random() * (max - min)) + min;
};
Enemy.prototype.update = function(dt) {
    if (this.x > 500) {
        this.initStartPosition();
        this.enemySpeed = this.randomSpeed();
    } else {
        this.x += this.enemySpeed * dt;
    }
    this.updateSpriteCoor();
};

/*** PLAYER ***/
var Player = function(sprite, width, height) {
    Sprite.call(this, sprite, width, height);

    this.initStartPosition();
};
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.y < 0) {
        // add one point
        console.log("One Point for Player Artur");
        // return to initial position;
        this.initStartPosition();
    }
    this.updateSpriteCoor();
};
Player.prototype.handleInput = function(direction) {
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
var enemyImage = "enemy-bug.png",
    enemyWidth = 101,
    enemyHeight = 171;

function makeEnemy(n, image, width, height) {
    var a = [];
    for (var i = 1; i <= n; i++) {
        window['enemy' + i] = new Enemy(image, width, height);
        a.push(window['enemy' + i]);
    }
    return a;
}

var allEnemies = makeEnemy(3, enemyImage, enemyWidth, enemyHeight); // adding/init custom number of enemies - default = 3

var playerImage = "char-boy.png",
    playerWidth = 101,
    playerHeight = 171;
var player = new Player(playerImage, playerWidth, playerHeight); // init a Player

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

function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (!(allEnemies[i].spritePoint.left + 15 > player.spritePoint.right - 15 ||
                allEnemies[i].spritePoint.right - 15 < player.spritePoint.left + 15 ||
                allEnemies[i].spritePoint.top + 50 > player.spritePoint.bottom - 50 ||
                allEnemies[i].spritePoint.bottom - 50 < player.spritePoint.top + 50)) {
            player.initStartPosition();
        }
    }
}
