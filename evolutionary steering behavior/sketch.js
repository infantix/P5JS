// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

const vehiclesQuantity  =  50;
const foodQuantity      =  20;
const poisonQuantity    =  50;

let vehicles = [];
let food = [];
let poison = [];

let width = 640;
let height = 360;

function setup() {
  createCanvas(width, height);

  createVeichols(vehiclesQuantity);
  populateField(food, foodQuantity);
  populateField(poison, poisonQuantity);
}

function createVeichols(quantity = 1) {
  let counter = 0;

  while(counter < quantity) {
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
    counter++;
  }
}

function populateField(array, quantity) {
  for(let i = 0; i < quantity; i++) {
    let xCoord = random(width);
    let yCoord = random(height);
    array.push(createVector(xCoord, yCoord));
  }
}

function draw() {
  background(51);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);

  generateRandomFood();
  generateRandomPoison();
  
  drawVehicles();
  
  cloneVehicles();
  
  noStroke();
  fill(0, 255, 0); //green
  drawField(food);
  
  fill(255, 0, 0); //red
  drawField(poison);
}

function drawVehicles() {
  for(let i = vehicles.length -1; i >= 0; i--) {
    let vehicle = vehicles[i];

    if(vehicle.isDead()) {
      
      if(random(1) < 0.001) {
        //create one unit of food where the vehicle died.
        food.push(createVector(vehicle.position.x, vehicle.position.y));
      }
      vehicles.splice(i, 1);
      return;
    }

    vehicle.update();
    vehicle.behavior(food);
    vehicle.behavior(poison, false); //isGood = false -> TODO: refactor this.
    vehicle.boundaries();
  
    vehicle.display();
  }
}

function cloneVehicles() {
  let newVehicles = [];

  vehicles.forEach(vehicle => {
    if(random(1) < 0.005) { 
      let newVehicle = vehicle.clone();
      newVehicles.push(newVehicle);
    }
  });

  vehicles = vehicles.concat(newVehicles);
}

function generateRandomFood() {
  if(random(1) < 0.05) { //5% of the time
    populateField(food, 1);
  }
}

function generateRandomPoison() {
  if(random(1) < 0.01) { //1% of the time
    populateField(poison, 1);
  }
}

function drawField(array) {
  array.forEach(element => {
    ellipse(element.x, element.y, 8, 8);
  });
}
