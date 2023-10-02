
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);
let bubbles=[];
let ar=0;
let m=new MouseEvent(onmousemove);
// global variables


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    loadBubbles(500);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runBubbles();
    requestAnimationFrame(animate); // next cycle
}
function loadBubbles(n) {
    for (let i = 0; i < n; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = Math.random() * 5 + 5;
        let clr=("rgba(0,255,0,1)");
        bubbles[i] = new Bubble(x, y, r, clr);
    }
}

// move the circle to a new location
function runBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].run();
    }
}
function swapAR(){
    if(ar===0){
        ar=1;
    } else {
        ar=0;
    }
}
window.addEventListener("click",swapAR);

