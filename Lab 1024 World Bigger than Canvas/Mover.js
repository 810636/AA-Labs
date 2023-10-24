function Mover(loc, vel, d, ctx1, ctx2, worldWidth, worldHeight) {
  //mover properties
  this.loc = loc;
  this.vel = vel;
  this.acc = new JSVector(0, 0);
  this.diam = d;
  this.ctx1 = ctx1;
  this.ctx2 = ctx2;
  this.wWidth = worldWidth;
  this.wHeight = worldHeight;
  this.worldScale = new JSVector(this.wWidth, this.wHeight);
  this.r=Math.random()*(255-0+1)+1;
  this.g=Math.random()*(255-0+1)+1;
  this.b=Math.random()*(255-0+1)+1;
}//++++++++++++++++++++++++++++++++ end mover constructor

//++++++++++++++++++++++++++++++++ mover methods
Mover.prototype.run = function () {
  this.update();
  this.checkEdges();
  this.render();
}

Mover.prototype.update = function () {
  this.vel.add(this.acc);
  this.vel.limit(3);
  this.loc.add(this.vel);
}


Mover.prototype.checkEdges = function () {
  if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
    this.vel.x *= -1;
  }
  if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height  / 2) {
    this.vel.y *= -1;
  }
}


Mover.prototype.render = function () {
   //  render balls in world
    let ctx1 = this.ctx1;
    ctx1.fillStyle = "rgb("+this.r+","+this.g+","+this.b+","+this.opacity+")";
   //  render balls in mini map
    let ctx2 = this.ctx2;
    ctx2.fillStyle = "rgb("+this.r+","+this.g+","+this.b+","+this.opacity+")";
   
}
