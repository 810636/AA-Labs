function Target(x,y){
    this.loc=new  JSVector(x,y);
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 3;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0);
}
Target.prototype.run=function(){
    this.render();
    this.flee();
    this.checkEdges();
    this.update();
}
Target.prototype.render=function(){
    context.beginPath();    // clear old path
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  context.arc(this.loc.x, this.loc.y, 10, 0, 2 * Math.PI);
  context.fillStyle = "green";
  context.fill();     // render the fill
}
Target.prototype.update=function(){
    this.acc=JSVector.subGetNew(this.loc, snakes[0].loc);
    this.acc.normalize();
    this.acc.multiply(0.05);
    this.vel.limit(3);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}
Target.prototype.flee=function(){
    if(this.loc.distance(snakes[0].loc)<50){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        this.loc.x=x;
        this.loc.y=y;
    }
}
Target.prototype.checkEdges=function(){
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