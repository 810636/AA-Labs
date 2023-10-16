//  Bubble constructor function +++++++++++++++++++++++++++++
function Eater(x, y, rad, clr, o) {
    this.loc = new JSVector(x, y);
    this.rad = rad;
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 3;
    this.vel = new JSVector(dx, dy);
    this.acc=new JSVector(Math.random()*(3+3+1)-3,Math.random()*(3+3+1)-3);
    this.clr = clr;
    this.orbs=[];
    let or=Math.random()*(11)+5;
    for(let i=0;i<o;i++){
        this.orbs[i]=new Orbiter(this,20,0.1,2*Math.PI*i/o,5);
    }
  }
  
  //  placing methods in the prototype (every ball shares functions)
  Eater.prototype.run = function () {
    this.checkEdges();
    this.render();
    this.runOrbit();
    this.update();
  }
  
  //  Check to see if buuble leaves canvas area and reposition in necessary
  Eater.prototype.checkEdges = function () {
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
  Eater.prototype.render = function () {
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
    context.fillStyle = this.clr;
    context.fill();     // render the fill
    for(let i=0;i<this.orbs.length;i++){
      context.beginPath();
      context.moveTo(this.loc.x,this.loc.y);
      context.lineTo(this.orbs[i].loc.x,this.orbs[i].loc.y);
      context.strokeStyle="violet";
      context.stroke();
    }
    
  
  }
  
  //  update bubble every animation frame
  Eater.prototype.update = function () {
    //this.vel.add(this.acc);
    this.loc.add(this.vel);
  
  }
  
  Eater.prototype.runOrbit=function(){
    for(let i=0;i<this.orbs.length;i++){
      this.orbs[i].run();
    }
  }