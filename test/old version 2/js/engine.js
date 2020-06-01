let canvas, ctx, graph, canvasTable;

canvasTable = new Array();

let channelNumber = 0;
let canvsaGraph;
let globalCanvasWidth = 1000;
let myScroll;
    

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

    let graphDiv = document.getElementById('graph');
    let a = Number(graphDiv.style.height.slice(0, 3)) + 160;
    if (a < 600)graphDiv.style.height = String(a) + 'px';
    else graphDiv.style.height = '626px';
/*
    let dio = document.createElement('canvas');
    dio.width = 100;
    dio.height = 150;
    document.getElementById('dio').appendChild(dio);
*/

    canvas = document.createElement('canvas');
    canvas.width = globalCanvasWidth;
    canvas.height = 150;
    canvas.id = "canvas_" + channelNumber;
    graphDiv.appendChild(canvas);        

    canvas.addEventListener('contextmenu', function(){choosGraphLocal(channelNumber); return false}, false)//здесь должен быть реализован выбор осциллограммы    
    canvas.oncontextmenu = new Function('return false;');

    ctx = document.getElementById("canvas_" + channelNumber).getContext('2d');
    
    menuActOff(0);

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
    let graph = new Graph(x, canvas, channel, constY, C, ctx, channelNumber, y_min, y_max);
    canvasTable.push(graph);       
    if(canvasTable.length == 1) 
    {
        let a = document.getElementById('button');
        a.addEventListener('click', function(){
            let c = document.getElementById('canvas_' + channelNumber).getBoundingClientRect();
            alert((c.left));
        });
       
        setInterval('draw_ordinate()', 10);    
    }
    draw_ordinate();    
    scale();
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

function draw_ordinate()
{
    let range = document.getElementById('canvas_' + canvasTable[0].channelNumber).getBoundingClientRect();
    //console.log(range.left);
    for(let i = 0; i < canvasTable.length; i++) canvasTable[i].ordinate(range.left);    


    document.getElementById('data').innerHTML = dataX;
    document.getElementById('dinamic').innerHTML = dinamicX;
    document.getElementById('result').innerHTML = resultX;
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