function Snake(x,y,sNum,sLength){
    this.loc=new JSVector(x,y);
    let dx = Math.random() * (11) - 5;
    let dy = Math.random() * (11) - 5;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0);
    this.segments=[];
    for(let i=0;i<sNum;i++){
        this.segments.push(new JSVector(this.loc.x,this.loc.y+sLength*i));
    }
    let r=Math.random()*(255-0+1)+1;
    let g=Math.random()*(255-0+1)+1;
    let b=Math.random()*(255-0+1)+1;
    this.clr="rgb("+r+","+g+","+b+",";
}

Snake.prototype.run=function(){
    this.checkEdges();
    this.render();
    this.update();
}
Snake.prototype.render=function(){
    let opacity=1;
    context.beginPath();
    context.lineCap="round";
    context.moveTo(this.loc.x,this.loc.y);
    context.lineTo(this.segments[0].x,this.segments[0].y);
    
    for(let i=1;i<this.segments.length;i++){
        context.lineTo(this.segments[i].x,this.segments[i].y);
        context.lineWidth=5*(1-i/this.segments.length);
        opacity=1-(i/this.segments.length)*0.7;
        context.strokeStyle=this.clr+opacity+")";
        context.stroke();
    }

    context.closePath();
}
Snake.prototype.update=function(){
    for(let i=this.segments.length-1;i>0;i--){
        this.segments[i].x=this.segments[i-1].x;
        this.segments[i].y=this.segments[i-1].y;
    }
    this.segments[0]=this.loc;
    this.acc=JSVector.subGetNew(target.loc,this.loc);
    this.acc.normalize();
    this.acc.multiply(0.2);
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.loc.add(this.vel);
}
Snake.prototype.checkEdges=function(){
    if(this.loc.x<0||this.loc.x>canvas.width){
        this.vel.multiply(-1);
    }
    if(this.loc.y<0||this.loc.y>canvas.height){
        this.vel.multiply(-1);
    }
}