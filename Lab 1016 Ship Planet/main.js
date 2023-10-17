
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let ship;
let planet;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    ship=new Ship(200,200);
    planet=new Planet(300,300);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    ship.run();
    planet.run();
    requestAnimationFrame(animate); // next cycle
}



