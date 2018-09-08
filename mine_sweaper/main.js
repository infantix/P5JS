var grid;
var cols;
var rows;
var totalBees = 20;
var cellSize = 20;
var canvasSize = 201;

function setup() {
    createCanvas(canvasSize, canvasSize);
    
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);

    grid = new Grid(cols, rows);
}

function draw() {
    background(255);
    grid.show();
}

function mousePressed() {
    grid.reveal(mouseX, mouseY);
}

function gameOver() {
    grid.revealAll();
}
