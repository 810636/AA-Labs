function Ship(x,y){
    this.loc=new JSVector(x,y);
    let dx = Math.random() * (3 + 3 + 1) - 3;
    let dy = Math.random() * (3 + 3 + 1) - 3;
    this.vel=new JSVector(dx,dy);
    this.acc=new JSVector(0,0);
}
Ship.prototype.run=function(){
    this.render();
    this.update();
}
Ship.prototype.render=function(){

}
Ship.prototype.update=function(){
    // steer towards planet this.acc=
    this.vel.add(this.acc);
    this.loc.add(this.vel);
}