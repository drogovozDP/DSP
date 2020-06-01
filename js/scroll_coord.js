Scrolling = class
{
    constructor(ctx, canvas)
    {
        this.ctx = ctx;
        this.canvas = canvas;
    }
    create()
    {        
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(0, 0, 1015, 30);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0 - dx - constX, 0, 1015 / zooming, 30);
        this.ctx.closePath();
    }
}

Abscise = class
{
    constructor(ctx, canvas, period, length, x, isTop)
    {
        this.ctx = ctx;
        this.canvas = canvas;
        this.period = period;
        this.length = length;
        this.x = x;
        this.isTop = isTop;
    }
    
    create()
    {                
        this.ctx.fillStyle = 'rgb(166, 222, 255)';
        this.ctx.fillRect(0, 0, 1015, 30);        
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        let end = Math.ceil((zooming * 1000) / 250);        
        let coordStart = 0;
        let coordFinish = 0;
        if(this.isTop) 
        {
            coordStart = 20;
            coordFinish = 30;
        }      
        else
        {
            coordStart = 0;
            coordFinish = 10;
        }
        this.ctx.font = "14px Verdana";
        this.ctx.fillStyle = 'black'
        for (let i = 0; i <= end; i++)
        {
            let a = (i * 250) + (dx + constX) * zooming + 100;
            let b = (i * 250) + (dx + constX) * zooming + 250;
            if (((a > 0) && (a < 1000)) || ((b > 0) && (b < 1000)))
            {
                this.ctx.moveTo(((i * 250)/ zooming + dx + constX) * zooming + 100, coordStart);
                this.ctx.lineTo(((i * 250)/ zooming + dx + constX) * zooming + 100, coordFinish);   
                
                this.ctx.fillText(this.createDate(this.period * (((i * 250) / zooming) / this.x)), ((i * 250)/ zooming + dx + constX) * zooming + 105, coordFinish)
            }            
        }                
        this.ctx.stroke();
        this.ctx.closePath(); 
    }

    createDate(data)
    {
        data = new Date(data);
        let sec, min, hour, day, month, year;
        if (data.getSeconds() < 10) sec = '0' + data.getSeconds(); 
        else sec = String(data.getSeconds());

        if (data.getMinutes() < 10) min = '0' + data.getMinutes();
        else min = String(data.getMinutes());

        if ((data.getHours() - 10) < 0) hour = String(data.getHours() + 14)
        else if ((data.getHours() - 10) < 10) hour = '0' + (data.getHours() - 10);
        else hour = String(data.getHours() - 10);

        if(data.getDate() - 1 < 10) day = '0' + (data.getDate() - 1);
        else day = String(data.getDate() - 1);

        if(data.getMonth() < 10) month = '0' + data.getMonth();
        else month = String(data.getMonth());

        year = String(data.getFullYear() - 1970);
        if (data.getFullYear() - 1970 < 1000) year = '0' + year;
        if (data.getFullYear() - 1970 < 100) year = '0' + year;
        if (data.getFullYear() - 1970 < 10) year = '0' + year;

        return day + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
    }
}

let zooming = 1;
let globalScale = true;
function zoom(zoom_plus)
{
    
    if((zooming / 2 < 1) && (!zoom_plus)) zooming = 1;
    else if (!zoom_plus) zooming /= 2;
    //if((zoom_plus) && (zooming * 2 * 1000 <= 128000))zooming *= 2        
    if((zoom_plus) && (zoom_limit(zooming * 2))) zooming *= 2
    scale()
    
}

function zoom_limit(checkZoom)
{
    
    let check = 0;
    let value = 0;
    for (let i = 0; i < global_length - 1; i++)
    {
        value = i * shift * checkZoom;
        if (value < globalCanvasWidth) check ++
    }
    /*console.log('shift: ', shift)
    console.log('global_length: ', global_length)
    console.log('value: ', value)*/
    if (check < 20) return false;
    else return true;
}


function setScale(isGlobal)
{
    globalScale = isGlobal;
}

function closeAll(check)//эта хуета не работает
{
    for (let i = 0; i <= canvasTable.length; i++) 
    {
        channelNumber = i;
        closeSignal(check);
    }
}

function closeSignal(check)
{    
    let count, object;
    
    if (check == 0)
    {
        count = 'canvas_' + channelNumber;
        object = document.getElementById('canvas_' + channelNumber);
    }

    if (check == 1) 
    {
        count = channelNumberLocal.id;
        object = channelNumberLocal;
    }

    if (document.getElementById(count) == null) 
    {
        menuActOff(check);
        return;
    }

    document.getElementById('graph').removeChild(object);        

    count = Number(count.substr(7, count.length - 7));
    for (let i = 0; i < canvasTable.length; i++) 
    {
        if (canvasTable[i].channelNumber == count)
        {
            canvasTable.splice(i, 1);
        }
    }

    

    if (canvasTable.length == 6) graphDiv.style.height = '530px';
    if (canvasTable.length == 5) graphDiv.style.height = '377px';
    if (canvasTable.length == 4) graphDiv.style.height = '225px';
    if (canvasTable.length == 3) 
    {
        canvasTable = [];

        while(graphDiv.firstChild)
        {
            graphDiv.removeChild(graphDiv.firstChild);
        }
        
        graphDiv.style.height = '0px';
        
        document.getElementById('scrolling').height = '0px';
        
        clearInterval(globalInterval);
        globalInterval = null;
    }   

    menuActOff(check);
}

let dx = constX = dataX = resultX = dinamicX = dataY = resultY = dinamicY = 0; 
let isMove = false;
let stepStart = stepEnd = 0;
let stepArray = [];
let isZoom = false;
let zoom_dx, zoom_const;


function mouseDown(check) 
{       
    if (check == 0) isMove = true; 
    if ((check == 1) && (window.event.button == 0))
    {        
        isZoom = true;
        zoom_const = event.pageX;
    }
}
function mouseUp(check) 
{    
    (window.event.button == 0)
    if (check == 0)
    {
        isMove = false; 
        constX += -(dinamicX - dataX);
        dx = 0;    
    }
    if ((check == 1) && (window.event.button == 0))
    {
        isZoom = false;
        viewSize(zoom_const, zoom_dx)
        zoom_const = zoom_dx = 0;
    }
}

function changeData(check)
{
    if (check == 0)
    {
        if(isMove) 
        {
            dinamicX = event.pageX;        
            dx = -(dinamicX - dataX);
        }
        else
        {
            dataX = event.pageX;
        }    
    }    
    if ((check == 1) && (window.event.button == 0))
    {
        //console.log(isZoom);
        if (isZoom) zoom_dx = event.pageX;
    }
}
