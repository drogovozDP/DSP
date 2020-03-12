let ctx, graph;
let data = 0; 
let dinamic = 0;       
let isMove = false;

function init() {
    ctx = document.getElementById('draw').getContext('2d');       
    graph = new Graph(500, 500, 0, 0);    
}
    
Graph = class
{
    constructor(x, y, dx, dy)
    {
        this.size = 10000;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.Top = false;
        this.Bot = false;
        this.Right = false;
        this.Left = false;            
    }
    
    create()
    {
        ctx.beginPath();
        ctx.moveTo(-this.size + this.dx, 500 / 2 + this.dy);
        ctx.lineTo(this.size + this.dx, 500/2 + this.dy);
        ctx.stroke();
        ctx.moveTo(500/2 + this.dx, -this.size + this.dy);
        ctx.lineTo(500/2 + this.dx, this.size + this.dy);
        ctx.stroke();
        ctx.closePath();
    }
    
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
    }

    makeFunc()
    {
        for(let x = 0; x < 20; x++)
        {
            ctx.moveTo(500/2 + this.dx + x + 1, 500/2 + this.dy - (x + 1) * (x + 1));    
            ctx.lineTo(500/2 + this.dx + x + 5, 500/2 + this.dy - (x + 5) * (x + 5));
            ctx.stroke();
        }
                
    }
}
    


/*
function mouseDown() { isMove = true; }
function mouseUp() { isMove = false; }

function changeData()
{
    if(!isMove) return;
    data = event.pageX
}*/

function scale(){                        
    graph.fix()        

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
    graph.create();     
    graph.makeFunc();
}

setInterval('scale()', 10);