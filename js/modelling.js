//let firstModel = true;

function model()
{
    let a = document.getElementById('menuBegin');
    if (a != null)
    {        
        document.getElementById('collection').innerHTML = '';        
    } 

    let newDiv = document.createElement('li');
    newDiv.textContent = 'dick cunt cum'
    let menu = document.getElementById('collection');
    
    document.getElementById('collection').appendChild(newDiv);
    //alert(typeof(a))
    //menu.firstChild.remove();
    //alert(typeof(document.getElementById('menuBegin')))
    //if(1 == 0) newDiv.className = "newDivTop textNone";
    //else if(1 == content.length - 1) newDiv.className = "newDivBot textNone";
    //else newDiv.className = "newDiv textNone";
}