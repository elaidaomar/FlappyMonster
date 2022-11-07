function Wall(canvas) {
    // Base
    var wall = this;

    // Global Attributes
    /** @type {CanvasRenderingContext2D} */
    wall.canvas = canvas;
    wall.context = wall.canvas.getContext('2d');

    // Specifications
    wall.x = canvas.width;
    wall.y = 0;
    wall.w = 100;
    wall.h = 0;
    wall.gap = 0;
    wall.color = getRandomColor();
}

Wall.prototype.draw = function () {
    // Base
    var wall = this;

    // Wall color
    wall.context.fillStyle = wall.color;

    wall.context.strokeStyle = 'black';

    wall.context.lineWidth = 10;

    // Draw Upper Part
    wall.context.fillRect(wall.x, wall.y, wall.w, wall.h);
    wall.context.strokeRect(wall.x, wall.y, wall.w, wall.h);

    // Draw Lower Part
    wall.context.fillRect(wall.x, wall.h + wall.gap, wall.w, wall.canvas.height);
    wall.context.strokeRect(wall.x, wall.h + wall.gap, wall.w, wall.canvas.height);
}