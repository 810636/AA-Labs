function Ship(x,y){
    this.loc=new JSVector(x,y);
    let dx = Math.random() * (5 + 5 + 1) - 5;
    let dy = Math.random() * (5 + 5 + 1) - 5;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0);
}
Ship.prototype.run=function(){
    this.render();
    this.checkEdges();
    this.update();
}
Ship.prototype.render=function(){
    context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
//   context.arc(this.loc.x, this.loc.y, 5, 0, 2 * Math.PI);
    //currently trying to fill and rotate
    // context.save();
    // context.translate(this.loc.x,this.loc.y);
    // context.rotate(this.vel.getDirection());
    context.moveTo(this.loc.x,this.loc.y-10);
    context.lineTo(this.loc.x-5,this.loc.y+5);
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.loc.x-5,this.loc.y+5);
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.loc.x+5,this.loc.y+5);
    context.moveTo(this.loc.x+5,this.loc.y+5);
    context.lineTo(this.loc.x,this.loc.y-10);
    context.strokeStyle="violet";
    context.stroke();
    context.closePath(); 
    context.fillStyle = "blue";
    context.fill();  // the fill is not working
    // context.restore();

}
Ship.prototype.update=function(){
    this.acc=JSVector.subGetNew(planet.loc,this.loc);
    this.acc.normalize();
    this.acc.multiply(0.2);
    this.vel.limit(5);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}
Ship.prototype.checkEdges=function(){
    if(this.loc.x<0){
        this.loc.x=canvas.width;
    } else if(this.loc.x>canvas.width){
        this.loc.x=0;
    }
    if(this.loc.y<0){
        this.loc.y=canvas.height;
    } else if(this.loc.y>canvas.height){
        this.loc.y=0
    }
}