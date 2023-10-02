
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let canvas, context, x, y, dx, dy, d2x, d2y, radius=15;

function init(){
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
    canvas = document.getElementById("cnv");
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    context = canvas.getContext("2d");
    x = y = 100;    // initial x,y canvas location
    dx = dy = 2;    // velocity in x and y directions
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0,0,canvas.width,canvas.height);
    update();   // update location
    draw();     // render
    requestAnimationFrame(animate); // next cycle
}

// move the circle to a new location
function update() {
    // dx=dy=Math.random()*(8+8+1)-8;
    d2x=d2y=Math.random()*(2+2+1)-2;
    // dx+=d2x;
    // dy+=d2y;
    x += dx;    // update x coordinate of location with x velocity
    y += dy;    // update y coordinate of location with y velocity
    if(x-radius<0||x+radius>canvas.width){
        //dx=-dx;
        dx+=d2x;
        dx=dy=Math.random()*(8+8+1)-8;
    }
    if(y-radius<0||y+radius>canvas.height){
        //dy=-dy;
        dy+=d2y;
        dx=dy=Math.random()*(8+8+1)-8;
    }
}

// render a circle
function draw() {
     // local variable radius of the circle
    // create the circle path
    context.beginPath();    // clear old path
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.strokeStyle = "purple";  // color to fill
    context.fillStyle = "blue";     // color to stroke
    context.fill();     // render the fill
    context.stroke();   // render the stroke
}
