function Mover(loc, vel, r, ctx1, ctx2, worldWidth, worldHeight) {
  //mover properties
  this.loc = loc;
  this.vel = vel;
  this.acc = new JSVector(0, 0);
  this.rad = r;
  this.ctx1 = ctx1;
  this.ctx2 = ctx2;
  this.wWidth = worldWidth;
  this.wHeight = worldHeight;
  this.worldScale = new JSVector(this.wWidth, this.wHeight);
  let red=Math.random()*(255-0+1)+1;
  let g=Math.random()*(255-0+1)+1;
  let b=Math.random()*(255-0+1)+1;
  this.clr="rgb("+red+","+g+","+b+")";
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
    ctx1.beginPath();
    ctx1.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2);
    ctx1.closePath();
    ctx1.fillStyle = this.clr;
    ctx1.fill();
   //  render balls in mini map
    let ctx2 = this.ctx2;
    ctx2.beginPath();
    ctx2.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2);
    ctx2.fillStyle = this.clr;
    ctx2.fill();
    ctx2.closePath();
}
