/*** SPRITE ***/
var Sprite = function (sprite) {
    this.sprite = 'images/' + sprite;
    this.spCoor = {top: 0, right: 0, bottom: 0, left: 0};
};
Sprite.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Sprite.prototype.initStartPosition = function () {
    if(this.constructor === Enemy) {
        var rowNum = Math.floor(Math.random() * 3);
        this.x = -101;
        this.y = [62, 145, 227][rowNum];
    } else if (this.constructor === Player) {
        this.x = 200;
        this.y = 386;
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
function makeEnemy(n) {
    var a = [],
        n = n || 3;
    for(var i = 1; i <= n; i++) {
        window['enemy' + i] = new Enemy("enemy-bug.png");
        a.push(window['enemy' + i]);
    }
    return a;
}

var allEnemies = makeEnemy();               // adding/init custom number of enemies
var player = new Player("char-boy.png");    // init a Player

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
        if( !(allEnemies[i].pos.left > player.pos.right ||
              allEnemies[i].pos.right - 40 < player.pos.left ||
              allEnemies[i].pos.top > player.pos.bottom ||
              allEnemies[i].pos.bottom < player.pos.top) ) {
                  player.initStartPosition();
              }
    }
}
