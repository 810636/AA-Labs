function Particle(x,y,size,shape,hp){
    this.loc=new JSVector(x,y);
    this.size=size;
    this.shape=shape;
    let dx = Math.random() * (1 + 1 + 1) - 1;
    let dy = Math.random() * (1 + 1 + 1) - 1;
    this.vel=new JSVector(dx,dy);
    this.hp=hp;
    this.r=Math.random()*(150-0+1)+1;
    this.g=255
    this.b=Math.random()*(150-0+1)+1;
    this.opacity=1;
}
Particle.prototype.run=function(){
    this.render();
    this.update();
}
Particle.prototype.update=function(){
    if(this.opacity<0.6){
        this.vel.setMagnitude(0);
        return;
    }
    this.loc.add(this.vel);
    this.hp-=1;
    this.opacity=this.hp/600;
}
Particle.prototype.render=function(){
    if(this.shape===0){
        context.beginPath();
        context.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI);
        context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+","+this.opacity+")";
        context.fill();
    } else if(this.shape===1){
        context.beginPath();
        context.rect(this.loc.x,this.loc.y,this.size,this.size);
        context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+","+this.opacity+")";
        context.fill();
    }
}