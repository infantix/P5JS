function Boundary(posX, posY, width, height) {
    this.width = width;
    this.height = height;
    
    let options = {
        isStatic: true,
        friction: 1
    }

    this.body = Bodies.rectangle(posX, posY, width, height, options);
    this.body.label = 'boundary';
    World.add(world, this.body);
}

Boundary.prototype.show = function() {
    fill(145);
    stroke(145);
    let position = this.body.position;
    push();
    translate(position.x, position.y);
    rect(0, 0, this.width, this.height);
    pop();
}