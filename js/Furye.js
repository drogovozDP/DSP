let furyeTable = []


function furye_window()
{ 
    let main = document.createElement('div')
    main.id = 'gistogram'
    main.className = 'textNone gistogram'

    let header = document.createElement('div')
    header.id = 'gistogramHeader'
    header.className = 'gistogramHeader'      
    header.style.textAlign = 'left'
    
    let closeButt = document.createElement('button')
    //closeButt.style.marginLeft = '100px'    
    closeButt.style.float = 'right'
    closeButt.innerHTML = 'закрыть'

    let lgButt = document.createElement('button')    
    lgButt.innerHTML = 'lg'
    //lgButt.style.opacity = '0.7'

    let plusButt = document.createElement('button')
    plusButt.innerHTML = '+'

    let minusButt = document.createElement('button')
    minusButt.innerHTML = '-'

    let select = document.createElement('select')
    let A_option = document.createElement('option')
    let P_option = document.createElement('option')
    A_option.innerHTML = 'амплитудный спектр'
    P_option.innerHTML = 'спектральная плотность мощности'
    select.appendChild(A_option)
    select.appendChild(P_option)
    select.style.padding = closeButt.style.padding = lgButt.style.padding = plusButt.style.padding = minusButt.style.padding = '10px'    


    let body = document.createElement('div')
    body.id = 'statistic'
    body.style.textAlign = 'left'
    body.style.padding = '10px'
 
    let graphDiv = document.createElement('div')
    graphDiv.id = 'furye_graphs'
    graphDiv.style.width = '1015px'
    graphDiv.style.overflowY = 'scroll'
    let scrollDiv = document.createElement('div')
    scrollDiv.id = 'furye_scroll'
    scrollDiv.style.width = '1015px'

    let scroll = document.createElement('canvas')    

    let top_canvas = document.createElement('canvas')    

    let bot_canvas = document.createElement('canvas')
    
    top_canvas.width = bot_canvas.width = 1000
    scroll.width = 1015
    furyeTable.push(new ScrollingF(scroll.getContext('2d'), scroll, true));

    furyeTable.push(new AbsciseF(top_canvas.getContext('2d'), 
                            top_canvas, 1 / graphTable[0][0] * 1000, 
                            graphTable[0].length - 1, 
                            globalCanvasWidth / (graphTable[0].length - 1),
                            true
                        )
                    )
    furyeTable.push(new AbsciseF(top_canvas.getContext('2d'), 
                    top_canvas, 1 / graphTable[0][0] * 1000, 
                    graphTable[0].length - 1, 
                    globalCanvasWidth / (graphTable[0].length - 1),
                    true
                )
            )
    
    scroll.addEventListener('mousedown', function(){mouseDownF(0)})
    scroll.addEventListener('mouseup', function(){mouseUpF(0)})
    main.addEventListener('mousemove', function(){changeDataF(0)})
    top_canvas.height = scroll.height = bot_canvas.height = 30

    header.appendChild(lgButt)
    header.appendChild(select)
    header.appendChild(plusButt)
    header.appendChild(minusButt)
    header.appendChild(closeButt)

    scrollDiv.appendChild(scroll)
    graphDiv.appendChild(top_canvas)
    graphDiv.appendChild(bot_canvas)
    
    body.appendChild(graphDiv)
    body.appendChild(scrollDiv)

    main.appendChild(header)
    main.appendChild(body)
 
    document.getElementById('footer').appendChild(main)
    
    dragElement(main)
    move()

    return graphDiv
}


function drawSpectr(i)
{
    for (let j = 0; j < furyeTable.length; j++) if (furyeTable[j].channelNumber == i) return
    
    let window = document.getElementById('furye_graphs')
    if (window == null) 
    {
        window = furye_window()
    }

    let A = []
    let P = []

    let complex = [[], []]

    let channel = new Array(graphTable[i].length - 1)
    
    for (let q = 0; q < channel.length; q++) channel[q] = graphTable[i][q + 1]
    console.log(channel[6])
    for (let k = 0; k < Math.floor(channel.length / 2); k++)
    {
        let S_re = 0
        let S_im = 0
        for (let n = 0; n < channel.length; n++)
        {
            S_re += channel[n] * Math.cos((-2 * Math.PI * k * n) / channel.length)
            S_im += channel[n] * Math.sin((-2 * Math.PI * k * n) / channel.length)
        }        
        complex[0].push(S_re)
        complex[1].push(S_im)
    }
    
    complex[0][0] = complex[0][1]

    let T = 1 / discretStep

    for (let k = 0; k < Math.floor(channel.length / 2); k++)
    {        
        A.push(Math.sqrt(complex[0][k] * complex[0][k] + complex[1][k] * complex[1][k]) * T) 
        P.push(A[k] * A[k])
    }    
    
    let canvas = document.createElement('canvas')
    canvas.id = 'furye_' + i  
    canvas.width = globalCanvasWidth  

    y_max = -Number.MAX_VALUE

    for (let k = 0; k < A.length; k++)
    {
        if (A[k] > y_max) y_max = A[k]
    }

    let graph = new Furye(canvas, A, i, 0, y_max);    
    
    furyeTable.pop()
    window.removeChild(window.lastChild)
    
    furyeTable.push(graph)    
    window.appendChild(canvas)
    
    canvas = document.createElement('canvas')
    canvas.width = 1000
    canvas.height = 30  
    furyeTable.push(new AbsciseF(canvas.getContext('2d'), 
                            canvas, 1 / graphTable[0][0] * 1000, 
                            graphTable[0].length - 1, 
                            globalCanvasWidth / (graphTable[0].length - 1),
                            false
                        )
                    )
    window.appendChild(canvas)
}

function addSpectr(i)
{
    new_li = document.createElement('li')
    new_li.className = 'litable sub-li'
    new_li.innerHTML = channelName[i]
    new_li.id = 'spec_' + i
    new_li.style.marginLeft = '37px'

    new_li.addEventListener('click', function(){drawSpectr(i)})

    document.getElementById('spectr').appendChild(new_li)
}







let zoomingF = 1
let dxF = constXF = dataXF = resultXF = dinamicXF = dataYF = resultYF = dinamicYF = 0; 
let isMoveF = false;
let stepStartF = stepEndF = 0;
let isZoomF = false;
let zoom_dxF, zoom_constF;



function mouseDownF(check) 
{       
    if (check == 0) isMoveF = true; 
    if ((check == 1) && (window.event.button == 0))
    {        
        isZoomF = true;
        zoom_constF = event.pageX;
    }    
}
function mouseUpF(check) 
{    
    (window.event.button == 0)
    if (check == 0)
    {
        isMoveF = false; 
        constXF += -(dinamicXF - dataXF);
        dxF = 0;    
    }
    if ((check == 1) && (window.event.button == 0))
    {
        isZoomF = false;
        viewSizeF(zoom_constF, zoom_dxF)
        zoom_constF = zoom_dxF = 0;
    }
}

function changeDataF(check)
{
    if (check == 0)
    {
        if(isMoveF) 
        {
            dinamicXF = event.pageX;        
            dxF = -(dinamicXF - dataXF);
        }
        else
        {
            dataXF = event.pageX;
        }    
    }    
    if ((check == 1) && (window.event.button == 0))
    {
        if (isZoomF) zoom_dxF = event.pageX;
    }
}


function viewSizeF(n1, n2)
{
    let begin, end;
    if((typeof(n1) == 'undefined') && (typeof(n2) == 'undefined'))
    {
        begin = Number(document.getElementById('setBegin').value);
        end = Number(document.getElementById('setEnd').value);
        if ((begin >= end) || (graphTable.length == 0)) return;
    }
    else 
    {
        if (n1 < n2)
        {
            begin = n1 / shift;
            end = n2 / shift;
        }
        else
        {
            begin = n2;
            end = n1;
        }
    }
                
    constX = -begin * shift;
    
    let a = ((graphTable[0].length - 1) * 1) / Math.abs(end - begin);
    if (zoom_limit(a))zooming = a;
    if (zooming < 1) zooming = 1;
}

class Furye extends Graph
{
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
                let a = ((i - 1) * this.x + dxF + constXF) * zoomingF + 100;
                let b = (i * this.x + dxF + constXF) * zoomingF + 100;
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000))) 
                {
                    this.ctx.moveTo(((i - 1) * this.x + dxF + constXF) * zoomingF * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dxF + constXF) * zoomingF * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST))
                }                
            }                         
        }
        
        else
        {
            let first = true;
            for(let i = 1; i < this.channel.length; i++)
            {
                let a = ((i - 1) * this.x + dxF + constXF) * zoomingF + 100
                let b = (i * this.x + dxF + constXF) * zoomingF + 100;
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
                        c = ((localLength - 1) * this.x + dxF + constXF) * zoomingF + 100
                        d = (localLength * this.x + dxF + constXF) * zoomingF + 100
                    }
                    this.setScale(y_max, y_min)
                    ordMax = y_max
                    ordMin = y_min        
                }
        
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000)))
                {
                    this.ctx.moveTo(((i - 1) * this.x + dxF + constXF) * zoomingF * zooming + 100, this.canvas.height - ((this.channel[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dxF + constXF) * zoomingF * zooming + 100, this.canvas.height - ((this.channel[i + 1] * this.constY) + this.CONST))
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
            this.ctx.moveTo(zoom_constF, 0);
            this.ctx.lineTo(zoom_constF, 150);
            this.ctx.moveTo(zoom_dxF, 0);
            this.ctx.lineTo(zoom_dxF, 150);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(63, 100, 156)'
        let end = Math.ceil((zoomingF * 1000) / 250);          
                       
        for (let i = 0; i <= end; i++)
        {
            let a = (i * 225) + (dxF + constXF) * zoomingF + 100;
            if ((a > 0) && (a < 1000))
            {
                this.ctx.moveTo(((i * 225) / (zoomingF * zooming) + dxF + constXF) * zoomingF * zooming + 100, 0,);
                this.ctx.lineTo(((i * 225) / (zoomingF * zooming) + dxF + constXF) * zoomingF * zooming + 100, 150);                
            }            
        }                
        
        
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.ordinate(ordMax, ordMin);         
    }

    reload(data)
    {        
        let A = []
        let P = []

        let complex = [[], []]        
            
        for (let k = 0; k < Math.floor(data.length / 2); k++)
        {
            let S_re = 0
            let S_im = 0
            for (let n = 0; n < data.length; n++)
            {
                S_re += data[n] * Math.cos((-2 * Math.PI * k * n) / data.length)
                S_im += data[n] * Math.sin((-2 * Math.PI * k * n) / data.length)
            }        
            complex[0].push(S_re)
            complex[1].push(S_im)
        }
        
        complex[0][0] = complex[0][1]

        let T = 1 / discretStep

        for (let k = 0; k < Math.floor(data.length / 2); k++)
        {        
            A.push(Math.sqrt(complex[0][k] * complex[0][k] + complex[1][k] * complex[1][k]) * T) 
            P.push(A[k] * A[k])
        }    
        this.channel = A

        let y_max = -Number.MAX_VALUE 
        for (let i = 0; i < data.length; i++) 
            if (y_max < data[i]) y_max = data[i]       
       
        this.x = (this.canvas.width - 100) / (data.length - 1)

        console.log(y_max)
    }

    isFurye()
    {
        return true
    }
}

class ScrollingF extends Scrolling
{
    create()
    {         
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(0, 0, 1015, 30);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0 - dxF - constXF, 0, 1015 / zoomingF, 30);
        this.ctx.closePath();
    }
}

class AbsciseF extends Abscise
{
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
            let a = (i * 225) + (dxF + constXF) * zoomingF + 100;
            let b = (i * 225) + (dxF + constXF) * zoomingF + 225;
            if (((a > 0) && (a < 1000)) || ((b > 0) && (b < 1000)))
            {
                this.ctx.moveTo(((i * 225) / zoomingF + dxF + constXF) * zoomingF + 100, coordStart);
                this.ctx.lineTo(((i * 225) / zoomingF + dxF + constXF) * zoomingF + 100, coordFinish);   
                
                this.ctx.fillText(this.createDate(this.period * (((i * 225) / zoomingF) / this.x)), ((i * 225)/ zoomingF + dxF + constXF) * zoomingF + 105, coordFinish)
            }            
        }                
        this.ctx.stroke();
        this.ctx.closePath(); 
    }
}