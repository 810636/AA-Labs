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
    this.segments=[];
    for(let i=0;i<sNum;i++){
        this.segments.push(new JSVector(this.loc.x,this.loc.y+sLength*i));
    }
    this.oCount=0;
}

Snake.prototype.run=function(){
    this.checkEdges();
    this.render();
    this.update();
}
Snake.prototype.render=function(){
    context.beginPath();
    context.rect(this.loc.x,this.loc.y,5,5);
    context.fillStyle="orange";
    context.fill();
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.segments[0].x,this.segments[0].y);
    for(let i=1;i<this.segments.length;i++){
        context.lineTo(this.segments[i].x,this.segments[i].y);
    }
    context.strokeStyle="blue";
    context.stroke();
    context.closePath();
}
Snake.prototype.update=function(){
    for(let i=this.segments.length-1;i>0;i--){
        this.segments[i].x=this.segments[i-1].x;
        this.segments[i].y=this.segments[i-1].y;
    }
    this.segments[0]=this.loc;
    this.acc.add(this.jerk);
    this.jerk.limit(0.5)
    this.vel.add(this.acc);
    this.acc.limit(2);
    let omega=Math.random()*(2*Math.PI/3+1)+Math.PI/3;
    if((this.oCount%240)===0){
        this.vel.rotate(omega);
    }
    this.oCount++;
    this.vel.limit(5);
    this.loc.add(this.vel);
}
Snake.prototype.checkEdges=function(){
    if(this.loc.x<0){
        //this.vel.multiply(-1);
        this.loc.x=canvas.width;
    } else if(this.loc.x>canvas.width){
        //this.vel.multiply(-1);
        this.loc.x=0;
    }
    if(this.loc.y<0){
        //this.vel.multiply(-1);
        this.loc.y=canvas.height;
    }else if(this.loc.y>canvas.height){
        //this.vel.multiply(-1);
        this.loc.y=0;
    }
}