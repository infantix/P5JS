// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y, clonedDna = null) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.3;
    this.health = 1;

    if(clonedDna != null) {
      this.dna = clonedDna;
      return;
    }

    this.dna = [
      //food weight
      random(-2, 2),
      //poison weight
      random(-2, 2),
      //food perception
      random(10, 100),
      //poison perception
      random(10, 100),
    ];
  }
  
  behavior(elements, isGood = true) {

    let perception = isGood ? this.dna[2] : this.dna[3];
    let steerWeight = isGood ? this.dna[0] : this.dna[1];

    let target = this.getClosestElement(elements, perception);

    let distance = this.position.dist(target);

    if(distance < 10) { // element is too far in order to be eated
      this.eat(elements, target, isGood);
    }
    else {
      let steer = this.seek(target);
      steer.mult(steerWeight);
      this.applyForce(steer);
    }
  }

  // Method to update location
  update() {
    this.health -= 0.005;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  getClosestElement(elements, perception) {

    let closestDistance = Infinity;
    let closestElement = createVector(0, 0);

    elements.forEach(element => {
      let distance = this.position.dist(element);
      
      if(distance < closestDistance && distance <= perception) {
        closestDistance = distance;
        closestElement = element;
      }
    });

    return closestElement;
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  eat(elements, target, isGood) {
    let targetIndex = elements.indexOf(target);    // <-- Not supported in <IE9
    
    if (targetIndex !== -1) {
      elements.splice(targetIndex, 1);
    }

    if(isGood) {
      this.health += 0.05;
    }
    else {
      this.health -= 0.5;
    }
  }

  isDead() {
    return this.health < 0;
  }

  mutateDna(dna) {
    let dnaCopy = dna.slice(0);
    
    dnaCopy.forEach(g => {
      g += random(-10, 10);
    });
    
    return dnaCopy;
  }

  clone() {
    let newDna = this.mutateDna(this.dna);
    return new Vehicle(this.position.x, this.position.y, newDna);
  }

  display() {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    let green = color(0, 255, 0);
    let red = color(255, 0, 0);

    noFill();
    strokeWeight(3);
    stroke(green);
    line(0, 0, 0, -this.dna[0] * 20);
    ellipse(0,0, this.dna[2] * 2);
    
    strokeWeight(2);
    stroke(red);
    line(0, 0, 0, -this.dna[1] * 20);
    ellipse(0,0, this.dna[3] * 2);
    
    let bgColor = lerpColor(red, green, this.health);
    fill(bgColor);
    stroke(bgColor);
    strokeWeight(1);

    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  boundaries() {
    
    if (this.position.x < 0) {
      this.position.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
    }
  
    if (this.position.y < 0) {
      this.position.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
    }
  }

}
