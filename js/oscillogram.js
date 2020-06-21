Graph = class
{
    constructor(canvas, channel, channelNumber, y_min, y_max)
    {        
        this.x = (canvas.width - 100) / (channel.length - 1);        
        this.constY = canvas.height / (y_max - y_min);
        this.canvas = canvas;        
        this.channel = channel; 
        this.CONST = (-y_min) * (canvas.height / (y_max - y_min));//let C = (height - y_max) * constY;
        this.ctx = canvas.getContext('2d');
        this.channelNumber = channelNumber;        
        this.y_min = y_min;
        this.y_max = y_max;
        this.data = []
        this.isA = true
    }
    
    setScale(max, min)
    {        
        let height = max - min; 
        this.constY = this.canvas.height / height;     
        this.CONST = (height - max) * this.constY;     
    }

    create()
    {
        if (this.data.length != 0) this.data = []
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
                    this.ctx.moveTo(((i - 1) * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST))
                    this.data.push(this.channel[i])
                }
            }
        }
        
        else
        {
            let first = true;
            for(let i = 1; i < this.channel.length; i++)
            {
                let a = ((i - 1) * this.x + dx + constX) * zooming + 100
                let b = (i * this.x + dx + constX) * zooming + 100;
                if((((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000))) && (first))
                {
                    first = false
                    let localLength = i
                    let c = a
                    let d = b
                    let y_min = Number.MAX_VALUE;
                    let y_max = -Number.MAX_VALUE;
                    while (((c > 100) && (c <= 1000)) || ((d > 100) && (d <= 1000)))
                    {                        
                        if (this.channel[localLength] <= y_min) y_min = this.channel[localLength]
                        if (this.channel[localLength] >= y_max) y_max = this.channel[localLength]
                        localLength++
                        c = ((localLength - 1) * this.x + dx + constX) * zooming + 100
                        d = (localLength * this.x + dx + constX) * zooming + 100
                    }
                    this.setScale(y_max, y_min)
                    ordMax = y_max
                    ordMin = y_min        
                }
        
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000)))
                {
                    this.ctx.moveTo(((i - 1) * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dx + constX) * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST))
                    this.data.push(this.channel[i])
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
                       
        for (let i = 0; i <= end; i++)
        {
            let a = (i * 225) + (dx + constX) * zooming + 100;
            if ((a > 0) && (a < 1000))
            {
                this.ctx.moveTo(((i * 225) / zooming + dx + constX) * zooming + 100, 0,);
                this.ctx.lineTo(((i * 225) / zooming + dx + constX) * zooming + 100, 150);                
            }            
        }                
        
        
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.ordinate(ordMax, ordMin);
        this.statistic()                        
    }    
    
    reloadFurye()
    {
        for (let i = 0; i < furyeTable.length; i++)
        {
            if (furyeTable[i].channelNumber == this.channelNumber) furyeTable[i].reload(this.data)
        }
    }
    
    defineData()
    {
        let data = []
        for(let i = 1; i < this.channel.length; i++)
        {
            let a = ((i - 1) * this.x + dx + constX) * zooming + 100;
            let b = (i * this.x + dx + constX) * zooming + 100;
            if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000))) 
            {
                data.push(this.channel[i])
            }
        }
        console.log(data.length)
        return data
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

        this.ctx.fillText(max, 0, 14)
        this.ctx.fillText((min + (max - min) / 2), 0, 75)
        this.ctx.fillText(min, 0, 120)
        this.ctx.fillText(channelName[this.channelNumber], 0, 140)

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        this.ctx.moveTo(90, 75);            
        this.ctx.lineTo(this.canvas.width, 75);
        this.ctx.stroke();
        this.ctx.closePath();        
    }

    statistic()
    {
        let window = document.getElementById(this.channelNumber + '_statistic')
        if (window == null) return

        let kvantil = new Array(this.data.length)
        for (let i = 0; i < kvantil.length; i++)
        {
            kvantil[i] = this.data[i]
        }
        function compareNumeric(a, b) 
        {
            if (a > b) return 1;
            if (a == b) return 0;
            if (a < b) return -1;
        }                    
        kvantil.sort(compareNumeric);

   
        
        let h = (kvantil[kvantil.length - 1] - kvantil[0]) / global_K
        let gistogram = []
        for (let i = 0; i < global_K; i++) gistogram.push(0)
        
        for (let i = 0; i < this.data.length; i++)
        {
            gistogram[Math.floor((this.data[i] - kvantil[0]) / h)] += 1
        }

        let ctx = window.lastChild.getContext('2d')                       

        let coef = 0
        let gistMax = -Number.MAX_VALUE
        for (let i = 0; i < gistogram.length; i++)
        {
            if (gistMax < gistogram[i]) gistMax = gistogram[i]
        }                

        let maxHeight = window.lastChild.height
        let colWidth = window.lastChild.width / global_K
        coef = maxHeight / gistMax

        ctx.beginPath()
        for (let i = 1; i <= gistogram.length; i++)
        {
            ctx.rect(colWidth * (i - 1), maxHeight, colWidth, -(gistogram[i - 1] * coef))
        }

        ctx.fillStyle = 'rgb(219, 242, 255)'
        ctx.fillRect(0, 0, window.lastChild.width, window.lastChild.height)
        ctx.stroke()
        ctx.closePath()               

        let middle = 0
        for (let i = 0; i < this.data.length; i++)
        {
            middle += this.data[i]
        }
        middle /= this.data.length        
        
        if ((dx == 0) && (window.children[0].textContent != '')) return    

        let dispersia = 0
        for (let i = 0; i < this.data.length; i++)
        {
            dispersia += (this.data[i] - middle) * (this.data[i] - middle)
        }
        dispersia /= this.data.length


        let mid_disp = Math.sqrt(dispersia)
        let variation = mid_disp / middle
        let asymmetry = 0


        for (let i = 0; i < this.data.length; i++)
        {
            asymmetry += Math.pow(this.data[i] - middle, 3)
        }
        asymmetry = asymmetry / (this.data.length * Math.pow(mid_disp, 3))


        let excess = 0
        for (let i = 0; i < this.data.length; i++)
        {
            excess += Math.pow(this.data[i] - middle, 4)
        }
        excess = excess / (this.data.length * Math.pow(mid_disp, 4)) - 3
        

        let max = -Number.MAX_VALUE
        let min = Number.MAX_VALUE
        for (let i = 0; i < this.data.length; i++)
        {
            if (max < this.data[i]) max = this.data[i]
            if (min > this.data[i]) min = this.data[i]
        }                


        window.children[0].innerHTML = 'Среднее: = ' + middle
        window.children[1].innerHTML = 'Дисперсия = ' + dispersia
        window.children[2].innerHTML = 'Ср. кв. откл = ' + mid_disp
        window.children[3].innerHTML = 'Коэф. вариации = ' + variation
        window.children[4].innerHTML = 'Коэф. асимметрии = ' + asymmetry
        window.children[5].innerHTML = 'Эксцесс = ' + excess
        window.children[6].innerHTML = 'Максимум = ' + max
        window.children[7].innerHTML = 'Минимум = ' + min
        window.children[8].innerHTML = 'Квантиль 0.05 = ' + kvantil[Math.floor(kvantil.length * 0.05)]
        window.children[9].innerHTML = 'Квантиль 0.95 = ' + kvantil[Math.floor(kvantil.length * 0.95)]
        window.children[10].innerHTML = 'Медиана = ' + kvantil[Math.floor(kvantil.length * 0.5)] 
        kvantil = []
    }

    isFurye()
    {
        return false
    }
    //------------------------------------код------------------------------------------------------//
    
    //------------------------------------код------------------------------------------------------//
};

