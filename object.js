class GridSquares {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  display() {
    push();
    //display the figure but - location is based on x,y
    // z location is based on red color;
    translate(this.x, this.y, 1 * this.col[0]);
    fill(255, 255, 255, 50);
    sphere(4);
    pop();
  }

  //if dist is less then 30 pixels they are close
  isCloseTo(other) {
    if (dist(this.x, this.y, this.col[0] * 1, other.x, other.y, other.col[0] * 0.8) < 30) {
      return true;
    } else {
      return false;
    }
  }

  //doesnt work
  move() {
    this.x = this.x + 0.5;
    this.y = this.y + 0.2;

  }
}
