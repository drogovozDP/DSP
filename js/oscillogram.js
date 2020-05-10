Graph = class
{
    constructor(x, canvas, channel, constY, C, ctx, channelNumber, y_min, y_max)
    {        
        this.x = x;
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
    
    setScale(max, min)
    {
        let height = max - min;//почему не по модулю? Подоздрительно, проверь на бумаге   
        this.constY = this.canvas.height / height;     
        this.CONST = (height - max) * this.constY;
    }

    create()
    {        
        this.ctx.beginPath();        
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(100, 0, this.canvas.width - 100, this.canvas.height); 
        
        let ordMax = this.y_max;
        let ordMin = this.y_min;
        
        if(globalScale)
        {            
            this.setScale(this.y_max, this.y_min)
            for(let i = 1; i < this.channel.length; i++)
            {
                let a = ((i - 1) * this.x + dx + constX) * zooming + 100;
                let b = (i * this.x + dx + constX) * zooming + 100;
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000)))
                {
                    this.ctx.moveTo(((i - 1) * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST));
                    this.ctx.lineTo((i * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST));
                }                
            }                         
        }
        
        else
        {
            let first = true;
            for(let i = 1; i < this.channel.length; i++)
            {
                let a = ((i - 1) * this.x + dx + constX) * zooming + 100;
                let b = (i * this.x + dx + constX) * zooming + 100;
                if((((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000))) && (first))
                {
                    first = false;
                    let localLength = i;
                    let c = a
                    let d = b
                    let y_min = 9999999999999999999999999999;
                    let y_max = -9999999999999999999999999999;
                    while (((c > 100) && (c <= 1000)) || ((d > 100) && (d <= 1000)))
                    {                        
                        if (this.channel[localLength] <= y_min) y_min = this.channel[localLength];
                        if (this.channel[localLength] >= y_max) y_max = this.channel[localLength];        
                        localLength++
                        c = ((localLength - 1) * this.x + dx + constX) * zooming + 100;
                        d = (localLength * this.x + dx + constX) * zooming + 100;
                    }
                    this.setScale(y_max, y_min); 
                    ordMax = y_max;
                    ordMin = y_min;        
                }
        
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000)))
                {
                    this.ctx.moveTo(((i - 1) * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST));
                    this.ctx.lineTo((i * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST));
                }
            }
        }
        
        
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();               
        this.ctx.closePath(); 

        if(isZoom)
        {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'red';
            this.ctx.moveTo(zoom_const, 0);
            this.ctx.lineTo(zoom_const, 150);
            this.ctx.moveTo(zoom_dx, 0);
            this.ctx.lineTo(zoom_dx, 150);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        let end = Math.ceil((zooming * 1000) / 250);          
       //console.log(((this.channel.length - 1) * this.x + dx + constX) * zooming + 100, ' ' , (end * 250) + (dx + constX) * zooming + 100)                         
        for (let i = 0; i <= end; i++)
        {
            let a = (i * 250) + (dx + constX) * zooming + 100;
            if ((a > 0) && (a < 1000))
            {
                this.ctx.moveTo(((i * 250) / zooming + dx + constX) * zooming + 100, 0,);
                this.ctx.lineTo(((i * 250) / zooming + dx + constX) * zooming + 100, 150);                
            }            
//            console.log(a);
        }                
        
        
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.ordinate(ordMax, ordMin);          
    } 
    
    ordinate(max, min)
    {
        this.ctx.beginPath();        
        this.ctx.strokeStyle = 'black'
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(0, 0, 100, 150);
        this.ctx.fillStyle = 'rgb(166, 222, 255)';
        this.ctx.fillRect(0, 0, 100, 150);
        this.ctx.moveTo(99, 0);
        this.ctx.lineTo(99, 150);
        this.ctx.font = "14px Verdana";
        this.ctx.fillStyle = 'black';
    /*
        let y1 = String(this.y_max);
        for(let i = Math.floor(y1.length / 2); i < y1.length; i++) {y1 = y1.replace(y1[i], "0");}                
        this.ctx.fillText(y1, 0, this.canvas.height - (Number(y1) * this.constY + this.CONST) + 14)

        y1 = String(Math.floor(this.y_min + (this.y_max - this.y_min) / 2));
        for(let i = Math.floor(y1.length / 2); i < y1.length; i++) {y1 = y1.replace(y1[i], "0");}                
        this.ctx.fillText(y1, 0, this.canvas.height - (Number(y1) * this.constY + this.CONST) - 75)
        
        y1 = String(this.y_min);
        for(let i = Math.floor(y1.length / 2); i < y1.length; i++) {y1 = y1.replace(y1[i], "0");}                
        this.ctx.fillText(y1, 0, this.canvas.height - (Number(y1) * this.constY + this.CONST) - 10)
        */
       this.ctx.fillText(max, 0, 14)
       this.ctx.fillText(Math.floor(min + (max - min) / 2), 0, 75)
       this.ctx.fillText(min, 0, 120)
       this.ctx.fillText(channelName[this.channelNumber], 0, 140)

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        this.ctx.moveTo(90, 75);            
        this.ctx.lineTo(this.canvas.width, 75);
        this.ctx.stroke();
        this.ctx.closePath();        
    }

    
    //------------------------------------хуевый-код------------------------------------------------------//
    
    //------------------------------------хуевый-код------------------------------------------------------//
};
