
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let snake,target;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    snake=new Snake(400,400,20,10);
    target=new Target(100,100);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    target.run();
    snake.run();
    requestAnimationFrame(animate); // next cycle
}



