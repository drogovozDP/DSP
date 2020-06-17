function furye_window()
{ 
    let main = document.createElement('div')
    main.id = 'gistogram'
    main.className = 'textNone gistogram'

    let header = document.createElement('div')
    header.id = 'gistogramHeader'
    header.className = 'gistogramHeader'
    header.addEventListener('click', function(){hide_z(main)})    
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
    canvasTable.push(new Scrolling(scroll.getContext('2d'), scroll, true));
    scroll.addEventListener('mousedown', function(){checkFurye(true), mouseDown(0)})
    scroll.addEventListener('mouseup', function(){mouseUp(0)})
    top_canvas.height = scroll.height = bot_canvas.height = 20

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
    let window = document.getElementById('furye_graphs')
    if (window == null) 
    {
        window = furye_window()
    }

    let A = []
    let P = []

    let complex = [[], []]
    for (let k = 0; k < graphTable[i].length - 1; k++)
    {
        let S = 0
        for (let n = 0; n < graphTable[i].length; n++)
        {
            S += graphTable[i][n] * Math.cos((-2 * Math.PI * k * n) / graphTable[i].length)
        }
        complex[0].push(S)
    }

    for (let k = 0; k < graphTable[i].length - 1; k++)
    {
        let S = 0
        for (let n = 0; n < graphTable[i].length; n++)
        {
            S += graphTable[i][n] * Math.sin((-2 * Math.PI * k * n) / graphTable[i].length)
        }
        complex[1].push(S)
    }

    let T = 1 / discretStep

    for (let k = 0; k < Math.floor(graphTable[i].length / 2); k++)
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

    let graph = new Graph(canvas, A, i, 0, y_max, true);
    canvasTable.push(graph)
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