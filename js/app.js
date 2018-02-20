'use strict';

// Global variable for keeping tha game score
var score = 0;

// Enemies our player must avoid
var Enemy = function (x, y, min, max) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = this.randomIntFromInterval(min, max);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy reaches end of it's path --> re appear a little after.
    if (this.x < 600) {
        this.x = this.x + (dt * this.speed);
    } else
        this.x = -100;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Get random number from a given interval
Enemy.prototype.randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate a Random Speed for Enemy Objects
Enemy.prototype.getRandomSpeed = function (min, max) {
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].speed = this.randomIntFromInterval(min, max);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

}

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 460;
}


Player.prototype.update = function (dt) {
    // I figured that no need to implement this function
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Check the collision, if happens --> reset the game
Player.prototype.checkCollisions = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x >= this.x - 70 && allEnemies[i].x < this.x + 70 &&
            allEnemies[i].y === this.y) {
            this.reset();
            allEnemies[i].getRandomSpeed(250, 650);
            score = 0;
        }
    }
}

// Move Player according to input
Player.prototype.handleInput = function (allowedKeys) {

    if (allowedKeys == 'left' && this.x > 0) {
        this.x -= 100;
    } else if (allowedKeys == 'right' && this.x < 400) {
        this.x += 100;
    } else if (allowedKeys == 'up' && this.y >= 50) {
        this.y -= 80;
    } else if (allowedKeys == 'down' && this.y < 460) {
        this.y += 80;
    }
    // if player reaches water --> back to initial position
    if (this.y < 60) {
        this.reset();
        score++;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200, 460);

var allEnemies = [];
allEnemies[0] = new Enemy(-90, 300, 200, 400);
allEnemies[1] = new Enemy(-200, 220, 650, 800);
allEnemies[2] = new Enemy(-20, 140, 350, 500);
allEnemies[3] = new Enemy(0, 60, 200, 300);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
