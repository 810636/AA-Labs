
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    //so we need a coordinate system outside of the canvas as well as a system on the canvas to render things
    //so if we had 1000x1000 and the canvas is 600x800
    //we need to calculate some sort of offset thing and track things off the canvas
    //offset should be dependent on where the canvas is on the world
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    requestAnimationFrame(animate); // next cycle
}



