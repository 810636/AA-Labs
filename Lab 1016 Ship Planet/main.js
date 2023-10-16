
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    requestAnimationFrame(animate); // next cycle
}



