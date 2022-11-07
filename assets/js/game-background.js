function GameBackground(src, canvas) {
    // Base
    var bg = this;

    /** @type {CanvasRenderingContext2D} */
    bg.canvas = canvas;
    bg.context = bg.canvas.getContext('2d');

    // Specifications
    bg.x = 0;
    bg.y = 0;
    bg.w = canvas.width;
    bg.h = canvas.height;
    bg.src = src;
    bg.img = null;

    // Create Background Image
    bg.create();
}

GameBackground.prototype.create = function () {
    // Base
    var bg = this;

    // Create Image
    bg.img = new Image();
    bg.img.src = bg.src;
}

GameBackground.prototype.draw = function () {
    // Base
    var bg = this;

    // Draw
    if (bg.img != null){
        bg.context.drawImage(bg.img, bg.x, bg.y, bg.w, bg.h);
    }
}