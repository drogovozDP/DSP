let canvas, ctx, graph, canvasTable, channelNumberLocal, graphDiv, globalInterval, global_length;

canvasTable = new Array();

let channelNumber = 0;
let canvsaGraph;
let globalCanvasWidth = 1000;
let myScroll;
let shift = 0;
    
function choosGraph(i)
{
    //graph.setChannel(graphTable[i]);
    //canvas.width = 1300;
    //canvas.height = window.innerHeight - 100;
    
    //alert(document.getElementById(i.id))    
    channelNumber = i;
    document.getElementById('menuAction').style.marginTop = event.pageY - 200 + "px";
    document.getElementById('menuAction').style.display = 'block';
}

function choosGraphLocal(i)
{
    channelNumberLocal = i;
    document.getElementById('menuActionGraph').style.marginTop = event.pageY - 200 + "px";
    document.getElementById('menuActionGraph').style.display = 'block';
}

function fixHeight()
{
    if(graphDiv.childNodes.length == 0) graphDiv.style.height = '225px';
    if(graphDiv.childNodes.length == 3) graphDiv.style.height = '377px';
    if(graphDiv.childNodes.length == 4) graphDiv.style.height = '530px';
    if(graphDiv.childNodes.length == 5) graphDiv.style.height = '685px';    
}

function add_listeners(canvas)
{
    //alert(canvas)
    canvas.addEventListener('contextmenu', function(){choosGraphLocal(this); return false}, false)//здесь должен быть реализован выбор осциллограммы    
    canvas.addEventListener('mousedown', function(){mouseDown(1)})
    canvas.addEventListener('mousemove', function(){changeData(1)})
    canvas.addEventListener('mouseup', function(){mouseUp(1)})

    canvas.oncontextmenu = new Function('return false;');
}

function move()
{        
    if (!globalInterval) 
    {        
        globalInterval = setInterval('scale()', 10);      
    }
}

function oscillogram()
{
    let check = true;
    for (let i = 0; i < canvasTable.length; i++) if (canvasTable[i].channelNumber == channelNumber) check = false;
    if (!check) 
    {
        menuActOff(0);
        return;
    }

    graphDiv = document.getElementById('graph');
    fixHeight();

    canvas = document.createElement('canvas');
    canvas.width = globalCanvasWidth;
    canvas.height = 150;
    canvas.id = "canvas_" + channelNumber;            

    add_listeners(canvas);

    let y_min = Number.MAX_VALUE;
    let y_max = -Number.MAX_VALUE;
    let channel = graphTable[channelNumber];
    
    for(let j = 1; j < channel.length; j++)
    {
        if (channel[j] <= y_min) y_min = channel[j];
        if (channel[j] >= y_max) y_max = channel[j];        
    }
    
    let height = y_max - y_min;
    let constY = canvas.height / height;     

    let C = (height - y_max) * constY;
    let x = globalCanvasWidth / (channel.length - 1)
    shift = x;        

    if(graphDiv.children.length == 0) 
    {
        let canvas = document.getElementById('scrolling');
        canvas.height = 30;   
        canvas.addEventListener('mousedown', function(){checkFurye(false)})     
        let ctx = canvas.getContext('2d');
        canvasTable.push(new Scrolling(ctx, canvas, false));       
       
        let coordTop = document.createElement('canvas');
        coordTop.width = globalCanvasWidth + 15;
        coordTop.height = 30;    
        graphDiv.appendChild(coordTop);
        ctxTop = coordTop.getContext('2d');
        canvasTable.push(new Abscise(ctxTop, coordTop, 1 / graphTable[0][0] * 1000, channel.length, x, true, false))
        

        let b = document.createElement('div');
        graphDiv.appendChild(b);
        canvasTable.push(b);
        move();  
    }
    

    graphDiv.removeChild(graphDiv.lastChild);
    canvasTable.pop(canvasTable.length);

    graphDiv.appendChild(canvas);    
    ctx = document.getElementById("canvas_" + channelNumber).getContext('2d');
    let graph = new Graph(canvas, channel, channelNumber, y_min, y_max, false);
    canvasTable.push(graph);         
    let coordBot = document.createElement('canvas');
    coordBot.width = 1015;
    coordBot.height = 30;
    
    graphDiv.appendChild(coordBot);    
    ctxBot = coordBot.getContext('2d');
    canvasTable.push(new Abscise(ctxBot, coordBot, 1 / graphTable[0][0] * 1000, channel.length, x, false, false))              

    menuActOff(0);
    return;
}

function showEverything()
{
    for (let i = 0; i < graphTable.length; i++)
    {
        channelNumber = i
        oscillogram()
    }
}

function showOneHideAll(check)
{
    let j = channelNumber
    for (let i = 0; i < graphTable.length; i++) 
    {
        channelNumber = i
        closeSignal(check)
    }
    channelNumber = j
    oscillogram()
}

function menuActOff(digit)
{    
    if (digit == 0){document.getElementById('menuAction').style.display = 'none'; }
    if (digit == 1){document.getElementById('menuActionGraph').style.display = 'none'; }
}


function sss()
{
    ctx.beginPath();
    ctx.moveTo(0, ctx.height - 150);
    ctx.lineTo(ctx.width, ctx.height - 150);
    ctx.stroke();
    ctx.closePath();
}

function scale()
{                         
    for(let i = 0; i < canvasTable.length; i++) canvasTable[i].create();    
    //if (!isMove){document.getElementById('coord_x').innerHTML = graph.getZoom() * (-graph.getConst(true) + dinamicX - canvas.width / 2);document.getElementById('coord_y').innerHTML = graph.getConst(false) - dinamicY + canvas.height / 2 + 96;}        
}











/*
<div onclick = "menuActOff()">                
    <div onmousedown = 'mouseDown()' onmouseup = 'mouseUp()' onmousemove = 'changeData()' onmousewheel = 'zoom(event)'>
        <canvas width = '23', height='34' id = 'graph'></canvas>                    
    </div>               
</div>

*/