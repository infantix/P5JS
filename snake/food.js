function Food() {
    this.x = 0;
    this.y = 0;

    this.pickLocation = function() {
        let rows = floor(height/scale);
        let columns = floor(width/scale);
      
        this.y = floor(random(rows)) * scale;
        this.x = floor(random(columns)) * scale;
    }

    this.show = function() {
        fill(255, 0, 100);
        rect(this.x, this.y, scale, scale);
      }
}