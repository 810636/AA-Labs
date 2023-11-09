
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let snake;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    snake=new Snake(400,400,10,5);
    console.log(snake);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.run();
    requestAnimationFrame(animate); // next cycle
}



