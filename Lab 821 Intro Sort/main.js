
// wait for the page to finish loading with init as the callback
window.addEventListener("load", init);

// global variables
let array=[];

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    array=getRandomArr(0,100,100);
    console.log(array);
    console.log(getAvg(array));
    console.log(getMed(array));
    console.log(getMode(array));
    //animate();      // kick off the animation
}

// every animation cycle
function animate() {
    // erase the HTMLCanvasElement
    
    requestAnimationFrame(animate); // next cycle
}
function getRandomArr(a,b,n){
    let arr=[];
    for(let i=0;i<n;i++){
        arr[i]=Math.floor(Math.random()*(b-a+1)+a);
    }
    return arr;
}

function getAvg(arr){
    let sum=0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    return sum/arr.length;
}

function getMed(arr){
    let sortedArr=arr;
    for(let i=0;i<sortedArr.length;i++){
        for(let j=i+1;j<sortedArr.length;j++){
            if(sortedArr[i]>sortedArr[j]){
                let temp=sortedArr[i];
                sortedArr[i]=sortedArr[j];
                sortedArr[j]=temp;
            }
        }
    }
    console.log(sortedArr);
    if((arr.length%2)==0){
        let mid=arr.length/2;
        let avg=(sortedArr[mid]+sortedArr[mid-1])/2;
        return avg;
    } else {
        let mid=arr.length/2;
        return mid;
    }
}
function getMode(arr){
    let possibleModes=[];
    let countArr=[];
    let modeNum=1;
    for(let i=0;i<=arr.length;i++){
        countArr[i]=0;
    }
    for(let i=0;i<arr.length;i++){
        countArr[arr[i]]++;
    }
    for(let i=0;i<countArr.length;i++){
        if(countArr[i]>modeNum){
            modeNum=countArr[i];
        }
    }
    for(let i=0;i<countArr.length;i++){
        if(countArr[i]==modeNum){
            possibleModes.push(i);
        }
    }
    return possibleModes;
}
