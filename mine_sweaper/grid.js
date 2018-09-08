
function Grid(cols, rows) { 
    this.cols = cols;
    this.rows = rows;

    this.arr = new Array(cols);

    for(let i = 0; i < this.arr.length; i++) {
        this.arr[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            this.arr[i][j] = new Cell(i, j, cellSize);
        }
    }

    let beesCount = 0;

    while(beesCount < totalBees) {
        let col = floor(random(cols));
        let row = floor(random(rows));

        if(!this.arr[col][row].bee) {
            this.arr[col][row].bee = true;
            beesCount++;
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            this.arr[i][j].countBees(this);
        }
    }
}

Grid.prototype.show = function () {
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            this.arr[i][j].show();
        }
    }
}

Grid.prototype.revealAll = function () {
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            this.arr[i][j].revealed = true;
        }
    }
}

Grid.prototype.reveal = function (mouseX, mouseY) {
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            if(this.arr[i][j].contains(mouseX, mouseY)) {
                this.arr[i][j].reveal(this);
            }
        }
    }
}

Grid.prototype.neighbors = function (col, row) {

    let neighbors = [];

    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <=  1; j++) {

            if(this.arr[i + col] == undefined || this.arr[i + col][j + row] == undefined) {
                continue;
            }

            let cell = this.arr[i + col][j + row];
            neighbors.push(cell);
        }
    }

    return neighbors;
}
