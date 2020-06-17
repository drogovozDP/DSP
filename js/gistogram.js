//---------------------------функции-менюшки-статистики---------------------------//

statTable = new Array()

function dragElement(elmnt) //elmnt
{               

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header"))
    {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else 
    {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) 
    {
        elmnt.style.zIndex = 11
        e = e || window.event;        
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) 
    {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() 
    {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function hide_z(table)
{    
    for (let i = 0; i < statTable.length; i++)
    {
        statTable[i].style.zIndex = 9
    }
    table.style.zIndex = 10
}

function addStatistics(i)
{
    new_li = document.createElement('li')
    new_li.className = 'litable sub-li'
    new_li.innerHTML = channelName[i]
    new_li.id = 'stat_' + i

    new_li.addEventListener('click', function(){showStatistics(i)})

    document.getElementById('statList').appendChild(new_li)
}

function create_window(i)
{
    let main = document.createElement('div')
    main.id = i + '_gistogram'
    main.className = 'textNone gistogram'

    let header = document.createElement('div')
    header.id = i + '_gistogramHeader'
    header.className = 'gistogramHeader'
    header.addEventListener('click', function(){hide_z(main)})
    header.innerHTML = channelName[i]
    header.style.textAlign = 'left'

    let inputDiv = document.createElement('div')    
    inputDiv.style.textAlign = 'left'
    inputDiv.style.padding = '10px'
    inputDiv.style.paddingBottom = '0px'
    let infoDiv = document.createElement('div')
    infoDiv.style.display = 'inline-block'
    infoDiv.innerHTML = 'Кол-во столбцов: '
    infoDiv.style.marginRight = '5px'
    let input = document.createElement('input')
    input.style.display = 'inline-block'
    input.type = 'text'
    input.style.width = '50px'
    input.value = global_K
    input.style.marginRight = '5px'
    let divButt = document.createElement('input')    
    divButt.type = 'button'
    divButt.style.display = 'inline-block'    
    divButt.value = 'применить'
    divButt.style.marginRight = '5px'
    divButt.addEventListener('click', function(){
        if (isNaN(Number(input.value))) return
        global_K = Number(input.value)        
    })
    inputDiv.appendChild(infoDiv)
    inputDiv.appendChild(input)
    inputDiv.appendChild(divButt)

    let body = document.createElement('div')
    body.id = i + '_statistic'
    body.style.textAlign = 'left'
    body.style.padding = '10px'    
    body.style.width = '400px'

    for (let i = 0; i < 11; i++)
    {
        body.appendChild(document.createElement('div'))
        body.children[i].style.paddingBottom = '5px'
        body.children[i].style.paddingTop = '5px'
    }
    body.firstChild.style.borderTop = '1px solid black'
    body.lastChild.style.borderBottom = '1px solid black'

    let gistCanv = document.createElement('canvas')
    gistCanv.width = 400
    gistCanv.height = 150
    gistCanv.style.marginTop = '10px'
    body.appendChild(gistCanv)

    let buttClose = document.createElement('div')
    buttClose.className = 'gistItem'
    buttClose.addEventListener('click', function(){closeStatistics(i)})
    buttClose.innerHTML = 'зыкрыть'

    main.appendChild(header)
    main.appendChild(inputDiv)
    main.appendChild(body)
    main.appendChild(buttClose)
    document.getElementById('footer').appendChild(main)
    
    dragElement(main)
    statTable.push(main)
    return main
}

//---------------------------реализация-статистики---------------------------//

let global_K = 10

function showStatistics(i)
{     
    if (document.getElementById('canvas_' + i) == null) return

    let window = create_window(i)
    window.style.top = '105px'
    window.style.left = '10px'
    window.style.display = 'block'        
}

function closeStatistics(i)
{    
    for (let j = 0; j < statTable.length; j++)
    {
        if (statTable[j].id[0] == i) statTable.splice(i, 1)
    }
    document.getElementById(i + '_gistogram').remove()    
}

