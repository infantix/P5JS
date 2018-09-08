function Cell(indexX, indexY, w) {
    this.indexX = indexX;
    this.indexY = indexY;

    this.x = indexX * w;
    this.y = indexY * w;

    this.w = w;

    this.beeCount = 0;
    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function () {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if(this.revealed) {
        if(this.bee) {
            fill(127);
            ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5);
        }
        else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            textAlign(CENTER);
            fill(0);
            if(this.beeCount != "0") {
                text(this.beeCount, this.x + this.w * 0.5, this.y + this.w - 4);
            }
        }
    }
}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w) 
        && (y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function (grid) {
    this.revealed = true;

    if(this.bee) {
        gameOver();
        return;
    }

    if(this.beeCount == "0") {
        grid.neighbors(this.indexX, this.indexY).forEach(cell => {
            if(cell != this && !cell.revealed && !cell.bee) {
                cell.reveal(grid);
            }
        });
    }
}

Cell.prototype.countBees = function (grid) {

    let total = 0;

    if(this.bee) {
        this.beeCount = -1;
        return;
    }

    grid.neighbors(this.indexX, this.indexY).forEach(cell => {
        if(cell.bee) {
            total++;
        }
    });

    this.beeCount = total;
}