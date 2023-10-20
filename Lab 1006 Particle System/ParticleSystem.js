function ParticleSystem(x,y){
    this.loc=new JSVector(x,y);
    this.particles=[];
    this.producing=true;
    this.hp=300; //seconds of survival *60
}
ParticleSystem.prototype.run=function(){
    this.add();
    this.runParticles();
    this.checkParticleDeath();
    this.decay();
}
ParticleSystem.prototype.add=function(){
    if(this.producing){
        let x=this.loc.x+Math.random()*20-10;
        let y=this.loc.y+Math.random()*20-10;
        //adjust starting position more
        let s=Math.floor(Math.random()*3);
        let hp=Math.random()*(600-500+1)+500;
        this.particles.push(new Particle(x,y,5,s,hp));
    }
}
ParticleSystem.prototype.runParticles=function(){
    for(let i=0;i<this.particles.length;i++){
        this.particles[i].run();
    }
}
ParticleSystem.prototype.checkParticleDeath=function(){
    for(let i=this.particles.length-1;i>=0;i--){
        if(this.particles[i].hp<=0||this.particles[i].loc.y>canvas.height||this.particles[i].loc.x<0||this.particles[i].loc.x>canvas.width){
            this.particles.splice(i,1);
        }
    }
}
ParticleSystem.prototype.decay=function(){
    this.hp--;
    if(this.hp===0){
        this.producing=false;
    }
}