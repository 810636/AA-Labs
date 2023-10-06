function Particle(x,y,size,shape, clr,ps){
    this.loc=new JSVector(x,y);
    this.size=size;
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 3;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0.1);
    this.ps=ps;
    this.hp=600;
}
Particle.prototype.run=function(){
    this.render();
    this.update();
}
Particle.prototype.update=function(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.hp-=1;
}
Particle.prototype.render=function(){
    
}