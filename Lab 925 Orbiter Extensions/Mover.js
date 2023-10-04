//  Bubble constructor function +++++++++++++++++++++++++++++
function Mover(x, y, rad, clr, o) {
  this.loc = new JSVector(x, y);
  this.rad = rad;
  let dx = Math.random() * (3 + 3 + 1) - 3;
  let dy = Math.random() * (3 + 3 + 1) - 3;
  this.vel = new JSVector(dx, dy);
  this.acc=new JSVector(Math.random()*(3+3+1)-3,Math.random()*(3+3+1)-3);
  this.clr = clr;
  this.o=o;
  this.orbs=[];
  this.or=Math.random()*(11)+5;
  for(let i=0;i<this.o;i++){
      this.orbs[i]=new Orbiter(this,20,0.1,2*Math.PI*i/this.o,5);
  }
  this.connections=[];
}

//  placing methods in the prototype (every ball shares functions)
Mover.prototype.run = function () {
  this.checkEdges();
  this.render();
  this.runOrbit();
  this.reproduce();
  this.update();
}

//  Check to see if buuble leaves canvas area and reposition in necessary
Mover.prototype.checkEdges = function () {
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
Mover.prototype.render = function () {
  context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
  context.fillStyle = this.clr;
  context.fill();     // render the fill
  if(this.connections.length!==0){
    for(let i=0;i<this.connections.length;i++){
      context.beginPath();
      context.moveTo(this.loc.x,this.loc.y);
      context.lineTo(this.connections[i].loc.x,this.connections[i].loc.y);
      context.strokeStyle="violet";
      context.stroke();
    }
  }

}

//  update bubble every animation frame
Mover.prototype.update = function () {
  if(this.connections.length!==0){
    for(let i=0;i<this.connections.length;i++){
      this.connections[i].vel=this.vel;

    }
  }
  this.loc.add(this.vel);
  

}

Mover.prototype.runOrbit=function(){
  for(let i=0;i<this.orbs.length;i++){
    this.orbs[i].run();
  }
}

Mover.prototype.reproduce=function(){
  for(let i=0;i<this.connections.length;i++){
    //if(this.connections[i]!==this&&this.loc.distance(this.connections[i].loc)<1000*this.oRad){
    if(this.loc.distanceSquared(this.connections[i].loc)<2*this.or){
      //console.log("are we here");
      let x = this.loc.x+this.connections[i].loc.x;
      let y = this.loc.y+this.connections[i].loc.y;
      let r = Math.random() * 10 + 1;
      let o=Math.floor(Math.random()*5)+5;
      let clr=("blue");
      //below line causing massive lag
      //movers.push(new Mover(400,400,10,"red",1));
      //movers.push(new Mover(x/2,y/2,r,clr,o));
    }
  }
}