function ParticleSystem(x,y){
    this.loc=new JSVector(x,y);
    this.particles=[];
}
ParticleSystem.prototype.run=function(){
    this.render();
    this.checkDeath();
}
ParticleSystem.prototype.add=function(){
    let x=this.loc.x+Math.random()*20-10;
    let y=this.loc.y+Math.random()*20-10;
    //adjust starting position more
    let s=Math.floor(Math.random()*2);
    let c=Math.floor(Math.random()*10);
    this.particles.push(x,y,s,c,this);
}
ParticleSystem.prototype.render=function(){
    for(let i=0;i<this.particles.length;i++){
        this.particles[i].render();
    }
    //render some icon for PS itself
}
ParticleSystem.prototype.checkDeath=function(){
    for(let i=this.particles.length-1;i>=0;i--){
        if(this.particles[i].hp<=0){
            this.particles.splice(i,1);
        }
    }
}