var tree = [];

function setup() {
    createCanvas(400, 400);
    let len = 100;

    let start = createVector(width/2, height);
    let end = createVector(width/2, height - len);
    let root = new Branch(start, end);
    
    tree[0] = root;
}

function draw() {
    background(51);
    tree.forEach(branch => {
        branch.jitter();
        branch.show();
    });
}

function mousePressed() {
    
    let newTree = tree.slice(0);
    
    tree.forEach(branch => {
        if(!branch.branched) {
            newTree.push(branch.branchRight());
            newTree.push(branch.branchLeft());
        }
    });

    tree = newTree;
}
