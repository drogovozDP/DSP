let canvas, ctx, graph;
let dataX = resultX = dinamicX = dataY = resultY = dinamicY = 0; 
let isMove = false;

function init() {
    canvas = document.getElementById('graph');
    ctx = canvas.getContext('2d');
    graph = new Graph(canvas.width / 2, canvas.height / 2, 0, 0);       
}
    
Graph = class
{
    constructor(x, y, dx, dy)
    {
        this.size = 1000000;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.constX = 0;
        this.constY = 0;  
        this.zoom = 1;      
    }
    
    create()
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(this.zoom * (-this.size + this.dx + this.constX), this.zoom * (this.y + this.dy + this.constY));
        ctx.lineTo(this.zoom * (this.size + this.dx + this.constX), this.zoom * (this.y + this.dy + this.constY));
        ctx.stroke();
        ctx.moveTo(this.zoom * (this.x + this.dx + this.constX), this.zoom * (-this.size + this.dy + this.constY));
        ctx.lineTo(this.zoom * (this.x + this.dx + this.constX), this.zoom * (this.size + this.dy + this.constY));
        ctx.stroke();
        ctx.closePath();
    }   
    
    grandFix(dx, dy)
    {
        this.dx = dx * 1/this.zoom;
        this.dy = dy * 1/this.zoom;
    }

    constFix(_resX, _resY)
    {
        this.constX += _resX * 1/this.zoom + 100;
        this.constY += _resY * 1/this.zoom + 100;        
    }    

    setZoom(plus)
    {
        if((!plus) && (this.zoom > 0.11)) this.zoom -= 0.1;
        if(plus) this.zoom += 0.1;
    }

    makeFunc()
    {
        for(let x = 0; x < 20; x++)
        {
            ctx.moveTo(this.zoom * (this.x + this.dx + x + 1 + this.constX), this.zoom * (this.y + this.dy - (x + 1) * (x + 1) + this.constY));    
            ctx.lineTo(this.zoom * (this.x + this.dx + x + 5 + this.constX), this.zoom * (this.y + this.dy - (x + 5) * (x + 5) + this.constY));
            ctx.stroke();
        }
                
    }
}
    



function mouseDown() { isMove = true; }
function mouseUp() 
{
    isMove = false; 

    resultX = dinamicX - dataX;
    resultY = dinamicY - dataY;

    graph.constFix(resultX, resultY);    
    graph.grandFix(0, 0);    
    
}

function changeData()
{
    if(isMove) 
    {
        dinamicX = event.pageX;        
        dinamicY = event.pageY;
        graph.grandFix(dinamicX - dataX, dinamicY - dataY)
        
    }
    else
    {
        dataX = event.pageX;
        dataY = event.pageY;
    }    
}

function zoom(zooming)
{
    graph.setZoom(zooming);
}

function scale()
{                              
    document.getElementById('data').innerHTML = dataY;
    document.getElementById('dinamic').innerHTML = dinamicY;
    document.getElementById('result').innerHTML = resultY;
    
        
    graph.create();     
    graph.makeFunc();
}

setInterval('scale()', 10);