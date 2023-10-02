//  Bubble constructor function +++++++++++++++++++++++++++++
function Bubble(x, y, rad) {
  this.loc=new JSVector(x,y);
  this.rad = rad;
  dx=Math.random()*(3+3+1)-3;
  dy=Math.random()*(3+3+1)-3;
  this.vel=new JSVector(dx,dy);
  this.sClr = "rgba(0,255,0,1)";
  this.clr="rgba(190,0,255,1)";
  this.isOverlapping = false;
}

//  placing methods in the prototype (every ball shares functions)
Bubble.prototype.run = function () {
  this.checkEdges();
  this.update();
  this.checkOverlapping();
  this.render();
}

//  Check to see if buuble leaves canvas area and reposition in necessary
Bubble.prototype.checkEdges = function () {
  if(this.loc.x-this.rad<0||this.loc.x+this.rad>canvas.width){
    this.vel.multiply(-1);
}
if(this.loc.y-this.rad<0||this.loc.y+this.rad>canvas.height){
  this.vel.multiply(-1);
}
}

//  Sets "this.isOverlapping" to true if bubbles are overlapping
Bubble.prototype.checkOverlapping = function () {
  this.isOverlapping=false;
  let b=bubbles;
  for(let i=0;i<b.length;i++){
    if(b[i]!=this){
      let d=this.loc.distance(b[i].loc);
      if(d<this.rad+b[i].rad){
        this.isOverlapping=true;
        return;
      } 
    }
  }
}

// renders a bubble to the canvas
Bubble.prototype.render = function () {
  context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
    if(this.isOverlapping){
      context.fillStyle=("rgba(255,0,0,0)");
      context.strokeStyle = this.sClr; 
      context.stroke();   // render the stroke
    } else {
      context.fillStyle = this.clr;
    }
    context.fill();     // render the fill
    
}

//  update bubble every animation frame
Bubble.prototype.update = function () {
  // this.dx=Math.random()*(2+2+1)-2;
  // this.dy=Math.random()*(2+2+1)-2;
  this.loc.add(this.vel);
}

