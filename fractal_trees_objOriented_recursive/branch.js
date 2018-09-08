function Branch(start, end) {
    this.start = start;
    this.end = end;
    
    this.branches = [];
    this.branched = false;

    this.show = function () {
        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);

        this.branches.forEach(b => b.show());
    }

    this.jitter = function () {
        this.end.x += random(-0.5, 0.5);
        this.end.y += random(-0.5, 0.5);

        this.branches.forEach(b => b.jitter());
    }

    this.branch = function() {
       
        if(this.branched) {
            this.branches.forEach(b => b.branch());
            return;
        }

        createBranches(this);
    }
}

function createBranches(currentBranch) {
    let angle = random(PI/6, PI/4);
    let r = createBranch(currentBranch, angle);
    let l = createBranch(currentBranch, - angle);

    currentBranch.branches.push(r);
    currentBranch.branches.push(l);
    
    currentBranch.branched = true;
}

function createBranch(branch, angle) {
    let direction = p5.Vector.sub(branch.end, branch.start);
    direction.mult(0.67);
    direction.rotate(angle);
    let newEnd = p5.Vector.add(branch.end, direction);
    
    return new Branch(branch.end, newEnd);
}
