let snake;
let food;
let scale = 25;
let forbiddenKeyCode;

function setup() {
  frameRate(10);
  createCanvas(600,600);
  
  snake = new Snake(scale);
  food = new Food();
  food.pickLocation();
}

function draw() {
  background(51);
  
  if(snake.collide(food)) {
    snake.eat();
    food.pickLocation();
  }

  snake.update();
  snake.show();
  food.show();
}

function keyPressed() {

  if(keyCode === forbiddenKeyCode) {
    return;
  }

  switch(keyCode) {
    
    case UP_ARROW:
      forbiddenKeyCode = DOWN_ARROW;
      snake.direction(0, -1);
      break;
    
    case DOWN_ARROW:
      forbiddenKeyCode = UP_ARROW;
      snake.direction(0, 1);
      break;
    
    case RIGHT_ARROW:
      forbiddenKeyCode = LEFT_ARROW;
      snake.direction(1, 0);
      break;
    
    case LEFT_ARROW:
      forbiddenKeyCode = RIGHT_ARROW;
      snake.direction(-1, 0);
      break;
  }
}

