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
    let dataTable = [];    

    reader.onload = function() {                
        let fileText = reader.result;
        document.getElementById('collection').innerHTML = '';
        dataTable = fileText.split('\n') 
        dataTable.splice(dataTable.length - 1, 1);                       
        for(let i = 0; i < dataTable.length; i++)
        {
            let newDiv = document.createElement('li');
            if(i == 0) newDiv.className = "newDivTop textNone";
            else if(i == dataTable.length - 1) newDiv.className = "newDivBot textNone";
            else newDiv.className = "newDiv textNone";
            newDiv.textContent = dataTable[i];
            document.getElementById('collection').appendChild(newDiv);
        }        
    }
}
