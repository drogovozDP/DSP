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
    closeButt.addEventListener('click', function(){closeWindow()})

    let lgButt = document.createElement('button')    
    lgButt.innerHTML = 'lg'
    lgButt.addEventListener('click', function(){isLogOn(this)})
    //lgButt.style.opacity = '0.7'

    let plusButt = document.createElement('button')
    plusButt.innerHTML = '+'
    plusButt.addEventListener('click', function(){zoomF(true)})

    let minusButt = document.createElement('button')
    minusButt.innerHTML = '-'
    minusButt.addEventListener('click', function(){zoomF(false)})

    let scaleButt = document.createElement('button')
    scaleButt.innerHTML = 'глобал'
    scaleButt.addEventListener('click', function(){isGlobalScaleF(this)})
    scaleButt.style.width = '70px'

    let pointScaleButt = document.createElement('button')
    pointScaleButt.innerHTML = 'задать масштаб'
    pointScaleButt.style.width = '158px'
    pointScaleButt.id = 'setScaleOff'
    pointScaleButt.addEventListener('click', function(){setScaleF(true)})

    let L_butt = document.createElement('button')
    L_butt.innerHTML = 'сглаживание'
    L_butt.id = 'L_butt'
    L_butt.addEventListener('click', function(){makeSoft(true)})
    let L_div = document.createElement('div')
    L_div.id = 'softButt'
    L_div.style.display = 'none'
    let L_input = document.createElement('input')
    L_input.type = 'number'
    L_input.style.width = '70px'
    L_input.value = 0
    let L_confirm = document.createElement('button')
    L_confirm.innerHTML = 'ок'
    L_confirm.addEventListener('click', function(){makeSoft(false)})
    L_div.appendChild(L_input)
    L_div.appendChild(L_confirm)

    let deleteButt = document.createElement('button')
    deleteButt.innerHTML = 'убрать спектр'
    deleteButt.style.width = '150px'
    deleteButt.id = 'deleteButt'
    deleteButt.addEventListener('click', function(){delCursor()})

    let a_filed = document.createElement('input')
    a_filed.type = 'number'
    a_filed.id = 'setBeginF'
    a_filed.value = 0
    let b_filed = document.createElement('input')
    b_filed.type = 'number'
    b_filed.id = 'setEndF'
    b_filed.value = graphTable[0].length - 1
    a_filed.style.width = b_filed.style.width = '50px'
    let divPoints = document.createElement('div')    
    divPoints.style.display = 'none'
    divPoints.id = 'setScaleOn'
    let pointConfirm = document.createElement('button')    
    pointConfirm.innerHTML = 'ок'
    pointConfirm.style.width = '50px'
    pointConfirm.addEventListener('click', function(){setScaleF(false)})
    divPoints.appendChild(a_filed)
    divPoints.appendChild(b_filed)
    divPoints.appendChild(pointConfirm)    
    

    let select = document.createElement('select')
    select.id = 'selectAP'
    let A_option = document.createElement('option')
    let P_option = document.createElement('option')
    A_option.innerHTML = 'амплитудный спектр'    
    P_option.innerHTML = 'спектральная плотность мощности'
    select.appendChild(A_option)
    select.appendChild(P_option)
    select.style.padding = closeButt.style.padding = lgButt.style.padding = plusButt.style.padding = L_butt.style.padding = '10px'
    minusButt.style.padding = scaleButt.style.padding = pointScaleButt.style.padding = deleteButt.style.padding = '10px'


    let body = document.createElement('div')
    body.id = 'statistic'
    body.style.textAlign = 'left'
    body.style.padding = '10px'
 
    let graphDiv = document.createElement('div')
    graphDiv.id = 'furye_graphs'
    graphDiv.style.width = '1015px'
    graphDiv.style.overflowY = 'scroll'
    graphDiv.style.height = ''
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
    header.appendChild(scaleButt)
    header.appendChild(divPoints)
    header.appendChild(pointScaleButt)
    header.appendChild(deleteButt)
    header.appendChild(L_div)
    header.appendChild(L_butt)
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
    let channel

    for (let q = 0; q < canvasTable.length; q++)    
        if (canvasTable[q].channelNumber == i) channel = canvasTable[q].defineData()                                        
        
    
    if (channel == undefined) 
    {
        channel = new Array(graphTable[i].length - 1)
        for (let q = 0; q < channel.length; q++) channel[q] = graphTable[i][q + 1]
    }

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
    canvas.addEventListener('mousedown', function(){mouseDownF(1), removeSpectr(this)})
    canvas.addEventListener('mousemove', function(){changeDataF(1)})
    canvas.addEventListener('mouseover', function(){removeSpectrAnim(this, true)})
    canvas.addEventListener('mouseout', function(){removeSpectrAnim(this, false)})
    canvas.addEventListener('mouseup', function(){mouseUpF(1)})

    y_max = -Number.MAX_VALUE
    y_min = Number.MAX_VALUE

    for (let k = 0; k < A.length; k++)
    {
        if (A[k] > y_max) y_max = A[k]
        if (A[k] < y_min) y_min = A[k]

    }    
    let graph = new Furye(canvas, A, i, y_min, y_max);    
    
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
    if (delCur) document.getElementById('furye_' + i).style.cursor = 'pointer'

    fixHeightF(document.getElementById('furye_graphs'))
}

function fixHeightF(furye_graphs)
{   if(furye_graphs.childNodes.length == 3) furye_graphs.style.height = '225px'
    if(furye_graphs.childNodes.length == 4) furye_graphs.style.height = '377px'
    if(furye_graphs.childNodes.length == 5) furye_graphs.style.height = '530px'
    if(furye_graphs.childNodes.length == 6) furye_graphs.style.height = '685px'    
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

function removeSpectrAnim(canvas, OnCanvas)
{
    if (!delCur) return
    if (OnCanvas) canvas.style.opacity = '0.5'
    else canvas.style.opacity = '1'    
}

function removeSpectr(canvas)
{
    if (!delCur) return
    let index = Number(canvas.id.substr(6, canvas.id.length - 6))    
    for (let i = 0; i < furyeTable.length; i++) 
        if (furyeTable[i].channelNumber == index) furyeTable.splice(i, 1)
    canvas.remove()    
    
    fixHeightF(document.getElementById('furye_graphs'))    
    if (furyeTable.length == 3) closeWindow()    
}

function closeWindow()
{
    if (document.getElementById('gistogram') != null) document.getElementById('gistogram').remove()
    furyeTable = []
    delCur = false
}

function setScaleF(isOn)
{
    if (isOn)
    {
        document.getElementById('setScaleOn').style.display = 'inline-block'
        document.getElementById('setScaleOff').style.display = 'none'
    }
    else
    {
        document.getElementById('setScaleOn').style.display = 'none'
        document.getElementById('setScaleOff').style.display = 'inline-block'
        viewSizeF()
    }
}








let zoomingF = 1
let dxF = constXF = dataXF = resultXF = dinamicXF = dataYF = resultYF = dinamicYF = 0; 
let isMoveF = false;
let stepStartF = stepEndF = 0;
let isZoomF = false;
let zoom_dxF, zoom_constF;
let logOn = false
let L = 0

function isLogOn(butt)
{
    if (!logOn)
    {
        logOn = true
        butt.style.opacity = '0.5'
        return
    }
    if (logOn)
    {
        logOn = false
        butt.style.opacity = '1'
        return
    }
}

function makeSoft(open)
{
    if (open)
    {
        document.getElementById('L_butt').style.display = 'none'
        document.getElementById('softButt').style.display = 'inline-block'
    }
    else
    {
        let a = document.getElementById('softButt')
        if (a.firstChild.value >= 0) L = a.firstChild.value        
        document.getElementById('L_butt').style.display = 'inline-block'
        a.style.display = 'none'
    }
}

function mouseDownF(check) 
{       
    if (delCur) return
    if (check == 0) isMoveF = true; 
    if ((check == 1) && (window.event.button == 0))
    {        
        let furye = document.getElementById('gistogram').style.left
        isZoomF = true;
        zoom_constF = event.pageX - furye.substr(0, furye.length - 2) - 10        
    }    
}
function mouseUpF(check) 
{    
    if (delCur) return
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
    if (delCur) return
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
        let furye = document.getElementById('gistogram').style.left
        if (isZoomF) zoom_dxF = event.pageX - furye.substr(0, furye.length - 2) - 10;
    }
}

delCur = false

function delCursor()
{
    let butt = document.getElementById('deleteButt')
    if (butt.innerHTML == 'убрать спектр')
    {
        for (let i = 0; i < graphTable.length; i++) 
        {            
            if (document.getElementById('furye_' + i) != null)
                document.getElementById('furye_' + i).style.cursor = 'pointer'        
        }        
        delCur = true
        butt.innerHTML = 'отмена'
    } 
    else   
    {
        for (let i = 0; i < graphTable.length; i++) 
        {            
            if (document.getElementById('furye_' + i) != null)
                document.getElementById('furye_' + i).style.cursor = 'default'
        }        
        delCur = false
        butt.innerHTML = 'убрать спектр'
    }
}


function viewSizeF(n1, n2)
{
    let begin, end;
    if((typeof(n1) == 'undefined') && (typeof(n2) == 'undefined'))
    {
        begin = Number(document.getElementById('setBeginF').value);
        end = Number(document.getElementById('setEndF').value);
        if ((begin >= end) || (graphTable.length == 0)) return;
    }
    else 
    {
        if (n1 < n2)
        {
            if (shift == 0) shift = globalCanvasWidth / (graphTable[0].length - 1)
            begin = n1 / shift
            end = n2 / shift
        }
        else
        {
            begin = n2;
            end = n1;
        }
    }
                
    constXF = -begin * shift;
    
    let a = ((graphTable[0].length - 1) * 1) / Math.abs(end - begin);    
    if (zoom_limit(a)) zoomingF = a;
    if (zoomingF < 1) zoomingF = 1;
}


let globalScaleF = true;
function zoomF(zoom_plus)
{
    
    if((zoomingF / 2 < 1) && (!zoom_plus)) zoomingF = 1;
    else if (!zoom_plus) zoomingF /= 2;      
    if((zoom_plus) && (zoom_limitF(zoomingF * 2))) zoomingF *= 2
    scale()    
}

function zoom_limitF(checkZoom)
{
    
    let check = 0;
    let value = 0;
    for (let i = 0; i < global_length - 1; i++)
    {
        value = i * shift * checkZoom;
        if (value < globalCanvasWidth) check ++
    }    
    if (check < 20) return false;
    else return true;
}

function isGlobalScaleF(butt)
{
    if (butt.innerHTML == 'глобал')
    {
        butt.innerHTML = 'локал'
        globalScaleF = false
    }
    else
    {
        butt.innerHTML = 'глобал'
        globalScaleF = true
    }
}

class Furye extends Graph
{
    create()
    {        
        let currSpec = new Array(this.channel.length)
        let square = 1        

        if (document.getElementById('selectAP').value == 'спектральная плотность мощности')         
        {
            for (let i = 0; i < currSpec.length; i++) currSpec[i] = this.channel[i] * this.channel[i]
            square = 2            
        }            
        else
            for (let i = 0; i < currSpec.length; i++) currSpec[i] = this.channel[i]

        if (logOn)
            for (let i = 0; i < currSpec.length; i++) currSpec[i] = Math.log(currSpec[i], 20 / square)
             
        
        let subCurrSpec = new Array(currSpec.length)
        for (let i = 0; i < subCurrSpec.length; i++) subCurrSpec[i] = currSpec[i]

        for (let k = 0; k < subCurrSpec.length; k++)//softSpec
        {
            let S = 0
            for (let l = -L; l <= L; l++)
            {
                let kl = k - l
                if (kl < 0) kl = -kl
                S += subCurrSpec[kl]                
            }
            currSpec[k] = S / (2 * L + 1)
        }

        let ordMax = Math.pow(this.y_max, square);
        let ordMin = Math.pow(this.y_min, square);

        if (logOn)
        {
            ordMax = Math.log(ordMax, 20 / square)
            if (ordMin > 0) ordMin = Math.log(ordMin, 20 / square)
        }   

        this.ctx.beginPath();        
        this.ctx.fillStyle = 'rgb(219, 242, 255)';
        this.ctx.fillRect(100, 0, this.canvas.width - 100, this.canvas.height);                 
        
        if(globalScaleF)
        {                        
            this.setScale(ordMax, ordMin)
            for(let i = 1; i < currSpec.length; i++)
            {
                let a = ((i - 1) * this.x + dxF + constXF) * zoomingF + 100;
                let b = (i * this.x + dxF + constXF) * zoomingF + 100;
                if(((a > 100) && (a <= 1000)) || ((b > 100) && (b <= 1000))) 
                {
                    this.ctx.moveTo(((i - 1) * this.x + dxF + constXF) * zoomingF  + 100, this.canvas.height - ((currSpec[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dxF + constXF) * zoomingF + 100, this.canvas.height - ((currSpec[i + 1] * this.constY) + this.CONST))
                }                
            }                         
        }
        
        else
        {
            let first = true;
            for(let i = 1; i < currSpec.length; i++)
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
                        if (currSpec[localLength] <= y_min) y_min = currSpec[localLength]
                        if (currSpec[localLength] >= y_max) y_max = currSpec[localLength]
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
                    this.ctx.moveTo(((i - 1) * this.x + dxF + constXF) * zoomingF  + 100, this.canvas.height - ((currSpec[i] * this.constY) + this.CONST))
                    this.ctx.lineTo((i * this.x + dxF + constXF) * zoomingF  + 100, this.canvas.height - ((currSpec[i + 1] * this.constY) + this.CONST))
                }
            }
        }
        
        
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();               
        this.ctx.closePath(); 

        if(isZoomF)
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
                this.ctx.moveTo(((i * 225) / (zoomingF) + dxF + constXF) * zoomingF + 100, 0);
                this.ctx.lineTo(((i * 225) / (zoomingF) + dxF + constXF) * zoomingF + 100, 150);                
            }            
        }                
        
        
        this.ctx.stroke();
        this.ctx.closePath(); 
        this.ordinate(ordMax, ordMin);       
        
        currSpec = []
    }    

    reload(data)
    {       
        let A = []        
        let complex = [[], []]        
        let square = 1
        if (document.getElementById('selectAP').value == 'спектральная плотность мощности')
            square = 2       

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
        }    
        this.channel = A        
        this.findMaxMin()

        this.setScale(this.y_max, this.y_min)        
        this.x = (this.canvas.width - 100) / (A.length - 1)
    }

    findMaxMin()
    {
        let y_max = -Number.MAX_VALUE 
        let y_min = Number.MAX_VALUE
        for (let i = 0; i < this.channel.length; i++) 
        {
            if (y_max < this.channel[i]) y_max = this.channel[i]       
            if (y_min > this.channel[i]) y_min = this.channel[i]
        }            
        
        this.y_max = y_max
        this.y_min = y_min        
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
        let end = Math.ceil((zoomingF * 1000) / 250);        
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
                
                this.ctx.fillText((i * 225) / (this.period * this.length), ((i * 225)/ zoomingF + dxF + constXF) * zoomingF + 105, coordFinish)
            }            
        }                
        this.ctx.stroke();
        this.ctx.closePath(); 
    }
}