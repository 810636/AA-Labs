
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let colors=["red","orange","yellow","green","blue","indigo","violet"];
let particleSystems=[];

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
    for(let i=0;i<particleSystems.length;i++){
        particleSystems[i].run();
    }
}
function deletePS(){
    for(let i=particleSystems.length-1;i<=0;i--){
        if(particleSystems[i].producing===false&&particleSystems[i].particles.length===0){
            particleSystems.splice(i,1);
        }
    }
}
window.addEventListener("click",addPS);

function addPS(calvinpfeffer){
    particleSystems.push(new ParticleSystem(calvinpfeffer.offsetX,calvinpfeffer.offsetY));
}

