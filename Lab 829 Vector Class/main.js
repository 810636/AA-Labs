
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    let v1 = new JSVector(4, 4);
    console.log(v1.toString());
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    
    requestAnimationFrame(animate); // next cycle
}



