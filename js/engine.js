let canvas, ctx, graph, canvasTable, channelNumberLocal, graphDiv, globalInterval;

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
    if(graphDiv.childNodes.length == 0) graphDiv.style.height = '225px';
    if(graphDiv.childNodes.length == 3) graphDiv.style.height = '377px';
    if(graphDiv.childNodes.length == 4) graphDiv.style.height = '530px';
    if(graphDiv.childNodes.length == 5) graphDiv.style.height = '685px';    
    /*let a = Number(graphDiv.style.height.slice(0, 3)) + 160;
    if (a < 600)graphDiv.style.height = String(a) + 'px';
    else graphDiv.style.height = '626px';

    let dio = document.createElement('canvas');
    dio.width = 100;
    dio.height = 150;
    document.getElementById('dio').appendChild(dio);
*/

    canvas = document.createElement('canvas');
    canvas.width = globalCanvasWidth;
    canvas.height = 150;
    canvas.id = "canvas_" + channelNumber;            

    canvas.addEventListener('contextmenu', function(){choosGraphLocal(this); return false}, false)//здесь должен быть реализован выбор осциллограммы    
    canvas.addEventListener('mousedown', function(){mouseDown(1)})
    canvas.addEventListener('mousemove', function(){changeData(1)})
    canvas.addEventListener('mouseup', function(){mouseUp(1)})

    canvas.oncontextmenu = new Function('return false;');
            

    let y_min = 9999999999999999999999999999;
    let y_max = -9999999999999999999999999999;
    let channel = graphTable[channelNumber];
    
    for(let j = 1; j < channel.length; j++)
    {
        if (channel[j] <= y_min) y_min = channel[j];
        if (channel[j] >= y_max) y_max = channel[j];        
    }
    
    let height = y_max - y_min;//почему не по модулю? Подоздрительно, проверь на бумаге   
    let constY = canvas.height / height;     

    let C = (height - y_max) * constY;
    let x = canvas.width / (channel.length - 1)
    shift = x;        

    if(canvasTable.length == 0) 
    {
        let canvas = document.getElementById('scrolling');
        canvas.height = 30;        
        let ctx = canvas.getContext('2d');
        canvasTable.push(new Scrolling(ctx, canvas));

        let a = document.getElementById('button');
        a.addEventListener('click', function(){
            let c = document.getElementById('canvas_' + channelNumber).getBoundingClientRect();
            alert((c.left));
        });
        
        let coordTop = document.createElement('canvas');
        coordTop.width = globalCanvasWidth + 15;
        coordTop.height = 30;    
        graphDiv.appendChild(coordTop);
        ctxTop = coordTop.getContext('2d');
        canvasTable.push(new Abscise(ctxTop, coordTop, 1 / graphTable[0][0] * 1000, channel.length, x, true))
        

        let b = document.createElement('div');
        graphDiv.appendChild(b);
        canvasTable.push(b);
        globalInterval = setInterval('scale()', 10);    
    }
    

    graphDiv.removeChild(graphDiv.lastChild);
    canvasTable.pop(canvasTable.length);

    graphDiv.appendChild(canvas);    
    ctx = document.getElementById("canvas_" + channelNumber).getContext('2d');
    let graph = new Graph(x, canvas, channel, constY, C, ctx, channelNumber, y_min, y_max);
    canvasTable.push(graph);         
    let coordBot = document.createElement('canvas');
    coordBot.width = 1015;
    coordBot.height = 30;
    
    graphDiv.appendChild(coordBot);    
    ctxBot = coordBot.getContext('2d');
    canvasTable.push(new Abscise(ctxBot, coordBot, 1 / graphTable[0][0] * 1000, channel.length, x, false))      
    
    menuActOff(0);
    return;
   
    /*canvas.height += 150;    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 150);
    ctx.lineTo(canvas.width, canvas.height - 150);
    ctx.stroke();
    ctx.closePath();*/
  
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