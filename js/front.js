let graphTable = new Array();

function showInfo(_id){

    let a = 'sub-' + _id;
    if (document.getElementById(a).style.visibility == 'visible')document.getElementById(a).style.visibility = 'hidden';
    else document.getElementById(a).style.visibility = 'visible';
    //alert(a)

}

function showFile(input){

    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    let dataTable, subGraphTalbe, channelName = [];
        

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
        let discrenStep = Number(dataTable[2]);//шаг дискретизации
        
        subGraphTalbe.splice(0, 6);                
        
        for(let i = 0; i < subGraphTalbe.length; i++)
        {
            let newStr = [];
            newStr = subGraphTalbe[i].split(' ');
            for (let j = 0; j < channels; j++) graphTable[j][i] = Number(newStr[j]);
            
            
        }        
                
        for (let i = 0; i < channels; i++) graphTable[i].unshift(discrenStep);
                   

        /*for(let i = 0; i < graphTable.length; i++)
        {
            let newDiv = document.createElement('li');
            if(i == 0) newDiv.className = "newDivTop textNone";
            else if(i == graphTable.length - 1) newDiv.className = "newDivBot textNone";
            else newDiv.className = "newDiv textNone";
            newDiv.textContent = graphTable[i];
            document.getElementById('collection').appendChild(newDiv);
        } */  
        choosGraph(graphTable[0]);
    }
}
/*
var s1 = 'qwer zxc qwer qwzerz',
    s2 = 'qwer';
 
s1 = s1.replace (new RegExp (s2, 'g'), '');
alert(s1);//zxc qwzerz*/