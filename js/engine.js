let canvas, ctx, graph;
let dataX = resultX = dinamicX = dataY = resultY = dinamicY = 0; 
let isMove = false;

function init() {
    canvas = document.getElementById('graph');
    canvas.height = window.innerHeight - 100;
    //alert(window.innerHeight - 100);
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
        this.channel = []; 
        this.setY = 0;
    }
    
    create()
    {
        ctx.fillStyle = 'rgb(219, 242, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(-this.size + this.dx + this.constX, this.y + this.dy + this.constY + this.setY);
        ctx.lineTo(this.size + this.dx + this.constX, this.y + this.dy + this.constY + this.setY);
        ctx.stroke();
        ctx.moveTo(this.x + this.dx + this.constX, -this.size + this.dy + this.constY + this.setY);
        ctx.lineTo(this.x + this.dx + this.constX, this.size + this.dy + this.constY + this.setY);
        ctx.stroke();
        ctx.closePath();
    }
    
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
    
    showConst(is_x)
    {
        if(is_x) return this.constX;
        else return this.constY + this.setY;
    }

    setChannel(_channel)
    {
        this.channel = _channel;
        this.setY = this.channel[1];
        this.constX = this.constY = 0;
    }

    makeFunc()
    {
        this.channel[0] = 3;
        let step = this.channel[0];
        for(let i = 1; i < this.channel.length - 1; i++) 
        {   
            //if (((Math.abs(this.setY + this.constY + 0 - this.channel[i]) < canvas.height / 2) || (Math.abs(this.setY + this.constY + 0 - this.channel[i + 1]) < canvas.height / 2)) &&
            if((Math.abs(this.constX + step + this.dx) < canvas.width / 2) || (Math.abs(this.constX + step  + this.dx - this.channel[0]) < canvas.width / 2))//)
            {
                ctx.moveTo(step - this.channel[0] + this.x +  this.dx + this.constX, -this.channel[i] + this.y + this.dy + this.constY + this.setY);
                ctx.lineTo(step + this.x + this.dx + this.constX, -this.channel[i + 1] + this.y + this.dy + this.constY + this.setY);
                ctx.stroke();
            }         
            
            step += this.channel[0];
        }
                
    }
}
    

function choosGraph(_channel)
{
    graph.setChannel(_channel);
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
    dinamicX = event.pageX;
    dinamicY = event.pageY;
    if(isMove) 
    {                        
        graph.grandFix(dinamicX - dataX, dinamicY - dataY)
        
    }
    else
    {
        dataX = event.pageX;
        dataY = event.pageY;
    }    
}

function scale()
{                          
    graph.create();     
    graph.makeFunc();
    if (!isMove)
    {
        document.getElementById('coord_x').innerHTML = -graph.showConst(true);// + dinamicX - canvas.width / 2;
        document.getElementById('coord_y').innerHTML = graph.showConst(false);// - dinamicY + canvas.height / 2 + 96;    
    }    
}

setInterval('scale()', 10);