//  Bubble constructor function +++++++++++++++++++++++++++++
function Bubble(x, y, rad, clr) {
  this.loc = new JSVector(x, y);
  this.rad = rad;
  let dx = Math.random() * (3 + 3 + 1) - 3;
  let dy = Math.random() * (3 + 3 + 1) - 3;
  this.vel = new JSVector(dx, dy);
  this.acc=new JSVector(Math.random()*(3+3+1)-3,Math.random()*(3+3+1)-3);
  this.clr = clr;
  this.isOverlapping = false;
}

//  placing methods in the prototype (every ball shares functions)
Bubble.prototype.run = function () {
  this.checkEdges();
  this.render();
  this.update();
}

//  Check to see if buuble leaves canvas area and reposition in necessary
Bubble.prototype.checkEdges = function () {
  if (this.loc.x - this.rad < 0) {
    this.loc.x=1+this.rad;
    this.vel.multiply(-1);
    this.acc.add(new JSVector(this.rad*0.5,0));
  } else if(this.loc.x + this.rad > canvas.width) {
    this.loc.x=canvas.width-1-this.rad;
    this.vel.multiply(-1);
    this.acc.add(new JSVector(-this.rad*0.5,0));
  } else if (this.loc.y - this.rad < 0){
    this.loc.y=1+this.rad;
    this.vel.multiply(-1);
    this.acc.add(new JSVector(0,this.rad*0.5));
  } else if(this.loc.y + this.rad > canvas.height) {
    this.loc.y=canvas.height-1-this.rad;
    this.vel.multiply(-1);
    this.acc.add(new JSVector(-this.rad*0.5,0));
  }
}

// renders a bubble to the canvas
Bubble.prototype.render = function () {
  context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
  context.fillStyle = this.clr;
  context.fill();     // render the fill

}

//  update bubble every animation frame
Bubble.prototype.update = function () {
  att = new JSVector(0,0.1);
  rep= new JSVector(0.1,0);
  if(ar===0){
    this.acc=att;
  } else {
    this.acc=rep;
  }
  //this.acc.normalize();
  this.acc.multiply(0.5);
  this.vel.limit(3);
  this.vel.add(this.acc);
  this.loc.add(this.vel);

}

