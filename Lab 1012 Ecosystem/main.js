
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let plants=[];

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    context.clearRect(0, 0, canvas.width, canvas.height);
    runPS();
    requestAnimationFrame(animate); // next cycle
}
function runPS(){
    for(let i=0;i<plants.length;i++){
        plants[i].run();
    }
}
function deletePS(){
    for(let i=plants.length-1;i<=0;i--){
        if(plants[i].producing===false&&plants[i].particles.length===0){
            plants.splice(i,1);
        }
    }
}
window.addEventListener("click",addPS);

function addPS(calvinpfeffer){
    plants.push(new Plant(calvinpfeffer.offsetX,calvinpfeffer.offsetY));
}

