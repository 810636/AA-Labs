function World() {
  //  this is our main Canvas that will show only a small portion of the world
  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  //This smaller canvas will show the entire world at one forth the size of the main canvas
  this.cnvMini = document.getElementById('cnv2');
  this.ctxMini = this.cnvMini.getContext('2d');
  //  Create a Vector that will move the Canvas location relative to the world
  this.cnvMainLoc = new JSVector(0, 0);

  this.dims = {//  object leteral that prvides bounds for the entire world
    top: -1500,
    left: -2000,
    bottom: 1500,
    right: 2000,
    width: 4000,
    height: 3000
  }

  this.movers = [];
  this.loadMovers(2800, this.ctxMain, this.ctxMini, this.dims.width, this.dims.height);

  //reduce world to fit inside of mini Canvas
  this.scaleX = this.cnvMini.width/this.cnvMain.width;
  this.scaleY = this.cnvMini.height/this.cnvMain.height;

  // add an event handler such that the a, s, w, d keys
  // will reposition the canvas within the world.
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
}//++++++++++++++++++++++++++++++  end world constructor


// run the world in animation
World.prototype.run = function () {

  this.ctxMain.strokeStyle = 'rgb(255, 0, 255)';//  color of outer border on Main canvas
  this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);//  clear the canvas

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++ run movers
  //  save the context for the main Canvas
  this.ctxMain.save();
  //  move the main canvas inside of the world (translate according to this.cnvMainLoc)
  this.ctxMain.translate(this.cnvMainLoc.x,this.cnvMainLoc.y);
  //  clear the mini rect
  this.ctxMini.clearRect(0,0,this.cnvMini.width,this.cnvMini.height);
  //  save the miniContext
  this.ctxMini.save();
  //  scale world to fit in mini canvas (this.scaleX and this.scaleY)
  this.ctxMain.scale(this.scaleX,this.scaleY);
  //  center rect in the miniCanvas
  //this.ctxMini.rect();
  //  run all of the movers
  this.runMovers();
  //  restore the main and mini contexts
  this.ctxMain.restore();
  this.ctxMini.restore();

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++ Draw the main and mini Canvas with bounds and axes

  // save the main context
  this.ctxMain.save();
  // translate cnvMain according to the location of the canvas in the world
  this.cnvMain.translate(this.cnvMainLoc.x,this.cnvMainLoc.y);
  // draw the bounds of the world in cnvMain

  // Add axis in the main Canvas

  //draw x and y axes on miniMap
  this.ctxMini.moveTo(0,this.cnvMini.height/2);
  this.ctxMini.lineTo(this.cnvMini.width,this.cnvMain.height/2);
  this.ctxMini.moveTo(this.cnvMini.width/2,0);
  this.ctxMini.lineTo(this.cnvMini.width/2,this.cnvMini.height);
  // scale cnvMini - contain the entire world (scaleX, and scaleY)
  this.ctxMini.scale(this.scaleX,this.scaleY);
  //center cnvMini in world

  //outline box inside of cnvMini
  //this.ctxMini.rect(); still need to get coordinates
  this.ctxMini.strokeStyle="red";
  this.ctxMini.stroke();
  //draw x and y axes on miniMap

  // restore both ctxMain and ctxMini
  this.ctxMain.restore();
  this.ctxMini.restore();
}

//  Load mover array
//  Load each context into each Mover
World.prototype.loadMovers = function (numMovers, ctx1, ctx2, w, h) {
  for (let i = 0; i < numMovers; i++) {
    let diam = 10;
    let x = Math.random() * (this.dims.width - 2 * diam) + diam - this.dims.width / 2;
    let y = Math.random() * (this.dims.height - 2 * diam) + diam - this.dims.height / 2;
    let loc = new JSVector(x, y);
    let dx = Math.random() * 2 - 1;
    let dy = Math.random() * 2 - 1;
    let vel = new JSVector(dx, dy);
    //each mover gets a reference to both canvas objects
    this.movers.push(new Mover(loc, vel, diam, ctx1, ctx2, w, h));
  }
}
World.prototype.runMovers=function(){
  for(let i=0;i<this.movers.length;i++){
    this.movers[i].run();
  }
}