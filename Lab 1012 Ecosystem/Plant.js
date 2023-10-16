function Plant(x,y){
    this.loc=new JSVector(x,y);
    this.particles=[];
    this.producing=true;
    this.hp=1200; //seconds of survival *60
}
Plant.prototype.run=function(){
    if(this.hp%120===0){
        this.add();
    }
    this.runParticles();
    this.checkParticleDeath();
    this.decay();
}
Plant.prototype.add=function(){
    if(this.producing){
        let x=this.loc.x+Math.random()*20-10;
        let y=this.loc.y+Math.random()*20-10;
        //adjust starting position more
        let size=Math.floor(Math.random()*5)+6;
        let s=Math.floor(Math.random()*2);
        let hp=Math.random()*(600-500+1)+500;
        this.particles.push(new Particle(x,y,size,s,hp));
    }
}
Plant.prototype.runParticles=function(){
    for(let i=0;i<this.particles.length;i++){
        this.particles[i].run();
    }
}
Plant.prototype.checkParticleDeath=function(){
    for(let i=this.particles.length-1;i>=0;i--){
        if(this.particles[i].hp<=0||this.particles[i].loc.y>canvas.height||this.particles[i].loc.x<0||this.particles[i].loc.x>canvas.width){
            this.particles.splice(i,1);
        }
    }
}
Plant.prototype.decay=function(){
    this.hp--;
    if(this.hp===0){
        this.producing=false;
    }
}
Plant.prototype.render=function(){
    
}