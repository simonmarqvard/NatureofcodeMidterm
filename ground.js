class Ground {

  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  display() {
    push();
    //rotate to align with shape
    rotateX(-TWO_PI / 4);
    fill(100, 100, 130)
    plane(this.w, this.h);
    pop();
  }


}
