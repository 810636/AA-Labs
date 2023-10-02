
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);
let movers=[];
// global variables


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadBubbles(5);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runMovers();
    requestAnimationFrame(animate); // next cycle
}
function loadBubbles(n) {
    for (let i = 0; i < n; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = Math.random() * 10 + 1;
        let o=Math.random()*5+5;
        let clr=("rgba(0,255,0,1)");
        movers[i] = new Mover(x, y, r, clr,o);
    }
}

// move the circle to a new location
function runMovers() {
    for (let i = 0; i < movers.length; i++) {
        movers[i].run();
    }
}


