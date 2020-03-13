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
        /*this.Top = false;
        this.Bot = false;
        this.Right = false;
        this.Left = false;  */          
    }
    
    create()
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(-this.size + this.dx + this.constX, this.y + this.dy + this.constY);
        ctx.lineTo(this.size + this.dx + this.constX, this.y + this.dy + this.constY);
        ctx.stroke();
        ctx.moveTo(this.x + this.dx + this.constX, -this.size + this.dy + this.constY);
        ctx.lineTo(this.x + this.dx + this.constX, this.size + this.dy + this.constY);
        ctx.stroke();
        ctx.closePath();
    }
    /*
    move(isMove, direction) 
    { 
        if (direction == 0) this.Top = isMove;
        if (direction == 1) this.Bot = isMove;
        if (direction == 2) this.Right = isMove;             
        if (direction == 3) this.Left = isMove;
        if (direction == 4) this.Left = this.Right = this.Top = this.Bot = false;
    }
    
    fix()
    { 
        if(this.Top) this.dy -= 1; 
        if(this.Bot) this.dy += 1; 
        if(this.Right) this.dx += 1; 
        if(this.Left) this.dx -= 1; 
    }*/
    
    grandFix(dx, dy)
    {
        this.dx = dx;
        this.dy = dy;
    }

    constFix(_resX, _resY)
    {
        this.constX += _resX;
        this.constY += _resY;        
    }    

    makeFunc()
    {
        for(let x = 0; x < 20; x++)
        {
            ctx.moveTo(this.x + this.dx + x + 1 + this.constX, this.y + this.dy - (x + 1) * (x + 1) + this.constY);    
            ctx.lineTo(this.x + this.dx + x + 5 + this.constX, this.y + this.dy - (x + 5) * (x + 5) + this.constY);
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

function scale(){                        
   // graph.fix()        

    document.getElementById('data').innerHTML = dataY;
    document.getElementById('dinamic').innerHTML = dinamicY;
    document.getElementById('result').innerHTML = resultY;
    
        
    graph.create();     
    graph.makeFunc();
}

setInterval('scale()', 10);