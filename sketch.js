//Shape based on tornadeImg where pixel colors are used
let tornadoImg;

//resulation of shape
let resolution = 10;

let cols;
let rows;
var c;
let nodes = [];

//settings for camera starting position
let startCameraPosition = {
  x: -156,
  y: 100,
  z: -100,
};

//variables used for camera control
let tx = 0;
let ty = 0;
let tz = 0;
let rx = 0;
let ry = 0;
let rz = 0;

//add grid
let debug = false;
//add rotation
let rotation


function preload() {
  tornadoImg = loadImage("Tornado.jpg")
}

function setup() {
  createCanvas(700, 700, WEBGL);
  //resolution determines number of cols and rows
  cols = width / resolution;
  rows = height / resolution;

  //get colors from tornado img. If their value is different from black (0) add it to array
  tornadoImg.loadPixels();
  for (let x = 0; x < cols; x += 2) {
    for (let y = 0; y < rows; y += 2) {
      c = tornadoImg.get(x * resolution, y * resolution)
      if (c[0] > 5) {
        nodes.push(new GridSquares(x * 6, y * 6, c));
      }
    }
  }
  //ground object
  ground1 = new Ground(1000, 1000);
}

let t = 0;

function draw() {
  background(100, 100, 200)
  //set starting camera location
  translate(startCameraPosition.x, startCameraPosition.y, startCameraPosition.z);
  //run keyboardControl function
  keyboardControl();
  //display ground
  ground1.display();

  rotateX(-TWO_PI / 4);

  //boolean for rotation on/off
  if (rotation) {
    t += 0.0008;
  } else {
    t = 0;
  }


  for (let i = 0; i < nodes.length; i++) {
    //display nodes but first translate back to center of shape
    push()
    translate(-180, -180)
    nodes[i].display();
    pop()
    //rotate nodes around their center
    rotateZ(t);
  }

  //if mousePressed show debug
  //debug shows grid combining the nodes using begin/endShape
  if (debug) {
    translate(-180, -180)
    strokeWeight(60);
    stroke(255);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        //if the node is not itself and nodes are close to each other draw them
        if (i != j && nodes[i].isCloseTo(nodes[j])) {
          beginShape();
          vertex(nodes[i].x, nodes[i].y, 1 * nodes[i].col[0]);
          vertex(nodes[j].x, nodes[j].y, 1 * nodes[j].col[0]);
          endShape();

        }
      }
    }
    //rotate grid NOTE: runs slow
    rotateZ(t);
  }
}
//if you press r rotation begins
function keyPressed() {
  if (keyCode === 82) {
    rotation = !rotation;
  }
}

function mousePressed() {
  debug = !debug;

}

//keyboard control
function keyboardControl() {

  let rotationStep = PI / 48;
  let translationStep = 10;
  // zoom
  if (keyIsDown(38) && !keyIsDown(16)) {
    ty += translationStep;
  }
  if (keyIsDown(40) && !keyIsDown(16)) {
    ty -= translationStep;
  }

  // pan left-right
  if (keyIsDown(37) && !keyIsDown(16)) {
    tx += translationStep;
  }
  if (keyIsDown(39) && !keyIsDown(16)) {
    tx -= translationStep;
  }

  // rotate about X
  if (keyIsDown(38) && keyIsDown(16)) {
    rx += rotationStep;
  }
  if (keyIsDown(40) && keyIsDown(16)) {
    rx -= rotationStep;
  }
  //rotate about Y
  if (keyIsDown(37) && keyIsDown(16)) {
    ry += rotationStep;
  }
  if (keyIsDown(39) && keyIsDown(16)) {
    ry -= rotationStep;
  }

  //zoom
  if (keyIsDown(38) && keyIsDown(18)) {
    tz += translationStep;
  }
  if (keyIsDown(40) && keyIsDown(18)) {
    tz -= translationStep;
  }

  translate(tx, ty, tz);
  rotateX(rx);
  rotateY(ry);
  rotateZ(rz);

}
