/*****************************************************/
/******************  SPRITE CLASS   ******************/
/*****************************************************/
// Every Sprite has image, and dimensions of the image - width/height.
// spritePoint we will use to update four image corners of our object,
// we will use this dimensions with collision detection function.
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

/******************  SPRITE PROTOTYPE   ******************/
// Render image of the object.
Sprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update position of the image/sprite object - for the collision purpose.
Sprite.prototype.updateSpriteCorners = function() {
    this.spritePoint.top = this.y;
    this.spritePoint.bottom = this.y + this.height;
    this.spritePoint.right = this.x + this.width;
    this.spritePoint.left = this.x;
};

// This method init the starting position of the object,
// based of the object's constructor.
Sprite.prototype.initStartPosition = function() {
    if (this.constructor === Vehicle) {
        var rowNum = Math.floor(Math.random() * 3);
        this.x = -this.width;
        this.y = [62, 145, 227][rowNum];
    } else if (this.constructor === Player) {
        this.x = 200;
        this.y = 386;
    }
};

/*****************************************************/
/******************  VEHICLE CLASS   ******************/
/*****************************************************/
// Vehicle Class based on Sprite Class.
var Vehicle = function(sprite, width, height) {
    Sprite.call(this, sprite, width, height);

    this.initStartPosition(); // initialize the starting position.
    this.vehicleSpeed = this.randomSpeed(); // initialize random speed of vehicle object
};

/******************  VEHICLE PROTOTYPE   ******************/
Vehicle.prototype = Object.create(Sprite.prototype); // Inherit from Sprite methods.
Vehicle.prototype.constructor = Vehicle; // Update the constructor object

// Random Speed init. based of max and min values.
Vehicle.prototype.randomSpeed = function(max, min) {
    max = max || 400; // default value of max. speed
    min = min || 150; // default value of min. speed
    return Math.floor(Math.random() * (max - min)) + min; // return the random speed of the vehicle
};

// Updating position of the vehicle object
Vehicle.prototype.update = function(dt) {
    if (this.x > 500) { // if vehicle reached end of the board
        this.initStartPosition(); // start at the beginning of the board
        this.vehicleSpeed = this.randomSpeed(); // change speed (random speed)
    } else {
        this.x += this.vehicleSpeed * dt; // move forward
    }
    this.updateSpriteCorners(); // update four corners of the sprite
};

/*****************************************************/
/******************  PLAYER CLASS   ******************/
/*****************************************************/
// Player Class based on Sprite Class.
var Player = function(sprite, width, height) {
    Sprite.call(this, sprite, width, height);

    this.initStartPosition(); // initialize the starting position.
};

/******************  PLAYER PROTOTYPE   ******************/
Player.prototype = Object.create(Sprite.prototype); // Inherit from Sprite methods.
Player.prototype.constructor = Player; // Update the constructor object

// Updating the position of the player
Player.prototype.update = function() {
    if (this.y < 0) { // if the player reached the river
        // add one point - here we could add some point
        console.log('One Point for Player Artur');
        // return to initial position;
        this.initStartPosition(); // return to the player's starting point
    }
    this.updateSpriteCorners(); // update four corners of the sprite
};

// Handle input method of the Person playing the game.
Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y > 0) { // if press key up - 83px up
        this.y -= 83;
    } else if (direction === 'down' && this.y < 363) { // if press key down - 83px down
        this.y += 83;
    } else if (direction === 'right' && this.x < 400) { // if press key right - 101px right
        this.x += this.width;
    } else if (direction === 'left' && this.x > 0) { // if press key up - 101px left
        this.x -= this.width;
    }
};

/******************************************************************/
/*********************   UTILITY FUNCTIONS   ***********************/
/******************************************************************/
// Check if objects touch each other - if "true" player obj. returning
// to the initial position.(basic version)

// returning true if collision happend
function isCollision(vehicle, player) {
    return !(
        vehicle.spritePoint.left + 15 > player.spritePoint.right - 15 ||
        vehicle.spritePoint.right - 15 < player.spritePoint.left + 15 ||
        vehicle.spritePoint.top + 50 > player.spritePoint.bottom - 50 ||
        vehicle.spritePoint.bottom - 50 < player.spritePoint.top + 50
    );
}

// checking if collision happend and restart game;
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (isCollision(allEnemies[i], player)) {
            player.initStartPosition();
        }
    }
}

// Make any number of enemies object,
// with custom variable name.
function makeEnemy(image, width, height, n) {
    n = n || 3;
    var a = [];
    for (var i = 1; i <= n; i++) {
        window['vehicle' + i] = new Vehicle(image, width, height); // make global var vehicle[some nr] object
        a.push(window['vehicle' + i]); // add the new object to array
    }
    return a; // return all object within an array
}

/********************** Initiation Part *************************/
/*** VEHICLE INIT ***/
// basic properties of vehicle object.
var vehicleImage = 'enemy-bug.png', // image of vehicle
    vehicleWidth = 101, // image width
    vehicleHeight = 171, // image height
    numVehicles = 0; // custom numer of vehicles

// Init. n instances of Vehicle Class.
var allEnemies = makeEnemy(vehicleImage, vehicleWidth, vehicleHeight, numVehicles); // adding/init custom number of enemies - default = 3

/*** PLAYER INIT ***/
// basic properties of player object.
var playerImage = 'char-boy.png', // image of player
    playerWidth = 101, // image width
    playerHeight = 171; // image height

// Init. player instance of Player Class
var player = new Player(playerImage, playerWidth, playerHeight); // init a Player

/******************************************************************/
/*********************   EVENT LISTENER  ***********************/
/******************************************************************/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // every time we press one of the keys above
    // the handleInput mehtod fires.
    player.handleInput(allowedKeys[e.keyCode]);
});
