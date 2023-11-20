
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let snakes,target;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    snakes=[];
    snakes.push(new Snake(Math.random()*canvas.width,Math.random()*canvas.height,20,10));
    target=new Target(Math.random()*canvas.width,Math.random()*canvas.height);
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    target.run();
    runSnakes();
    requestAnimationFrame(animate); // next cycle
}
window.addEventListener("click",addSnake);

function addSnake(sdogtripleP){
    let sl=Math.floor(Math.random()*30)+1;
    let s=Math.floor(Math.random()*20)+1;
    snakes.push(new Snake(sdogtripleP.offsetX,sdogtripleP.offsetY,sl,s));
}

function runSnakes(){
    for(let i=0;i<snakes.length;i++){
        snakes[i].run();
    }
}


