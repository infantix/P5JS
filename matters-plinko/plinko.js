var Engine = Matter.Engine,
    World  = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var pegs = [];
var boundaries = [];

const NUM_MAX_PARTICLES = 15;

var columns = 15;
var rows = 8;

function setup() {
  rectMode(CENTER);
  colorMode(HSB);

  createCanvas(600, 600);
  engine = Engine.create();
  Events.on(engine, 'collisionStart', collision);
  
  world = engine.world;

  createPegs(rows, columns);
  createBoundaries();

  setInterval(removeOffScreenParticles, 5000);
}

var pegSound;

function preload() {
  pegSound = loadSound('./audio/ball_stud.mp3');
}

function createBoundaries() {
  let boundary = new Boundary(width/2, height, width, 50);
  boundaries.push(boundary);

  let bWidth = 10;
  let bHeight = 80;
  let spacing = 50;
  
  let posX=0;
  let posY = height - (bHeight/2);

  for(posX = 0; posX <= width; posX += spacing) {
    let boundary = new Boundary(posX, posY, bWidth, bHeight);
    boundaries.push(boundary);
  }
}

function isEven(n) {
  return n % 2 == 0;
}

function createPegs(rows, columns) {

  let startPosX = 0;
  let startPosY = 130;
  
  let offsetX = 50;
  let offsetY = 50;
  
  let limitX = startPosX + (columns * offsetX);
  let limitY = startPosY + (rows * offsetY);

  let counter;
  for(let i = startPosX; i < limitX; i+= offsetX) {
    counter = 0;
    for(let j = startPosY; j < limitY; j+= offsetY) {
      let space = isEven(counter++) ? 0 : offsetX/2;
      createPeg(i + space, j, 8);
    }
  }
}

function createPeg(posX, posY, radius) {
  let peg = new Peg(posX, posY, radius);
  pegs.push(peg);
}

function createParticle(posX, posY, radius) {

  if(particles.length > NUM_MAX_PARTICLES) {
    resetPlinko();
  }

  let particle = new Particle(posX, posY, radius);
  particles.push(particle);
  pegSound.play();
}

function resetPlinko() {
  particles.forEach(p => p.remove());
  particles = [];
}

function mousePressed() {
  createParticle(mouseX, mouseY, 10);
}

function draw() {
  background(0, 0, 0);
  
  particles.forEach(p => p.show());
  
  pegs.forEach(p => p.show());
  boundaries.forEach(b => b.show());
  
  Engine.update(engine);
}

function removeOffScreenParticles() {
  let offScreenParticles = particles.filter(p => p.isOffScreen());
  offScreenParticles.map(p => p.remove());

  particles = particles.filter(p => !offScreenParticles.includes(p));
}

function collision(event) {
  /*
  //commented out for performance reason
  let pairs = event.pairs;

  pairs.forEach(pair => {
    let labelA = pair.bodyA.label;
    let LabelB = pair.bodyB.label;

    if(labelA === "peg" && LabelB === "particle") {
        pegSound.play();
      }
    if(labelA === "particle" && LabelB === "peg") {
        pegSound.play();
      }
    });
    */
}