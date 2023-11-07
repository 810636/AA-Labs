function World() {
  //Main canvas showing part of world 
  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  //Mini canvas showing the whole world 
  this.cnvMini = document.getElementById('cnv2');
  this.ctxMini = this.cnvMini.getContext('2d');
  //move Canvas relative to the world 
  this.cnvMainLoc = new JSVector(0, 0);
  //object holding limits of the whole world 
  this.dims = {
      top: -1500,
      left: -2000,
      bottom: 1500,
      right: 2000,
      width: 4000,
      height: 3000
  }
  //create bubbles 
  this.movers = [];
  this.loadMovers(100, this.ctxMain, this.ctxMini, this.dims.width, this.dims.height);
  //make world fit in Mini canvas 
  this.scaleX = this.cnvMini.width/this.dims.width;
  this.scaleY = this.cnvMini.height/this.dims.height;
  //make Main canvas move in world with wasd keys 
  window.addEventListener("keypress", function (event) {
      switch (event.code) {
        case "KeyW":
                if (world.cnvMainLoc.y + 100 > world.dims.top)
                    world.cnvMainLoc.y -= 20;
                break;
            case "KeyS":
                if (world.cnvMainLoc.y + world.cnvMain.height - 100 < world.dims.bottom)
                    world.cnvMainLoc.y += 20;
                break;
            case "KeyA":
                if (world.cnvMainLoc.x + 100 > world.dims.left)
                    world.cnvMainLoc.x -= 20;
                break;
            case "KeyD":
                if (world.cnvMainLoc.x + world.cnvMain.width - 100 < world.dims.right)
                    world.cnvMainLoc.x += 20;
                break;
      }
  }, false);
}

World.prototype.run = function(){
  //clear the canvas
  this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);
  this.ctxMini.clearRect(0, 0, this.cnvMini.width, this.cnvMini.height);
//  save the ctx for the main Canvas
    this.ctxMain.save();
//  move the main canvas inside of the world (translate according to this.cnvMainLoc)
    this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
//  clear the mini rect

//  save the minictx
    this.ctxMini.save();
//  scale world to fit in mini canvas (this.scaleX and this.scaleY)
    this.ctxMini.scale(this.scaleX, this.scaleY);//seems to shrink main canvas on itself
//  center rect in the miniCanvas
    this.ctxMini.translate(this.dims.width/2, this.dims.height/2);
//  run all of the movers
    for(let i = 0; i<this.movers.length; i++){
      this.movers[i].run();
    }
//  restore the main and mini ctxs
  this.ctxMini.restore();
  this.ctxMain.restore();
//+++    Draw the main and mini Canvas with bounds and axes

// save the main ctx
  this.ctxMain.save();
// translate cnvMain according to the location of the canvas in the world
  this.ctxMain.translate(this.cnvMainLoc.x,this.cnvMainLoc.y);
// draw the bounds of the world in cnvMain
  this.ctxMain.beginPath();
  this.ctxMain.rect(this.dims.left,this.dims.top,this.dims.width,this.dims.height);
  this.ctxMain.lineWidth=40;
  this.ctxMain.strokeStyle="white";
  this.ctxMain.stroke();
  this.ctxMain.closePath();
  this.ctxMain.strokeStyle="black";
// Add axis in the main Canvas
  this.ctxMain.beginPath(); 
  this.ctxMain.moveTo(this.dims.left, this.dims.height/2+this.dims.top);
  this.ctxMain.lineTo(this.dims.right, this.dims.height/2+this.dims.top);
  this.ctxMain.closePath();
  this.ctxMain.lineWidth = 20;
  this.ctxMain.stroke();
  this.ctxMain.beginPath();
  this.ctxMain.moveTo(this.dims.width/2-this.dims.right, this.dims.top);
  this.ctxMain.lineTo(this.dims.width/2-this.dims.right, this.dims.bottom);
  this.ctxMain.closePath();
  this.ctxMain.lineWidth = 20;
  this.ctxMain.stroke();

//center cnvMini in world
  //draw x and y axes on miniMap
  this.ctxMini.beginPath(); 
  this.ctxMini.moveTo(this.dims.left, this.cnvMini.height/2);
  this.ctxMini.lineTo(this.dims.right, this.cnvMini.height/2);
  this.ctxMini.closePath();
  this.ctxMini.lineWidth = 20*this.scaleY;
  
  this.ctxMini.stroke();
  this.ctxMini.beginPath();
  this.ctxMini.moveTo(this.cnvMini.width/2, this.dims.top);
  this.ctxMini.lineTo(this.cnvMini.width/2, this.dims.bottom);
  this.ctxMini.closePath();
  this.ctxMini.lineWidth = 20*this.scaleX;
  this.ctxMini.stroke();
//outline box inside of cnvMini
//box slides the opposite direction of keys
  this.ctxMini.save();
  this.ctxMini.translate(this.cnvMini.width/2,this.cnvMini.height/2);
  this.ctxMini.beginPath(); //draws border mini
  this.ctxMini.moveTo(this.cnvMainLoc.x*this.scaleX, this.cnvMainLoc.y*this.scaleY);
  this.ctxMini.lineTo(this.cnvMainLoc.x*this.scaleX+this.cnvMain.width*this.scaleX,this.cnvMainLoc.y*this.scaleY);
  this.ctxMini.lineTo(this.cnvMainLoc.x*this.scaleX+this.cnvMain.width*this.scaleX,this.cnvMainLoc.y*this.scaleY+this.cnvMain.height*this.scaleY);
  this.ctxMini.lineTo(this.cnvMainLoc.x*this.scaleX,this.cnvMainLoc.y*this.scaleX+this.cnvMain.height*this.scaleY);
  this.ctxMini.lineTo(this.cnvMainLoc.x*this.scaleX, this.cnvMainLoc.y*this.scaleY);
  this.ctxMini.closePath();
  this.cnvMini.strokeStyle="red";
  this.ctxMini.lineWidth = 20*this.scaleX;
  this.ctxMini.stroke();
// restore both ctxMain and ctxMini
  this.ctxMain.restore();
  this.ctxMini.restore();
}


World.prototype.loadMovers = function (number, ctx1, ctx2, width, height) {
  for (let i = 0; i < number; i++) {
      let diam = 20;
      let x = Math.random() * (this.dims.width - 2 * diam) + diam - this.dims.width / 2;
      let y = Math.random() * (this.dims.height - 2 * diam) + diam - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let vel = new JSVector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
      this.movers.push(new Mover(loc, vel, diam, ctx1, ctx2, width, height));
  }
}