function ParticleSystem(x,y){
    this.loc=new JSVector(x,y);
    this.particles=[];
}
ParticleSystem.prototype.run=function(){
    this.add();
    this.runParticles();
    this.checkDeath();
}
ParticleSystem.prototype.add=function(){
    let x=this.loc.x+Math.random()*20-10;
    let y=this.loc.y+Math.random()*20-10;
    //adjust starting position more
    let s=Math.floor(Math.random()*2);
    let c=Math.floor(Math.random()*colors.length);
    let hp=Math.random()*(600-500+1)+500;
    this.particles.push(new Particle(x,y,5,s,hp));
}
ParticleSystem.prototype.runParticles=function(){
    for(let i=0;i<this.particles.length;i++){
        this.particles[i].run();
    }
}
ParticleSystem.prototype.checkDeath=function(){
    for(let i=this.particles.length-1;i>=0;i--){
        if(this.particles[i].hp<=0||this.particles[i].loc.y>canvas.height){
            this.particles.splice(i,1);
        }
    }
}