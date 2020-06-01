//---------------------------функции-менюшки-суперпозиции---------------------------//

function superAdd()
{
    alert('add channel ')
}

function superMenu(show)
{
    document.getElementById('modelSettings').style.display = 'none'
    if (show) document.getElementById('superMenu').style.display = 'block'
    else document.getElementById('superMenu').style.display = 'none'
}

function superList(refresh)
{
    if (channelName.length == 0) return

    let superChoice = document.getElementById('superChoice');

    if (refresh)
    {        
        while (superChoice.firstChild) superChoice.removeChild(superChoice.firstChild)        
    }
    
    let list = document.createElement('select')    

    options = new Array()

    for (let i = 0; i < channelName.length; i++)
    {
        let option = document.createElement('option')
        option.innerHTML = channelName[i];
        option.value = i;
        list.appendChild(option)
    }
    
    let newDiv = document.createElement('div');
    newDiv.id = 'super_' + superChoice.children.length;    

    let input = document.createElement('input')
    input.type = 'text'
    input.value = '1';
    input.style.width = '50px'
    input.style.marginLeft = '20px'
    document.getElementById('superChoice').appendChild(input);

    newDiv.appendChild(list);    
    newDiv.appendChild(input)
    superChoice.appendChild(newDiv);

    if (superChoice.children.length > 9)
    {
        superChoice.style.overflowY = 'scroll'
        superChoice.style.height = '190px'
    }

    if(superChoice.children.length < 10) 
    {
        superChoice.style.overflowY = 'hidden'
        superChoice.style.height = ''
    }
}

function popSuperList()
{
    let superChoice = document.getElementById('superChoice')

    if (superChoice.children.length == 0) return

    if(superChoice.children.length < 10) 
    {
        superChoice.style.overflowY = 'hidden'
        superChoice.style.height = ''
    }
    superChoice.removeChild(superChoice.lastChild)
}

//---------------------------реализация-суперпозиции---------------------------//

function superPosition(plus)
{
    let list_length = document.getElementById('superChoice').children.length

    let coef = new Array()
    let channel = new Array()    

    for (let i = 0; i < list_length; i++)
    {
        let super_ = document.getElementById('super_' + i)
        
        channel.push(super_.firstChild.value)        
        coef.push(super_.lastChild.value)
    }

    for (let i = 0; i < list_length; i++)
    {
        if (isNaN(Number(coef[i]))) return
    }
    
    let newChannel = new Array();
    newChannel.push(discretStep)

    let sum   
    let superConst = Number(document.getElementById('superConst').value) 

    for(let j = 1; j < global_length; j++)
    {        
        if (plus) sum = 0
        if (!plus) sum = 1
        
        for(let i = 0; i < channel.length; i++)
        {
            if (plus) sum += graphTable[channel[i]][j] * coef[i]
            if (!plus) sum *= graphTable[channel[i]][j] * coef[i]            
        }
        
        if (plus) sum += superConst
        if ((!plus) && (superConst != 0)) sum *= superConst

        newChannel.push(sum)        
    }

    name = document.getElementById('superName').value
    if (name == '') name = 'super position'

    graphTable.push(newChannel)
    channelName.push(name)
    createMenu(graphTable.length - 1)
    add_info_table('superPos', name)
    
}