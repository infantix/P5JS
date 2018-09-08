function Particle(posX, posY, radius) {
    this.color = random(360);
    
    let options = {
        restitution: 0.5,
        friction: 0.5,
        density: 0.01
    }

    //two particles with the same starting position follow the same path.
    //add a little random value to posX in order to prevent that.
    posX += random(-1,1);

    this.body = Bodies.circle(posX, posY, radius, options);
    this.body.label = 'particle';
    this.radius = radius;
    World.add(world, this.body);
}

Particle.prototype.show = function() {
    fill(this.color, 255, 255);
    stroke(this.color, 255, 255);
    let position = this.body.position;
    push();
    translate(position.x, position.y);
    ellipse(0, 0, this.radius * 2);
    pop();
}

Particle.prototype.isOffScreen = function() {
    let position = this.body.position;
    let buffer = 50;

    if(position.x < -buffer || position.x > width + buffer) {
        return true;
    }
    
    if(position.y < -buffer || position.y > height + buffer) {
        return true;
    }

    return false;
}

Particle.prototype.remove = function() {
   World.remove(world, this.body);
}