function GameScore(canvas) {
    // Base
    var gameScore = this;

    // Global Attributes
    gameScore.canvas = canvas;
    gameScore.context = gameScore.canvas.getContext('2d');

    // Specifications
    gameScore.start = new Date();
    gameScore.score = 0;
    gameScore.highScore = 0;
    gameScore.x = 0;
    gameScore.y = 0;
}

GameScore.prototype.draw = function () {
    // Base
    var gameScore = this;

    // Draw
    var draw = new Date();
    gameScore.score = parseFloat((draw - gameScore.start) / 1000).toFixed(1);
    gameScore.context.font = 0.05 * vmin + 'px Arial';
    gameScore.context.textAlign = 'center';
    gameScore.context.textBaseline = 'middle';
    gameScore.context.fillStyle = 'black';
    gameScore.context.fillText(gameScore.score, gameScore.canvas.width / 2, gameScore.y + 20);
}