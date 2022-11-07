function Monster(src, canvas) {
    // Base
    var monster = this;

    /** @type {CanvasRenderingContext2D} */
    monster.canvas = canvas;
    monster.context = monster.canvas.getContext('2d');

    // Specification
    monster.x = 115;
    monster.y = 115;
    monster.w = 95;
    monster.h = 95;
    monster.vy = 0;
    monster.g = 0.60;
    monster.src = src;
    monster.image = null;
    monster.frame = 0;

    // Create Monster Tile Image
    monster.create();
}

Monster.prototype.create = function () {
    // Base
    var monster = this;

    // Create Image
    monster.img = new Image();
    monster.img.src = monster.src;
}

Monster.prototype.draw = function () {
    // Base
    var monster = this;

    // Draw
    if (monster.img != null) {
        monster.vy = monster.vy + monster.g;
        monster.y = monster.y + monster.vy;

        if(monster.y + monster.h > monster.canvas.height) {
            monster.y = monster.canvas.height - monster.h;
            monster.vy = 0;
        }else if (monster.y < 0) {
            monster.y = 0;
            monster.vy = 0;
        }

        monster.context.drawImage(monster.img, 0, 100, 400, 400, monster.x, monster.y, monster.w, monster.h);
        monster.frame++;
        monster.frame %= 4;
    }
}