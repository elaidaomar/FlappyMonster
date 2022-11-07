
// Initial Screen
// Game Playing Screen
// Game Over Screen

var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;

var KEY_CODE = {
    R: 82
};

var mousePos = {
    x: 0,
    y: 0
}

var vmin = window.innerWidth;

function FlappyMonster(canvas) {
    // Base
    var game = this;

    // Global Attributes
    /** @type {CanvasRenderingContext2D} */
    game.canvas = canvas;
    game.context = game.canvas.getContext('2d');
    game.canvas.width = 1600;
    game.canvas.height = 900;

    // Game State 
    game.currentState = INITIAL;

    // Game Speed
    game.velocity = 4;

    // Game Gravvity
    game.gravity = 9;

    // Bind Events
    game.bindEvents();
}

FlappyMonster.prototype.createObjects = function () {
    // Base
    var game = this;

    // Background
    game.background1 = new GameBackground('assets/images/back.png', game.canvas);
    game.background2 = new GameBackground('assets/images/back.png', game.canvas);
    game.background2.x = game.canvas.width;

    // Score
    game.gameScore = new GameScore(game.canvas);
    game.gameScore.x = game.canvas.width - 0.15 * vmin;
    game.gameScore.y = 0.08 * vmin;

    // Wall Factory
    game.wallFactory = new WallFactory(game.canvas);
    game.wallFactory.generateWalls();

    // Monster 
    game.monster = new Monster('assets/images/mark.png', game.canvas);
}

FlappyMonster.prototype.bindEvents = function () {
    // Base 
    var game = this;

    // Mouse Listener
    window.addEventListener('keyup', function (event) {
        // Game State
        switch (game.currentState) {
            case INITIAL:
                // DRAW INITIAL SCREEN
                game.currentState = GAME_PLAYING;

                // Create Game Objects
                game.createObjects();
                break;
            case GAME_PLAYING:
                game.monster.vy = -1 * game.gravity;
                break;
        }
    });

    // Touch Listener
    window.addEventListener('touchstart', function (event) {
        // Game State
        switch (game.currentState) {
            case INITIAL:
                // DRAW INITIAL SCREEN
                game.currentState = GAME_PLAYING;

                // Create Game Objects
                game.createObjects();
                break;
            case GAME_PLAYING:
                game.monster.vy = -1 * game.gravity;
                break;
            case GAME_OVER:
                game.reset();
                game.currentState = GAME_PLAYING;

                break;
        }
    });

    // Resize Listener
    window.addEventListener('resize', function (event) {
        vmin = window.innerWidth;
        game.canvas.width = 1600;
        game.canvas.height = 900;
    });

    // Mousemove Listener
    game.canvas.addEventListener('mousemove', function (event) {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
    });

    // Key Down Listener
    window.addEventListener('keyup', function (event) {
        switch (game.currentState) {

        }
    });

    // Click Listener
    window.addEventListener('click', function (event) {
        switch (game.currentState) {
            case GAME_OVER:
                game.reset();
                game.currentState = GAME_PLAYING;
                break;
        }
    })
}

FlappyMonster.prototype.reset = function () {
    // Base
    var game = this;

    // Reset States
    game.gameScore.start = new Date();
    game.gameScore.score = 0;
    game.wallFactory.walls = [];
    game.monster.x = 115;
    game.monster.y = 115;

    game.monster.vy = -1 * game.gravity;
}

FlappyMonster.prototype.start = function () {
    // Base
    var game = this;

    // Start Game
    window.requestAnimationFrame(function () {
        game.runGameLoop();
    });
}

FlappyMonster.prototype.runGameLoop = function () {
    // Base
    var game = this;

    // Game State
    switch (game.currentState) {
        case INITIAL:
            // DRAW INITIAL SCREEN
            game.drawInitialScreen();
            break;
        case GAME_PLAYING:
            // DRAW PLAYING SCREEN
            game.drawGamePlayingScreen();
            break;
        case GAME_OVER:
            // DRAW GAME OVER SCREEN
            game.drawGameOverScreen();
            break;
    }

    window.requestAnimationFrame(function () {
        game.runGameLoop();
    });
}

FlappyMonster.prototype.drawInitialScreen = function () {
    // Base
    var game = this;

    // Background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Text
    game.context.fillStyle = 'white';
    game.context.font = 0.065 * vmin + 'px Arial';
    game.context.textAlign = 'center';
    game.context.fillText('Flappy Mark', game.canvas.width / 2, game.canvas.height / 2 - 100);
    game.context.font = 0.025 * vmin + 'px Arial';
    game.context.fillText('Press any key to start game.', game.canvas.width / 2, game.canvas.height / 2);

    var rufus_img = new Image();
    rufus_img.src = 'assets/images/rufus.png';
    if (rufus_img.src) {
        game.context.drawImage(rufus_img, game.canvas.width / 2 - 0.05 * vmin, game.canvas.height / 2 + 0.05 * vmin, 0.1 * vmin, 0.1 * vmin);
    }
}

FlappyMonster.prototype.drawGamePlayingScreen = function () {
    // Base
    var game = this;

    // Clear Canvas
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

    // Draw Background
    game.animateBackground();

    // Draw Walls
    game.drawWalls();

    // Draw Score
    game.gameScore.draw();

    // Draw Monster
    game.monster.draw();

    // Collision Check
    game.checkCollisions();

}

FlappyMonster.prototype.checkCollisions = function () {
    // Base
    var game = this;

    var walls = game.wallFactory.walls;

    for (var i = 0; i < walls.length; i++) {
        if (game.isCollided(game.monster, walls[i])) {
            if (!localStorage.getItem('flappy-hs') || parseFloat(localStorage.getItem('flappy-hs')) < game.gameScore.score) {
                localStorage.setItem('flappy-hs', game.gameScore.score);
                game.gameScore.highScore = localStorage.getItem('flappy-hs');
            } else {
                game.gameScore.highScore = localStorage.getItem('flappy-hs');
            }

            // Game Over
            game.currentState = GAME_OVER;
        }
    }
}

FlappyMonster.prototype.isCollided = function (monster, wall) {
    // Base
    var game = this;
    var isCollided = true;

    // Monster Coordinates
    var monsterTop = game.monster.y;
    var monsterBottom = game.monster.y + game.monster.h;
    var monsterRight = game.monster.x + game.monster.w;
    var monsterLeft = game.monster.x;

    // Wall Coordinates
    var wallTop = wall.y + wall.h + wall.gap; // top of lower wall
    var wallBottom = wall.y + wall.h // bottom of upper wall
    var wallRight = wall.x + wall.w;
    var wallLeft = wall.x;

    if ((monsterBottom < wallTop && monsterTop > wallBottom)
        || (monsterLeft > wallRight)
        || (monsterRight < wallLeft)
        && (monster.y + monster.h < game.canvas.height)) {
        isCollided = false;
    }

    return isCollided;
}

FlappyMonster.prototype.drawWalls = function () {
    // Base
    var game = this;

    // Draw Walls
    var walls = game.wallFactory.walls;

    for (var i = 0; i < walls.length; i++) {
        walls[i].draw();
        walls[i].x -= game.velocity;
    }

    game.removeExtraWalls();
}

FlappyMonster.prototype.removeExtraWalls = function () {
    // Base
    var game = this;

    // Draw Walls
    var walls = game.wallFactory.walls;

    for (var i = 0; i < walls.length; i++) {
        if (walls[i].x + walls[i].w < 0) {
            // Remove
            walls.shift();
        }
    }
}

FlappyMonster.prototype.animateBackground = function () {
    // Base
    var game = this;

    // Background 1
    game.background1.draw();

    if (Math.abs(game.background1.x) > game.canvas.width) {
        game.background1.x = game.canvas.width - game.velocity;
    }

    game.background1.x = game.background1.x - game.velocity;

    // Background 2
    game.background2.draw();

    if (Math.abs(game.background2.x) > game.canvas.width) {
        game.background2.x = game.canvas.width - game.velocity;
    }

    game.background2.x = game.background2.x - game.velocity;
}

FlappyMonster.prototype.drawGameOverScreen = function () {
    // Base
    var game = this;

    // Draw

    // Background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Text
    game.context.fillStyle = 'white';
    game.context.font = 0.045 * vmin + 'px Arial';
    game.context.textAlign = 'center';
    game.context.fillText('GAME OVER', game.canvas.width / 2, game.canvas.height / 2 - 0.1 * vmin);
    game.context.fillText('Score: ' + game.gameScore.score + ' - ' + 'High Score: ' + localStorage.getItem('flappy-hs'), game.canvas.width / 2, game.canvas.height / 2);
    game.context.font = 0.030 * vmin + 'px Arial';
    game.context.fillText('Click/Touch screen to restart', game.canvas.width / 2, game.canvas.height / 2 + 0.1 * vmin);
}