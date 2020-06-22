let model_length = 0;
let n0 = 0;
let countImpuls = [0,0,0,0,0,0,0,0,0,0,0,0];
let currModel = 0;
let omega = 0;
let varphi = 0;
let tau = 0;
let a_field = 0;
let b_field = 0;
let L_field = 0;
let f_field = 0;
let t_field = 0;
let f_zero_field = 0;
let m_field = 0;
let f_n = 0;
let sigma = 0;
let flex = 0;
let str_a;
let str_b;


let discretStep = 1;
modelTable = new Array();

function modelMenu()
{   
    if ((currModel == 1) || (currModel == 2))
    {
        n0 = Number(document.getElementById('nZero').value);
        if ((isNaN(n0)) || (n0 == null) || (n0 == 0)) return;
    }
    if (currModel == 3)
    {        
        a_field = Number(document.getElementById('a_field').value);

        if ((a_field <= 0) || (a_field >= 1) || isNaN(a_field) || (a_field == null)) return
    } 
    if (currModel == 4)
    {        
        a_field = Number(document.getElementById('a_field').value);

        omega = Number(document.getElementById('omega').value);

        varphi = Number(document.getElementById('varphi').value);

        if ((varphi == null) || (omega == null) || (isNaN(varphi)) || (isNaN(omega)))
        if ((varphi < 0) || (varphi > 2 * Math.PI) || (omega < 0) || (omega > Math.PI)) return;
    }      
    if ((currModel == 5) || (currModel == 6))
    {
        L_field = Number(document.getElementById('L_field').value);

        if ((L_field == null) || (isNaN(L_field)) || (L_field == 0)) return;
    }    
    if (currModel == 7)
    {
        a_field = Number(document.getElementById('a_field').value);

        varphi = Number(document.getElementById('varphi').value);


        f_field = Number(document.getElementById('f_field').value);


        tau = Number(document.getElementById('tau').value);
        document.getElementById('tau').value = '1488';
        if ((varphi == null) || (isNaN(varphi))) return;
        if ((a_field == null) || (isNaN(a_field))) return;
        if ((f_field == null) || (isNaN(f_field))) return;
        if ((tau == null) || (isNaN(tau)) || (tau == 0)) return;        
    }

    if ((currModel == 8) || (currModel == 9))
    {        
        f_zero_field = Number(document.getElementById('fZero').value);

        a_field = Number(document.getElementById('a_field').value);

        varphi = Number(document.getElementById('varphi').value);

        f_n = Number(document.getElementById('f_n').value);

        if ((f_zero_field == null) || (isNaN(f_zero_field))) return;
        if((varphi == null) || isNaN(varphi)) return;
        if((a_field == null) || isNaN(a_field)) return;
        if((f_n == null) || isNaN(f_n)) return;
    } 

    if (currModel == 9)
    {                        
        m_field = Number(document.getElementById('m_field').value);

        if((m_field == null) || isNaN(m_field) || (m_field < 0) || (m_field > 1)) return;        
    } 

    if (currModel == 10)
    {
        a_field = Number(document.getElementById('a_field').value);
        b_field = Number(document.getElementById('b_field').value);

        if ((a_field == null) || (isNaN(a_field)) || (b_field <= a_field) || (isNaN(b_field))) return;        
    }

    if (currModel == 11)
    {
        a_field = Number(document.getElementById('a_field').value);
        sigma = Number(document.getElementById('sigma').value);

        if ((a_field == null) || (isNaN(a_field)) || (isNaN(sigma))) return;        
    }

    if (currModel == 12)
    {
        a_field = 0;
        sigma = Number(document.getElementById('sigma').value);        
        flex = document.getElementById('flexField').value;
        let a = b = false;
        let arr_str_a = new Array()
        let arr_str_b = new Array()
                
        if ((flex.indexOf('a') != -1) || (flex.indexOf('а')) != -1) a = true
        if ((flex.indexOf('b') != -1) || (flex.indexOf('б')) != -1) b = true

        if (a)
        {
            if (flex.indexOf('a') != -1) arr_str_a = flex.split('a')
            else if (flex.indexOf('а') != -1) arr_str_a = flex.split('а')
        
            arr_str_a.shift()
            str_a = (arr_str_a[0].substr(arr_str_a[0].indexOf('{') + 1, arr_str_a[0].indexOf('}') - 2)).split(',')
        }
        
        if (b) 
        {
            if (flex.indexOf('b') != -1) arr_str_b = flex.split('b')
            else if (flex.indexOf('б') != -1) arr_str_b = flex.split('б')
        
            arr_str_b.shift()
            str_b = (arr_str_b[0].substr(arr_str_b[0].indexOf('{') + 1, arr_str_b[0].indexOf('}') - 2)).split(',')
            
        }        

        if ((a_field == null) || (isNaN(a_field)) || (sigma < a_field) || (isNaN(sigma))) return;                
    }
    
    if (model_length == 0) // защита от ошибок пользователя 
    {
        model_length = prompt('какой длины будет модель?');
        if ((isNaN(Number(model_length))) || (Number(model_length == 0)) || (model_length == null))
        {
            model_length = 0;
            return;
        } 
        model_length--
        if (typeof(global_length) == 'undefined') global_length = model_length;
        
    }
    let a = document.getElementById('menuBegin');
    if (a != null)
    {        
        document.getElementById('collection').innerHTML = '';        
    } 
    
    let newDiv = document.createElement('li');    
    let menu = document.getElementById('collection');
    newDiv.id = "newDiv" + graphTable.length;

    if (menu.children.length == 0)
    {
        newDiv.className = "newDivTop newDivBot textNone";            
    }
    else if(menu.children.length == 1)
    {
        if (modelTable.length != 0) modelTable[0].className = "newDivTop textNone";
        newDiv.className = "newDivBot textNone";        
    }
    else
    {
        if (modelTable.length != 0) modelTable[modelTable.length - 1].className = "newDiv textNone";//ошибка, если добавить сначала сигналы из файла, то в массиве ничего не будет.
        newDiv.className = "newDivBot textNone";        
    }
    modelTable.push(newDiv);    

    let canvas = document.createElement('canvas');
    canvas.height = 50;
    canvas.width = 215;    
    menu.appendChild(newDiv);
    newDiv.appendChild(canvas);                                    

    let model_name;
    let model_number = document.getElementById('TChannels').children.length - 1;    
    switch (currModel)
    {
        case 1:            
            {
                one_impuls(canvas, newDiv);
                model_name = 'ед. импульс_' + countImpuls[0]                
            }
            break;
        case 2:
            {
                blink_impuls(canvas, newDiv);                
                model_name = 'ед. скачок_' + countImpuls[1]                
            }
            break;
        case 3:
            {
                exp_model(canvas, newDiv);                
                model_name = 'убыв. эксп_' + countImpuls[2]
            }
            break;
        case 4:
            {
                discret_sin(canvas, newDiv)                
                model_name = 'синусоида_' + countImpuls[3]
            }
            break;
        case 5:
            {
                meandr(canvas, newDiv);                
                model_name = 'меандр_' + countImpuls[4]
            }
            break;
        case 6:
            {
                saw(canvas, newDiv);                
                model_name = 'пила_' + countImpuls[5]
            }
            break;
        case 7:
            {
                exp_ogib(canvas, newDiv);                
                model_name = 'эксп. огиб_' + countImpuls[6]
            }
            break;
        case 8:
            {
                balance(canvas, newDiv)            
                model_name = 'баланс. огиб_' + countImpuls[7]
            }
            break;
        case 9:
            {
                tonal(canvas, newDiv);                
                model_name = 'тонал. огиб_' + countImpuls[8]
            }
            break;
        case 10:
            {                
                white_noise(canvas, newDiv);
                model_name = 'белый шум_' + countImpuls[9]
            }
            break;
        case 11:
            {                
                normal_noise(canvas, newDiv);
                model_name = 'норм шум_' + countImpuls[10]
            }
            break;
        case 12:
            {                
                autoregres(canvas, newDiv);
                model_name = 'АРСС_' + countImpuls[11]
            }
            break;
        default:
            return;        
    }    
    add_info_table(model_number, model_name)

    
    
    //add_info_table(dick = document.getElementById('TChannels').children.length, )
    let count = Number(newDiv.id.substr(6, newDiv.id.length - 6));
       
    newDiv.addEventListener('contextmenu', function(){choosGraph(count); return false}, false);
    newDiv.oncontextmenu = new Function('return false;');         
}

function one_impuls(canvas, newDiv)
{        
    countImpuls[0] += 1;
    newDiv.append('ед. импульс_' + countImpuls[0]);
    channelName.push('ед. импульс_' + (countImpuls[0]));

    let x = canvas.width / model_length;
    shift = x;    
    
    let channel = new Array();
    channel.push(discretStep)

    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(0)


    channel[n0] = 1;    
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];

    graphTable.push(channel);    
        
    draw(canvas, channel, x);
    //choosGraph(graphTable.length - 1);
    //oscillogram();    
}

function blink_impuls(canvas, newDiv)
{
    countImpuls[1] += 1;
    newDiv.append('ед. скачок_' + countImpuls[1])
    channelName.push('ед. скачок_' + (countImpuls[1]));

    let x = canvas.width / model_length;
    shift = x;    
    
    let channel = new Array();    
    channel.push(discretStep)

    for (let i = 0; i < Number(model_length) + 1; i++) 
    {
        if (i < n0) channel.push(0);
        else channel.push(1);
    }
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function exp_model(canvas, newDiv)
{
    countImpuls[2] += 1;
    newDiv.append('убыв. эксп_' + countImpuls[2])
    channelName.push('убыв. эксп_' + (countImpuls[2]));

    let x = canvas.width / model_length;
    shift = x;    
    
    let channel = new Array();    
    channel.push(discretStep)

    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(Math.pow(a_field, i))
    
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function discret_sin(canvas, newDiv)
{
    countImpuls[3] += 1;
    newDiv.append('синусоида_' + countImpuls[3])
    channelName.push('синусоида_' + (countImpuls[3]));

    let x = canvas.width / model_length;
    shift = x;    
    
    let channel = new Array();    
    channel.push(discretStep)

    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field * Math.sin(i * omega + varphi))
    
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function meandr(canvas, newDiv)
{
    countImpuls[4] += 1;
    newDiv.append('меандр_' + countImpuls[4]);
    channelName.push('меандр_' + (countImpuls[4]));

    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();    
    channel.push(discretStep)
    
    for (let i = 0; i < Number(model_length) + 1; i++)
    {
        if (i  % L_field < L_field / 2) channel.push(1);
        else channel.push(-1);
    }
    
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function saw(canvas, newDiv)
{
    countImpuls[5] += 1;
    newDiv.append('пила_' + countImpuls[5]);
    channelName.push('пила_' + (countImpuls[5]));

    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();    
    channel.push(discretStep)
    
    for (let i = 0; i < Number(model_length) + 1; i++) channel.push((i % L_field) / L_field)         
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function exp_ogib(canvas, newDiv)
{
    countImpuls[6] += 1;
    newDiv.append('эксп. огиб_' + countImpuls[6]);
    channelName.push('эксп. огиб_' + (countImpuls[6]));

    let x = canvas.width / model_length;
    shift = x;
    
    let timePeriod = 1 / discretStep;

    let channel = new Array();     
    channel.push(discretStep)               
    
    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field * 
        Math.exp((-i)/tau) *
        Math.cos(2 * Math.PI * f_field * (1 / discretStep) * i + varphi)
    )

    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function balance(canvas, newDiv)
{
    countImpuls[7] += 1;
    newDiv.append('баланс. огиб_' + countImpuls[7]);
    channelName.push('баланс. огиб_' + (countImpuls[7]));
    
    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();    
    channel.push(discretStep)
    
    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field * 
        Math.cos(2 * Math.PI * f_zero_field * (1 / discretStep) * i) * 
        Math.cos(2 * Math.PI * f_n * (1 / discretStep) * i + varphi)
    )
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    

    draw(canvas, channel, x);
}

function tonal(canvas, newDiv)
{
    countImpuls[8] += 1;
    newDiv.append('тонал. огиб_' + countImpuls[8]);
    channelName.push('тонал. огиб_' + (countImpuls[8]));

    let x = canvas.width / model_length;
    shift = x;    
    
    let channel = new Array();    
    channel.push(discretStep)
    
    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field * 
        ((1 + m_field * 
            Math.cos(2 * Math.PI * f_zero_field * (1 / discretStep) * i)) * 
        Math.cos(2 * Math.PI * f_n * (1 / discretStep) * i + varphi)
        )
    )
    console.log(a_field, m_field, Math.PI, f_zero_field, 1 / discretStep, f_n, varphi)
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function white_noise(canvas, newDiv)
{    
    countImpuls[9] += 1;
    newDiv.append('белый шум_' + countImpuls[9]);
    channelName.push('белый шум_' + (countImpuls[9]));
 
    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();   
    channel.push(discretStep)
     
    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field + (b_field - a_field) * Math.random())
    
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function normal_noise(canvas, newDiv)
{    
    countImpuls[10] += 1;
    newDiv.append('норм шум_' + countImpuls[10]);
    channelName.push('норм шум_' + (countImpuls[10]));
 
    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();    
    channel.push(discretStep)    

    function Sum()
    {
        let a = 0;
        for (let i = 1; i <= 12; i++)
        {
            a += Math.random();
        }        
        return a - 6;
    }    

    for (let i = 0; i < Number(model_length) + 1; i++) channel.push(a_field + sigma * 1 * Sum())                
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function autoregres(canvas, newDiv)
{    
    countImpuls[11] += 1;
    newDiv.append('АРСС_' + countImpuls[11]);
    channelName.push('АРСС_' + (countImpuls[11]));
 
    let x = canvas.width / model_length;
    shift = x;
    
    let channel = new Array();    
    channel.push(discretStep)    

    function Sum()
    {
        let a = 0;
        for (let i = 1; i <= 12; i++)
        {
            a += Math.random();
        }        
        return a - 6;
    }    

    let sum_b
    let sum_a
    let sumArr = new Array()

    for (let i = 0; i < Number(model_length) + 1; i++)
    {        
        sum_b = 0
        sum_a = 0

        if (typeof(str_b) != 'undefined')
        {
            for (let k_1 = 1; k_1 <= str_b.length; k_1++)
            {            
                if (i - k_1 > 0) sum_b += Number(str_b[k_1 - 1]) * sumArr[sumArr.length - k_1]
            }
        }        
        
        if (typeof(str_a) != 'undefined')
        {
            for (let k_2 = 1; k_2 <= str_a.length; k_2++)
            {
                if (i - k_2 > 0) sum_a += Number(str_a[k_2 - 1]) * channel[channel.length - k_2 ]
                //console.log(sum_a)
            }
        }        
        let sum = sigma * sigma * Sum() 
        channel.push(sum + sum_b - sum_a)
        sumArr.push(sum)
    } 
    str_a = str_b = ''
        
    if (graphTable.length == 0) channel[0] = 1;
    else channel[0] = graphTable[0][0];
    
    graphTable.push(channel);    
        
    draw(canvas, channel, x);
}

function draw(canvas, channel, x)
{
 
    ctx = canvas.getContext('2d');
    ctx.beginPath();

    let y_min = Number.MAX_VALUE;
    let y_max = -Number.MAX_VALUE;
    for(let j = 1; j < channel.length; j++)
    {
        if (channel[j] <= y_min) y_min = channel[j];
        if (channel[j] >= y_max) y_max = channel[j];
    }
 
    let Height = y_max - y_min;
    let constY = canvas.height / Height;
    let C = (Height - y_max) * constY;


    for(let j = 1; j < channel.length - 1; j++)
    {
        ctx.moveTo((j - 1) * x, canvas.height - ((channel[j] * constY) + C));
        ctx.lineTo(j * x, canvas.height - ((channel[j + 1] * constY) + C));
        
    }
    ctx.fillStyle = 'rgb(219, 242, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();               
    ctx.closePath();
}

let opacity = 0;
let timer

prevModel = 0;

function hide_fields()
{
    document.getElementById('formula_' + currModel).style.display = 'none';
    document.getElementById('nZeroCase').style.display = 'none';   
    document.getElementById('aCase').style.display = 'none';
    document.getElementById('omegaCase').style.display = 'none';
    document.getElementById('varphiCase').style.display = 'none';
    document.getElementById('L_Case').style.display = 'none';
    document.getElementById('f_Case').style.display = 'none';
    document.getElementById('tauCase').style.display = 'none';            
    document.getElementById('fZeroCase').style.display = 'none';
    document.getElementById('mCase').style.display = 'none';
    document.getElementById('f_nCase').style.display = 'none';    
    document.getElementById('bCase').style.display = 'none';
    document.getElementById('sigmaCase').style.display = 'none';
    document.getElementById('flexCase').style.display = 'none';
}

function anim_menu(showMenu, _model)
{

    if (typeof(_model) != 'undefined') 
    {
        currModel = Number(_model.id.substr(6, _model.id.length - 6));
        for (let i = 1; i < 13; i++) document.getElementById('formula_' + i).style.display = 'none';
        
        hide_fields();

        if ((currModel == 1) || (currModel == 2))
        {
            document.getElementById('formula_' + currModel).style.display = 'block';
            document.getElementById('nZeroCase').style.display = 'block'               
        }

        if (currModel == 3)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';        
            document.getElementById('aCase').style.display = 'block';            
        }
        if (currModel == 4)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';        
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('omegaCase').style.display = 'block';
            document.getElementById('varphiCase').style.display = 'block';        
        }
        if ((currModel == 5) || (currModel == 6))
        {
            if (currModel == 5) document.getElementById('formula_' + currModel).style.display = 'block';
            if (currModel == 6) document.getElementById('formula_' + currModel).style.display = 'block';            
            document.getElementById('L_Case').style.display = 'block';                        
        }
        if (currModel == 7)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';
            document.getElementById('varphiCase').style.display = 'block';
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('f_Case').style.display = 'block';
            document.getElementById('tauCase').style.display = 'block';            
        }
        if (currModel == 8)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';            
            document.getElementById('fZeroCase').style.display = 'block';
            document.getElementById('varphiCase').style.display = 'block';
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('f_nCase').style.display = 'block';            
        }
        if (currModel == 9)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';            
            document.getElementById('fZeroCase').style.display = 'block';
            document.getElementById('varphiCase').style.display = 'block';
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('mCase').style.display = 'block';
            document.getElementById('f_nCase').style.display = 'block';            
        }
        if (currModel == 10)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('bCase').style.display = 'block';
        }
        if (currModel == 11)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';
            document.getElementById('aCase').style.display = 'block';
            document.getElementById('sigmaCase').style.display = 'block';
        }
        if (currModel == 12)
        {
            document.getElementById('formula_' + currModel).style.display = 'block';
            document.getElementById('sigmaCase').style.display = 'block';
            document.getElementById('flexCase').style.display = 'block';
        }
    }
    

    if (showMenu) document.getElementById('modelSettings').style.display = 'block';
    else document.getElementById('modelSettings').style.display = 'none';

    document.getElementById('superMenu').style.display = 'none'
    /*if (showMenu) //это анимация 
    {
        if (opacity != 0) return;
        timer = setInterval('anim(0.03)', 10)
    }
    else
    {
        if (opacity != 1) return;        
        timer = setInterval('anim(-0.03)', 10);
    }*/
}

function anim(j)
{            
    opacity += j;
    if (opacity > 1) opacity = 1;
    if (opacity < 0) opacity = 0;
    if (opacity == 1)  
    {
        clearInterval(timer);

    }
    if (opacity == 0)  
    {
        clearInterval(timer);

        document.getElementById('modelSettings').style.display = 'none';
    }    
    document.getElementById('modelSettings').style.opacity = opacity;            
}