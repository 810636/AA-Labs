function Orbiter(mover,oRad,angVel,ang,rad){
    this.mover=mover;
    this.oRad=oRad;
    this.angVel=angVel;
    this.ang=ang;
    this.rad=rad;
    this.xc=Math.cos(ang)*this.mover.rad+this.mover.loc.x;
    this.yc=Math.sin(ang)*this.mover.rad+this.mover.loc.y;
    this.loc=new JSVector(this.xc,this.yc);
}

Orbiter.prototype.run=function(){
    this.update();
    this.render();
}
Orbiter.prototype.update=function(){
    this.ang+=this.angVel;
    this.xc=Math.cos(this.ang)*this.oRad+this.mover.loc.x;
    this.yc=Math.sin(this.ang)*this.oRad+this.mover.loc.y;
    this.loc.x=this.xc;
    this.loc.y=this.yc;
}
Orbiter.prototype.render=function(){
    context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  context.arc(this.loc.x, this.loc.y, this.rad, 0, 2 * Math.PI);
  context.fillStyle = "rgba(255,255,255,1)";
  context.fill();     // render the fill
}