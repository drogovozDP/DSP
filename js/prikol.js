answers = [true, true, false, true, false, false, true]
userAnswers = new Array()

//localStorage.clear()

function addListeners()
{            
    let prikolButton = document.getElementById('prikol')

    prikolButton.addEventListener('click', function(){checkPrikol(true)})
    prikolButton.addEventListener('contextmenu', function(){checkPrikol(false)})
    prikolButton.oncontextmenu = new Function('return false')    
    
    if (localStorage.getItem('check') == 'true')
    {     
        realniy_prikol()
        return
    }
}

function checkPrikol(leftButt)
{
    userAnswers.push(leftButt)
    
    if (localStorage.getItem('check') == null)
    {
        for (let i = 0; i < userAnswers.length; i++)
        {
            if (answers[i] != userAnswers[i])
            {
                alert('неправильно')
                dropAnswers()
                return
            }
        }
    }
    else
    for (let i = 0; i < userAnswers.length; i++)
        {
            if (answers[i] == userAnswers[i])
            {
                alert('неправильно')
                dropAnswers()
                return
            }
        }

    if (userAnswers.length == answers.length)
    {
        if (localStorage.getItem('check') == null)
        {
            localStorage.setItem('check', true)
            alert("капец(':")
            dropAnswers()
        } 
        else 
        {
            localStorage.clear()
            alert('вылечил')
        }
        
        realniy_prikol()
    }
}

function dropAnswers()
{
    userAnswers.splice(0, userAnswers.length)    
}

function setPrikol()
{
    alert(localStorage.getItem('check'))
}

let death
let speed = 200

function realniy_prikol()
{                
    //litable secondTable
    main_theme()
    let prikolButt = document.getElementById('prikol')    
    prikolButt.style.color = 'black'
    prikolButt.innerHTML = 'не L не R'
    
    death = setInterval('animation()', speed)
}

function animation()
{
    let a = Math.random() * 255
    let b = Math.random() * 255
    let c = Math.random() * 255
    let color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    document.body.style.backgroundColor = color
    
    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    document.body.style.color = color

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let topItems = document.getElementsByClassName('mainLi')
    for (let i = 0; i < topItems.length; i++)
    {
        topItems[i].style.backgroundColor = color    
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let top = document.getElementsByClassName('heading')
    for (let i = 0; i < top.length; i++)
    {
        top[i].style.backgroundColor = color    
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let litable = document.getElementsByClassName('litable')
    for (let i = 0; i < litable.length; i++)
    {
        litable[i].style.backgroundColor = color  
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let sub_li = document.getElementsByClassName('sub-li')
    for (let i = 0; i < sub_li.length; i++)
    {
        sub_li[i].style.backgroundColor = color  
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    sub_li = document.getElementsByClassName('secondTable')
    for (let i = 0; i < sub_li.length; i++)
    {
        sub_li[i].style.backgroundColor = color  
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let td = document.getElementsByTagName('td')    
    for (let i = 0; i < td.length; i++)
    {
        td[i].style.backgroundColor = color 
    }

    a = Math.random() * 255
    b = Math.random() * 255
    c = Math.random() * 255
    color = 'rgb(' + a + ', ' + b + ', ' + c + ')'
    let th = document.getElementsByTagName('th')
    for (let i = 0; i < th.length; i++)
    {
        th[i].style.backgroundColor = color    
    }
    clearInterval(death)
    if (speed >= 2) speed--
    death = null
    realniy_prikol()
}

let main_sound = true

function main_theme()
{
    if (!main_sound) return;
    music();
    setInterval('music()', 288000)
    main_sound = false;
}

function music()
{    
    let b = new Audio();
    b.src = 'Drum & Bass - Жесткий драм_(YoSounds.ru).mp3';
    b.volume = 0.5;
    b.play()
}