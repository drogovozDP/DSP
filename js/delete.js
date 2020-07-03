function upload()
{
    let N = Number(document.getElementById('globalLength').value)
    if (isNaN(N)) return
    model_length = global_length = N
    let discret = Number(document.getElementById('discretStep').value)
    if (isNaN(discret)) return
    discretStep = discret

    dropGraphic()
    let collection = document.getElementById('collection')
    while(collection.firstChild) collection.removeChild(collection.firstChild)
    newLi = document.createElement('li')
    newLi.className = 'newDivTop newDivBot textNone'
    newLi.innerHTML = 'меню графиков'
    collection.appendChild(newLi)
    
    document.getElementById('count').innerHTML = ''
    document.getElementById('length').innerHTML = ''
    document.getElementById('discret').innerHTML = ''
    document.getElementById('startDateTime').innerHTML = ''
    document.getElementById('endDateTime').innerHTML = ''
    document.getElementById('range').innerHTML = ''
    channelName = []

    let table = document.getElementById('TChannels')
    let length = table.children.length
    for (let i = 1; i < length; i++)
        table.removeChild(table.children[1])   
    alert('длина канала = ' + N + ', частота дискретизации = ' + discret)         
}