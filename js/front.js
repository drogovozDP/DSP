let graphTable = new Array();

function showInfo(_id){

    let a = 'sub-' + _id;
    if (document.getElementById(a).style.visibility == 'visible')document.getElementById(a).style.visibility = 'hidden';
    else document.getElementById(a).style.visibility = 'visible';
    //alert(a)

}

function showFile(input){

    let file = input.files[0];

    //alert(file.name);

    let reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    let dataTable, subGraphTalbe, channelName = [];
        
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
        let discretStep = Number(dataTable[2]);//шаг дискретизации
        
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
                   

        for(let i = 0; i < channelName.length; i++)
        {                                    
            createMenu(i, channelName);            
        }    
        createTable(channels, channelName, file.name, startDate, startTime);    
    }
}

function createMenu(i, content)
{
    let newDiv = document.createElement('li');
    if(i == 0) newDiv.className = "newDivTop textNone";
    else if(i == content.length - 1) newDiv.className = "newDivBot textNone";
    else newDiv.className = "newDiv textNone";
    
    newDiv.id = 'newDiv' + i;
    //newDiv.textContent = content[i] + ' ';
    document.getElementById('collection').appendChild(newDiv);
    newDiv.addEventListener('click', function(){choosGraph(i)})
    
    let newCanvas = document.createElement('canvas');
    newCanvas.id = i;
    newCanvas.height = 100;
    newCanvas.width = 215;
    document.getElementById(newDiv.id).appendChild(newCanvas);
    
    newLabel = document.createElement('label');
    newLabel.textContent = content[i];
    document.getElementById(newDiv.id).appendChild(newLabel);

    let ctx = document.getElementById(i).getContext('2d');     
    let x = 0;
    ctx.fillStyle = 'rgb(219, 242, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let constX = 215 / graphTable[i].length;
    let y_min = 0;
    let y_max = 0;
    for(let j = 0; j < graphTable[i].length; j++)
    {
        if (graphTable[i][j] < y_min) y_min = graphTable[i][j];
        if (graphTable[i][j] > y_max) y_max = graphTable[i][j];
    }
    let Height = y_max - y_min;
    let constY = 100 / Height;
    let C = (Height - y_max) * constY;

    for(let j = 1; j < graphTable[i].length - 1; j++)
    {
        ctx.moveTo((j - 1) * constX, 100 - ((graphTable[i][j] * constY) + C));
        ctx.lineTo(j * constX, 100 - ((graphTable[i][j + 1] * constY) + C));
        
    }
    ctx.stroke();
    
    //let constY = 1;        
}

function createTable(channels, channelName, fileName, startDate, startTime)
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
    for(let i = 0; i < channels; i++)
    {
        let newTdName = document.createElement('td');
        newTdName.id = "td_" + i;
        newTdName.textContent = channelName[i];

        let newTdContent = document.createElement('td');
        newTdContent.id = "td_cntent_" + i;
        newTdContent.textContent = fileName;

        let newTr = document.createElement('tr');
        newTr.id = "tr_" + i;
        newTr.appendChild(newTdName);
        newTr.appendChild(newTdContent);
        document.getElementById('TChannels').appendChild(newTr);                    
    }
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


/*
var now = new Date(2011, 0, 1, 23, 234, 0);
let date = Date(now);
var timestamp = 1177186363 * 1000;
var t = new Date(timestamp * 1);
t = t.getTime()/1000;

alert(t);
alert(
    t.getFullYear() + "\n" +
    t.getMonth() + "\n" +
    t.getDate() + "\n" +
    t.getHours() + '\n' +
    t.getMinutes() + '\n' +
    t.getSeconds() + '\n' +
    t.getMilliseconds()
);
//alert(strtotime('18:32:21.000'))

var s1 = 'qwer zxc qwer qwzerz',
    s2 = 'qwer';
 
s1 = s1.replace (new RegExp (s2, 'g'), '');
alert(s1);//zxc qwzerz*/