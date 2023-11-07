function Snake(x,y,sNum,sLength){
    this.loc=new JSVector(x,y);
    let dx = Math.random() * (11) - 5;
    let dy = Math.random() * (11) - 5;
    this.vel=new JSVector(dx,dy);
    let d2x = Math.random() * (9) - 4;
    let d2y = Math.random() * (9) - 4;
    this.acc=new JSVector(d2x,d2y);
    let d3x = Math.random() * (5) - 2;
    let d3y = Math.random() * (2) - 2;
    this.jerk=new JSVector(d3x,d3y);
    this.segs=[];
    for(let i=0;i<sNum;i++){
        this.segs.push(new JSVector(0,sLength*i));
    }
}

Snake.prototype.run=function(){
    this.render();
    this.update();
}
Snake.prototype.render=function(){
    context.beginPath();
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.segs[0].loc.x,this.segs[0].loc.y);
    for(let i=1;i<this.segs.length;i++){
        context.lineTo(this.segs[i].loc.x,this.segs[0].loc.y);
    }
    context.strokeStyle="blue";
    context.stroke();
    context.closePath();
}
Snake.prototype.update=function(){
    for(let i=this.segs.length;i>0;i--){
        this.segs[i].loc=this.segs[i-1].loc;
    }
    this.segs[0].loc=this.loc;
    this.acc.add(this.jerk);
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}