var root;

function setup() {
    createCanvas(400, 400);
    
    let len = 100;
    let start = createVector(width/2, height);
    let end = createVector(width/2, height - len);
    root = new Branch(start, end);
}

function draw() {
    background(51);
    root.jitter();
    root.show();
}

function mousePressed() {
    root.branch();
}
