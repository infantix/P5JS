function Peg(posX, posY, radius) {

    let options = {
        isStatic: true,
    }

    this.body = Bodies.circle(posX, posY, radius, options);
    this.body.label = 'peg';
    this.radius = radius;
    World.add(world, this.body);
}

Peg.prototype.show = function() {
    fill(145);
    stroke(145);
    let position = this.body.position;
    push();
    translate(position.x, position.y);
    ellipse(0, 0, this.radius * 2);
    pop();
}