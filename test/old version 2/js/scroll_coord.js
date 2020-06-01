function asdf()
{
    let a = document.getElementById('canvas_0').getBoundingClientRect();
    //a.left = -10;
    let c = document.getElementById('canvas_' + channelNumber).getBoundingClientRect();
    alert(stepStart);
    alert(stepEnd);
    //alert(a.firstChild.offsetLeft);
    
    
    //alert(Number(a.style.left));
}
let dataX = resultX = dinamicX = dataY = resultY = dinamicY = 0; 
let isMove = false;
let stepStart = stepEnd = 0;
let stepArray = [];


function mouseDown() 
{
    stepStart = document.getElementById('canvas_' + channelNumber).getBoundingClientRect().left;
    isMove = true;        
}
function mouseUp() 
{
    stepEnd = document.getElementById('canvas_' + channelNumber).getBoundingClientRect().left;
    //alert(typeof(stepArray[1]))
    //stepArray = [];
    isMove = false; 

    resultX = dinamicX - dataX;

    canvasTable[0].constFix(resultX);    
    canvasTable[0].grandFix(0);    
}

function changeData()
{
    if(isMove) 
    {
        dinamicX = event.pageX;        
        canvasTable[0].grandFix(dinamicX - dataX)
    }
    else
    {
        dataX = event.pageX;
    }    
}