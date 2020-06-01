function download()
{
    let text = '# channels number\n' + String(graphTable.length) + '\n# samples number\n' + String(model_length - 1) + '\n';    
    text += '# sampling rate\n' + String(discretStep) + '\n';
    text += '# start date\n01-01-2000\n# start time\n00:00:00.000\n# channels names\n'
    for (let i = 0; i < channelName.length - 1; i++) text += channelName[i] + ';';
    text += channelName[channelName.length - 1] + '\n'    
    
    for (let i = 1; i < graphTable[0].length; i++)
    {
        for (let j = 0; j < graphTable.length; j++)
        {
            text += String(graphTable[j][i]) + ' ';
        }
        text += '\n'
    }

    let a = document.createElement('a');
    let file = new Blob([text], {type: 'application/json'})
    a.href = URL.createObjectURL(file);
    a.download = 'channels.txt';
    a.click()
}