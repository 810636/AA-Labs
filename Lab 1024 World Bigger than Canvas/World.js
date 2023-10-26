function World() {
  //Main canvas showing part of world 
  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  //Mini canvas showing the whole world 
  this.cnvMini = document.getElementById('cnv2');
  this.ctxMini = this.cnvMini.getContext('2d');
  //move Canvas relative to the world 
  this.canvasMainLoc = new JSVector(0, 0);
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
              if (world.canvasMainLoc.y + 100 > world.dims.top)
                  world.canvasMainLoc.y -= 20;
              break;
          case "KeyS":
              if (world.canvasMainLoc.y + world.cnvMain.height - 100 < world.dims.bottom)
                  world.canvasMainLoc.y += 20;
              break;
          case "KeyA":
              if (world.canvasMainLoc.x + 100 > world.dims.left)
                  world.canvasMainLoc.y -= 20;
              break;
          case "KeyD":
              if (world.canvasMainLoc.x + world.cnvMain.width - 100 < world.dims.right)
                  world.canvasMainLoc.y += 20;
              break;
      }
  }, false);
}

World.prototype.run = function(){
  //clear the canvas
  this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);

  //run bubbles 
  for(let i = 0; i<this.movers.length; i++){
      this.movers[i].run();
  }
//  save the ctx for the main Canvas
    this.ctxMain.save();
//  move the main canvas inside of the world (translate according to this.cnvMainLoc)
    this.ctxMain.translate(-this.canvasMainLoc.x, -this.canvasMainLoc.y);
//  clear the mini rect
    this.ctxMini.clearRect(0, 0, this.cnvMini.width, this.cnvMini.height);
//  save the minictx
    this.ctxMini.save();
//  scale world to fit in mini canvas (this.scaleX and this.scaleY)
    this.ctxMain.scale(this.scaleX, this.scaleY);
//  center rect in the miniCanvas
    this.ctxMini.translate(this.ctxMain.width/2, this.ctxMain.height/2);
//  run all of the movers
    for(let i = 0; i<this.movers.length; i++){
      this.movers[i].run();
    }
//  restore the main and mini ctxs
  this.ctxMini.restore();
  this.ctxMain.restore();
//+++    Draw the main and mini Canvas with bounds and axes
  this.ctxMain.save();
  this.ctxMain.translate(this.canvasMainLoc.x, this.canvasMainLoc.y);

// save the main ctx
  this.ctxMain.save();
// translate cnvMain according to the location of the canvas in the world

// draw the bounds of the world in cnvMain
  this.ctxMain.restore();
// Add axis in the main Canvas
  this.ctxMain.beginPath(); 
  this.ctxMain.moveTo(this.dims.left, 0);
  this.ctxMain.lineTo(this.dims.right, 0);
  this.ctxMain.closePath();
  this.ctxMain.lineWidth = 20;
  this.ctxMain.stroke();
  this.ctxMain.beginPath();
  this.ctxMain.moveTo(0, this.dims.top);
  this.ctxMain.lineTo(0, this.dims.bottom);
  this.ctxMain.closePath();
  this.ctxMain.lineWidth = 20;
  this.ctxMain.stroke();
//draw x and y axes on main Map
  
// scale cnvMini - contain the entire world (scaleX, and scaleY)

//center cnvMini in world

//outline box inside of cnvMini
  this.ctxMini.beginPath(); //draws border mini
  this.ctxMini.moveTo(this.canvasMainLoc.x, this.canvasMainLoc.y);
  this.ctxMini.lineTo(this.canvasMainLoc.x, this.canvasMainLoc.y+this.cnvMain.height);
  this.ctxMini.lineTo(this.canvasMainLoc.x + this.cnvMain.width, this.canvasMainLoc.y+this.cnvMain.height);
  this.ctxMini.lineTo(this.canvasMainLoc.x + this.cnvMain.width, this.canvasMainLoc.y);
  this.ctxMini.closePath();
  this.ctxMini.lineWidth = 20;
  this.ctxMini.stroke();
//draw x and y axes on miniMap
  this.ctxMini.beginPath(); 
  this.ctxMini.moveTo(this.dims.left, 0);
  this.ctxMini.lineTo(this.dims.right, 0);
  this.ctxMini.closePath();
  this.ctxMini.lineWidth = 20;
  this.ctxMini.stroke();
  this.ctxMini.beginPath();
  this.ctxMini.moveTo(0, this.dims.top);
  this.ctxMini.lineTo(0, this.dims.bottom);
  this.ctxMini.closePath();
  this.ctxMini.lineWidth = 20;
  this.ctxMini.stroke();
// restore both ctxMain and ctxMini



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