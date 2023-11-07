function Snake(x,y,sNum,sLength){
    this.loc=new JSVector(x,y);
    this.segs=[];
}

Snake.prototype.run=function(){
    this.render();
    this.update();
}
Snake.prototype.render=function(){

}
Snake.prototype.update=function(){

}