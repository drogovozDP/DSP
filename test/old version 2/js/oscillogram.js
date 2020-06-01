Graph = class
{
    constructor(x, canvas, channel, constY, C, ctx, channelNumber, y_min, y_max)
    {        
        this.x = x;
        this.dx = 0;
        this.old_dx = 0;
        this.constX = 0;
        this.constY = constY;
        this.canvas = canvas;        
        this.channel = channel; 
        this.CONST = C;
        this.ctx = ctx;
        this.channelNumber = channelNumber;
        this.current_step = 0;
        this.y_min = y_min;
        this.y_max = y_max;
    }
    


    create()
    {        
        this.canvas.width = globalCanvasWidth;
        this.x = (this.canvas.width - 100)/ (this.channel.length - 1);                     
        this.ctx.beginPath();        
        for(let i = 1; i < this.channel.length; i++)
        {
            this.ctx.moveTo((i - 1) * this.x + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST));
            this.ctx.lineTo(i * this.x + 101, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST));
        }                
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(100, 0, this.canvas.width - 100, this.canvas.height);        
        this.ctx.stroke();        
        this.ctx.closePath();
        this.ordinate();
    } 
    
    ordinate(step)
    {
        if (step < stepStart) stepStart = step;
        this.ctx.beginPath();        
        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(-1000 - this.current_step, 0, 100 + 1000, 150);
        this.ctx.fillStyle = 'rgb(166, 222, 255)';
        this.ctx.fillRect(-1000 - step, 0, 100 + 1000, 150);
        //this.ctx.strokeStyle = "red"
        this.ctx.moveTo(-step + 100 - 1, 0);
        this.ctx.lineTo(-step + 100 - 1, 150);
        this.ctx.font = "14px Verdana";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.y_max, -step + 0, 14)
        this.ctx.fillText(Math.floor(this.y_min + (this.y_max - this.y_min) / 2), -step + 0, 75)
        this.ctx.fillText(this.y_min, -step + 0, 140)
        let x = Math.floor(-step / this.x + 1);
        //console.log(x)        
            
        for(let i = x; i < x + 10; i++)
        {
            this.ctx.moveTo((i - 1) * this.x + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST));
            this.ctx.lineTo((i) * this.x + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST));            
        }                                

        if((-stepStart > -stepEnd) && (!isMove))
        {
            let range = -stepStart + stepEnd + 5;            
            this.ctx.fillStyle = 'rgb(219, 242, 255)';
            this.ctx.fillRect(-stepEnd + 100, 0, range, 150);

            let x = Math.floor((-stepEnd) / this.x + 1);
            let y = Math.floor((-stepStart + 70)/ this.x)
            for(let i = x; i < y; i++)
            {
                this.ctx.moveTo((i - 1) * this.x + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST));
                this.ctx.lineTo((i) * this.x + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST));            
            }                        
        }                

        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        this.ctx.moveTo(-step + 90, 75);            
        this.ctx.lineTo(this.canvas.width, 75);
        this.ctx.stroke();
        this.ctx.closePath();
        this.current_step = step;
    }
    //------------------------------------хуевый-код------------------------------------------------------//
    showConst(){return this.dx}

    ordinate2()
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(this.old_dx + this.constX, 0,this.old_dx +   this.constX + 100, 150);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(this.dx + this.constX, 0, this.dx + this.constX + 100, 150);
        this.ctx.closePath();
        this.old_dx = this.dx;
        
    }
    grandFix(dx)
    {
        this.dx = dx;
    }

    constFix(_resX)
    {
        this.constX += _resX;
    }    
    //------------------------------------хуевый-код------------------------------------------------------//
};

let zooming = 0.1;
function zoom(zoom_plus)
{
    
    if((globalCanvasWidth > 1000) && (!zoom_plus)) globalCanvasWidth /= 2;
    if(zoom_plus) globalCanvasWidth *= 2        
    scale()
    
}
