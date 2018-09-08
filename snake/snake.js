function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.tail = [];

    this.collide = function (element) {
        //1 is the min distance 
        return dist(this.x, this.y, element.x, element.y) < (scale/10);
    }

    this.eat = function() {
        let newTailPart = createVector(this.x, this.y);
        this.tail.unshift(newTailPart);
    }
  
    this.update = function() {

      //update tail
      if(this.tail.length != 0) {
        let newTailPart = createVector(this.x, this.y);
        this.tail.unshift(newTailPart);
        this.tail.pop(); 
      }

      //update head
      this.x += (this.xSpeed * scale);
      this.y += (this.ySpeed * scale);

      this.x = constrain(this.x, 0, width - scale);
      this.y = constrain(this.y, 0, height - scale);

      //game over detection
      this.tail.forEach(element => {
        if(this.collide(element)) {
            console.log('Game Over');
            this.tail.length = [];
        }
      });
    }
  
    this.show = function() {
      fill(255); //makes the rectangle white
      rect(this.x, this.y, scale, scale);
      
      this.tail.forEach(element => {
        rect(element.x, element.y, scale, scale);
      });
    }
    
    this.direction = function(xDir, yDir) {
        this.xSpeed = xDir;
        this.ySpeed = yDir;
    }
  }