function Snake(x,y,sNum,sLength){
    this.loc=new JSVector(x,y);
    let dx = Math.random() * (11) - 5;
    let dy = Math.random() * (11) - 5;
    this.vel=new JSVector(dx,dy);
    let d2x = Math.random() * (3) - 1;
    let d2y = Math.random() * (3) - 1;
    this.acc=new JSVector(d2x,d2y);
    let d3x = Math.random() * (1) - 0.5;
    let d3y = Math.random() * (1) - 0.5;
    this.jerk=new JSVector(d3x,d3y);
    this.segs=[];
    for(let i=0;i<sNum;i++){
        this.segs.push(new JSVector(this.loc.x,this.loc.y+sLength*i));
    }
}

Snake.prototype.run=function(){
    this.render();
    this.update();
}
Snake.prototype.render=function(){
    context.beginPath();
    context.rect(this.loc.x,this.loc.y,50,50);
    context.fillStyle="orange";
    context.fill();
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.segs[0].x,this.segs[0].y);
    for(let i=1;i<this.segs.length;i++){
        context.lineTo(this.segs[i].x,this.segs[0].y);
    }
    context.strokeStyle="blue";
    context.stroke();
    context.closePath();
}
Snake.prototype.update=function(){
    for(let i=this.segs.length-1;i>0;i--){
        //this.segs[i]=this.segs[i-1];
    }
    this.segs[0]=this.loc;
    this.acc.add(this.jerk);
    this.jerk.limit(0.5)
    this.vel.add(this.acc);
    this.acc.limit(2);
    this.vel.limit(5);
    this.loc.add(this.vel);
}