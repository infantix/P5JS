function Branch(start, end) {
    this.start = start;
    this.end = end;
    this.branched = false;

    this.show = function () {
        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    this.jitter = function () {
        this.end.x += random(-0.5, 0.5);
        this.end.y += random(-0.5, 0.5);
    }

    this.branchRight = function() {
        let angle = random(PI/6, PI/4);
        return branch(this, angle);
    }
    
    this.branchLeft = function() {
        let angle = - random(PI/6, PI/4);
        return branch(this, angle);
    }
}

function branch(branch, angle) {
    branch.branched = true;

    let direction = p5.Vector.sub(branch.end, branch.start);
    direction.mult(0.67);
    direction.rotate(angle);
    let newEnd = p5.Vector.add(branch.end, direction);
    
    return new Branch(branch.end, newEnd);
}
