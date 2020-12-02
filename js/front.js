let graphTable = new Array();
let channelName = [];

function showInfo(_id){

    let a = 'sub-' + _id;
    if (document.getElementById(a).style.visibility == 'visible')document.getElementById(a).style.visibility = 'hidden';
    else document.getElementById(a).style.visibility = 'visible';    

}

function showFile(input){        

    let file = input.files[0];
    if(typeof(file) == 'undefined') return
    dropGraphic();    

    let reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    let dataTable, subGraphTalbe = [];
        
    file.name
    reader.onload = function() {                
        let fileText = reader.result;
        document.getElementById('collection').innerHTML = '';                        
        
        dataTable = fileText.split('\n')        
        dataTable.splice(dataTable.length - 1, 1);           

        for(let i = 0; i < 12; i++)
        {
            if(dataTable[i][0] == '#') dataTable.splice(i, 1);
        }        
        
        let channels = Number(dataTable[0]);
        for (let i = 0; i < channels; i++) graphTable[i] = new Array();

        subGraphTalbe = dataTable;
      
        channelName = dataTable[5].split(';');//имена каналов        
        channelName[channelName.length - 1] = channelName[channelName.length - 1].substr(0, channelName[channelName.length - 1].length - 1);
        
        discretStep = Number(dataTable[2]);//частота дискретизации
        
        let startDate = dataTable[3].split(';');
        let startTime = dataTable[4].split(';');

        subGraphTalbe.splice(0, 6);                

        for(let i = 0; i < subGraphTalbe.length; i++)
        {
            let newStr = [];
            newStr = subGraphTalbe[i].split(' ');
            for (let j = 0; j < channels; j++) graphTable[j][i] = Number(newStr[j]);                        
        }        
        
        for (let i = 0; i < channels; i++) graphTable[i].unshift(discretStep);
                   
        if (channelName.length > graphTable.length)//костыль
            while(channelName.length > graphTable.length)
                channelName.pop()

        for(let i = 0; i < channelName.length; i++)
        {                                    
            createMenu(i);            
        }                            
        
        global_length = model_length = graphTable[0].length
        
        createTable(channels, file.name, startDate, startTime);      
    }
}

function dropGraphic()
{
    graphTable = [];
    canvasTable = [];
    channelNumber = 0;
    dx = 0;
    constX = 0;
    zooming = 1;
    menuActOff(0);
    menuActOff(1);
    clearInterval(globalInterval);
    globalInterval = null;

    let graphics = document.getElementById('graph');
    while (graphics.firstChild)
    {
        graphics.removeChild(graphics.firstChild);
    }
    graphics.style.height = '0px';
    document.getElementById('scrolling').height = '0px';
    setScale(true);
    shift = 0;
    let footer = document.getElementById('footer')
    while (footer.firstChild) footer.removeChild(footer.firstChild)
    statTable = []
    
    let statList = document.getElementById('statList')
    while (statList.firstChild)
    {
        statList.removeChild(statList.firstChild)
    }
    closeWindow()
    let spec = document.getElementById('spectr')
    while (spec.firstChild) spec.removeChild(spec.firstChild)
}

function createMenu(i)
{
    console.log(i)
    let newDiv = document.createElement('li');
    if(i == 0) newDiv.className = "newDivTop textNone";
    else if(i == channelName.length - 1) newDiv.className = "newDivBot textNone";
    else newDiv.className = "newDiv textNone";
    
    newDiv.id = 'newDiv' + i;
    document.getElementById('collection').appendChild(newDiv);
    newDiv.addEventListener('contextmenu', function(){choosGraph(i); return false}, false)//здесь должен быть реализован выбор осциллограммы    
    newDiv.oncontextmenu = new Function('return false;');
    buttonMenu(newDiv, i);

    let newCanvas = document.createElement('canvas');
    newCanvas.id = i;
    newCanvas.height = 50;
    newCanvas.width = 215;
    document.getElementById(newDiv.id).appendChild(newCanvas);
    
    newLabel = document.createElement('label');
    newLabel.textContent = channelName[i];
    document.getElementById(newDiv.id).appendChild(newLabel);

    let ctx = document.getElementById(i).getContext('2d');             
    let constX = newCanvas.width / graphTable[i].length;
    
    let y_min = Number.MAX_VALUE
    let y_max = -Number.MAX_VALUE
    for(let j = 1; j < graphTable[i].length; j++)
    {
        if (graphTable[i][j] <= y_min) y_min = graphTable[i][j];
        if  (graphTable[i][j] >= y_max) y_max = graphTable[i][j];
    }
 
    let Height = y_max - y_min;
    let constY = newCanvas.height / Height;
    let C = (Height - y_max) * constY;

    for(let j = 1; j < graphTable[i].length - 1; j++)
    {
        ctx.moveTo((j - 1) * constX, newCanvas.height - ((graphTable[i][j] * constY) + C));
        ctx.lineTo(j * constX, newCanvas.height - ((graphTable[i][j + 1] * constY) + C));
        
    }
    ctx.fillStyle = 'rgb(219, 242, 255)';
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
    ctx.stroke();       
}

function buttonMenu(newDiv, i)
{
    let ul = document.createElement('div');
    ul.id = "ul_" + i;
    ul.className = "buttonMenu";

    let li = document.createElement('li');
    newDiv.appendChild(ul);
}

function createTable(channels, fileName, startDate, startTime)
{
    document.getElementById('count').innerHTML = channels;
    document.getElementById('length').innerHTML = graphTable[0].length - 1;
    document.getElementById('discret').innerHTML = graphTable[0][0];
    document.getElementById('startDateTime').innerHTML = startDate + ' ' + startTime;
    document.getElementById('endDateTime').innerHTML = EndChannels(startDate, startTime);
    document.getElementById('range').innerHTML = RangeDistance(startDate, startTime);

    let table = document.getElementById('TChannels');
    while(table.childNodes.length > 2)
    {
        table.removeChild(table.lastChild);
    }
    for(let i = 0; i < channels; i++) add_info_table(i, fileName)    
}

function add_info_table(i, fileName)
{
        
    let newTdName = document.createElement('td');
    newTdName.id = "td_" + i;
    newTdName.textContent = channelName[i];
    
    if (isNaN(i)) newTdName.textContent = i;
    else if (typeof(channelName[i]) == 'undefined') newTdName.textContent = 'MODEL';

    let newTdContent = document.createElement('td');
    newTdContent.id = "td_cntent_" + i;
    newTdContent.textContent = fileName;

    let newTr = document.createElement('tr');
    newTr.id = "tr_" + i;
    newTr.appendChild(newTdName);
    newTr.appendChild(newTdContent);
    document.getElementById('TChannels').appendChild(newTr);
    
    addSpectr(i)
    addSpectrogram(i)
    addStatistics(i)
    superList(true)
}

function EndChannels(startDate, startTime)
{
    date = String(startDate).split('-');       
    time = String(startTime).split(':');    
    let a = time[2].split('.');
    let now;
    if(Number(a[1]) != 0) 
    {
        time.pop();
        time.push(a);
        now = new Date(Number(date[2]), Number(date[1]), Number(date[0]), Number(time[0]), Number(time[1]), Number(time[2]), Number(time[3]));
    }
    else now = new Date(Number(date[2]), Number(date[1]), Number(date[0]), Number(time[0]), Number(time[1]), Number(time[2]));
    now = now.getTime();
    now += 1 / graphTable[0][0] * 1000 * graphTable[0].length;
    now = new Date(now);

    let year, month, day, hour, minute, second, msecond;
    year = now.getFullYear();
    
    if(Number(now.getMonth()) < 10) month = '0' + String(now.getMonth());
        else month = String(now.getMonth());

    if(Number(now.getDate()) < 10) day = '0' + String(now.getDate());
        else day = String(now.getDate());
    
    if(Number(now.getHours()) < 10) hour = '0' + String(now.getHours());
        else hour = String(now.getHours());
    
    if(Number(now.getMinutes()) < 10) minute = '0' + String(now.getMinutes());
        else minute = String(now.getMinutes());
    
    if(Number(now.getSeconds()) < 10) second = '0' + String(now.getSeconds());
        else second = String(now.getSeconds());
    
    if(Number(now.getMilliseconds()) < 100)
    {
        if(Number(now.getMilliseconds()) < 10)
        {
            msecond = '00' + String(now.getMilliseconds());
        }
        else msecond = '0' + String(now.getMilliseconds());
    } 
        else msecond = String(now.getMilliseconds());

    let end = day + '-' + month + '-' + year + '\n' + hour + ':' + minute + ':' + second + '.' + msecond;    
    return end;    
}

function RangeDistance(startDate, startTime)
{
    date = String(startDate).split('-');       
    time = String(startTime).split(':');
    let a = time[2].split('.');
    let now;
    if(Number(a[1]) != 0) 
    {
        time.pop();
        time.push(a);
        now = new Date(Number(date[2]), Number(date[1]), Number(date[0]), Number(time[0]), Number(time[1]), Number(time[2]), Number(time[3]));
    }
    else now = new Date(Number(date[2]), Number(date[1]), Number(date[0]), Number(time[0]), Number(time[1]), Number(time[2]));
    now = now.getTime() / 1000;    
    let end = 1 / graphTable[0][0] * 1000 * graphTable[0].length + now;
    let result = end - now;
    let year, month, day, hour, minute, second, msecond;
   
    result = new Date(result);
    
        year = String(result.getFullYear() - 1970);
        if (result.getFullYear() - 1970 < 1000) year = '0' + year;
        if (result.getFullYear() - 1970 < 100) year = '0' + year;
        if (result.getFullYear() - 1970 < 10) year = '0' + year;
    
        month = String(result.getMonth());
        if (result.getMonth() < 10) month = '0' + month;

        day = String(result.getDate() - 1);
        if (result.getDate() - 1 < 10) day = '0' + day;
    
        hour = String(result.getHours() - 10);
        if (result.getHours() - 10 < 10) hour = '0' + hour;
    
        minute = String(result.getMinutes());
        if (result.getMinutes() < 10) minute = '0' + minute;
    
        second = String(result.getSeconds());
        if (result.getSeconds() < 10) second = '0' + second;
       
        msecond = String(result.getMilliseconds());
        if (result.getMilliseconds() < 100) msecond = '0' + msecond;
        if (result.getMilliseconds() < 10) msecond = '0' + msecond;

    result = day + '-' + month + '-' + year + '\n' + hour + ':' + minute + ':' + second + '.' + msecond;    
    return result;    
}

function viewSize(n1, n2)
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
            begin = n1 / shift
            end = n2 / shift
        }
        else
        {
            begin = n2
            end = n1
        }
    }
                
    constX = -begin * shift;
    
    let a = ((graphTable[0].length - 1) * 1) / Math.abs(end - begin);
    if (zoom_limit(a))zooming = a;
    if (zooming < 1) zooming = 1;
    scale()
    for (let i = 0; i < canvasTable.length; i++) canvasTable[i].reloadFurye()
}
