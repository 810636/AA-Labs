function Particle(x,y,size,shape,hp){
    this.loc=new JSVector(x,y);
    this.size=size;
    this.shape=shape;
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 5;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0.05);
    this.hp=hp;
    this.r=Math.random()*(255-0+1)+1;
    this.g=Math.random()*(255-0+1)+1;
    this.b=Math.random()*(255-0+1)+1;
    this.opacity=1;
    this.angle=0;
}
Particle.prototype.run=function(){
    this.render();
    this.update();
}
Particle.prototype.update=function(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.hp-=1;
    this.opacity=this.hp/600;
    this.angle+=0.05;
    if(this.angle>=(Math.PI*2)){
        this.angle=0;
    }
}
Particle.prototype.render=function(){
    context.save();
    context.translate(this.loc.x,this.loc.y);
    context.beginPath();    // clear old path
    context.rotate(this.angle);
    if(this.shape===0){
        context.arc(0, 0, this.size, 0, 2 * Math.PI);
    } else if(this.shape===1){
        context.rect(0,0,this.size,this.size);
    } else if(this.shape===2){
        context.lineTo(-this.size,this.size);
        context.lineTo(this.size,this.size);
        context.lineTo(0,0);
        context.closePath();
    }
    context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+","+this.opacity+")";
    context.fill();
    context.restore();
}