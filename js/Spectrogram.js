let width = 900
let height = 500
let spectrogram = undefined
let palette = new Array(256)
for (let i = 0; i < palette.length; i++)
    palette[i] = new Array(3)
/*
for (let i = 0; i < palette.length; i++)
    for (let j = 0; j < palette[i].length; j++)
        palette[i][j] = i
*/
for (let j = 0; j < palette.length; j++)
{
    palette[j][0] = j * 3
    if (palette[j][0] > 255) palette[0][j] = 255
}    

let a = 0
palette[0][1] = palette[0][2] = 0 
for (let j = 1; j < palette.length; j++)
{
    a++    
    if (a == 3) 
    {
        palette[j][1] = palette[j - 1][1] + 1
        a = 1
    }
    palette[j][2] = j
}    

let coeff = 50

function createSpectogram()
{
    let main = document.createElement('div')
    main.id = 'spectrogram'
    main.className = 'textNone gistogram'      

    let header = document.createElement('div')
    header.id = 'spectrogramHeader'
    header.className = 'gistogramHeader'      
    header.style.textAlign = 'left'
    header.innerHTML = 'потяни меня'
    
    let body = document.createElement('div')   

    let canvas = document.createElement('canvas')    
    canvas.width  = width
    canvas.height = height
    canvas.id = 'specGramCanvas'

    body.appendChild(canvas)    
    main.appendChild(header)
    main.appendChild(body)
    document.getElementById('footer').appendChild(main)

    dragElement(main)    
    move()
    return main
}

function addSpectrogram(i)
{
    new_li = document.createElement('li')
    new_li.className = 'litable sub-li'
    new_li.innerHTML = channelName[i]
    new_li.id = 'specGram_' + i
    new_li.style.marginLeft = '0'

    new_li.addEventListener('click', function(){drawSpectrogram(i)})

    document.getElementById('specGram').appendChild(new_li)
}

function drawSpectrogram(i)
{
    let window = document.getElementById('spectrogram')
    if (window == null) window = createSpectogram()

    spectrogram = undefined

    let channel = graphTable[i]
    channel.splice(0, 1)
    let canvas = document.getElementById('specGramCanvas')     
        
    for (let j = 0; j < canvasTable.length; j++) 
        if (canvasTable[j].channelNumber == i)
            channel = canvasTable[j].totalChannel()          

    spectrogram = new Spectrogram(canvas, channel, 1 / discretStep, i)
    spectrogram.calculate()
}

let coeff_n = 5

class Spectrogram
{
    constructor(canvas, channel, period, channelNumber)
    {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.channel = channel
        this.period = period
        this.channelNumber = channelNumber
        this.image = new Array(canvas.height)
        this.maxValue
        for (let i = 0; i < this.image.length; i++)
            this.image[i] = new Array(canvas.width)
    }

    create()
    {                    
        console.log('cunt')    
        let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let y = 0; y < this.canvas.height; ++y) {
            for (let x = 0; x < this.canvas.width; ++x) {
                let pixelIndex = 4 * (x + y * this.canvas.width);
                let a = Math.min(255, Math.floor(this.image[y][x] / this.maxValue * coeff * 256))
                imgData.data[pixelIndex] = palette[a][0] //r
                imgData.data[pixelIndex + 1] = palette[a][1]//g
                imgData.data[pixelIndex + 2] = palette[a][2]//b
                imgData.data[pixelIndex + 3] = 255; //a                
            }
        }
        this.ctx.putImageData(imgData, 0, 0) 
    }
    
    test()
    {
        let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let y = 0; y < this.canvas.height; ++y) {
            for (let x = 0; x < this.canvas.width; ++x) {
                let pixelIndex = 4 * (x + y * this.canvas.width);
                imgData.data[pixelIndex] = Math.random() * 255; //r
                imgData.data[pixelIndex + 1] = Math.random() * 255; //g
                imgData.data[pixelIndex + 2] = Math.random() * 255; //b
                imgData.data[pixelIndex + 3] = 255; //a                
            }
        }
        this.ctx.putImageData(imgData, 0, 0)
        console.log(Math.min(3, 6))
        palette[255][0] 
    }

    calculate()
    {
        let K = this.canvas.height
        let Ns = this.canvas.width
        let section_base = this.channel.length / Ns
        let section_N = Math.floor(section_base * coeff_n)
        let L = 1
        let NN = 2 * K * L        
        
        if (section_N > 2 * K){
            while (section_N > NN)            
            {
                //console.log(NN, section_N)
                L++
                NN = 2 * K * L
            }
        }
        
        let x = new Array(NN)
        for (let ns = 0; ns < Ns; ns++)
        {
            for (let i = 0; i < x.length; i++) x[i] = 0//5.6

            let n0 = Math.floor(ns * section_base)//5.1
            for (let i = n0; i < n0 + section_N; i++)//5.2
            {
                if (i < this.channel.length) x[i - n0] = this.channel[i]
            }

            let s = 0//5.3
            for (let i = 0; i < section_N; i++) s += x[i]
            s /= section_N
            for (let i = 0; i < section_N; i++) x[i] -= s

            for (let i = 0; i < section_N; i++)//5.4
            {
                let w = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (section_N - 1))
                x[i] *= w
            }
            let A = new Array(NN / 2)
            let A_np = new Array(NN / 2)

            let complex = [[], []]                                        
            for (let k = 0; k < Math.floor(x.length / 2); k++)
            {
                let S_re = 0
                let S_im = 0
                for (let n = 0; n < x.length; n++)
                {
                    S_re += x[n] * Math.cos((-2 * Math.PI * k * n) / x.length)
                    S_im += x[n] * Math.sin((-2 * Math.PI * k * n) / x.length)
                }        
                complex[0].push(S_re)
                complex[1].push(S_im)
            }
            
            complex[0][0] = complex[0][1]

            if (L == 1)
            {                
                for (let k = 0; k < A.length; k++)
                {        
                    A[k] = Math.sqrt(complex[0][k] * complex[0][k] + complex[1][k] * complex[1][k]) * this.period
                }                    
            }
            else
            {                                
                for (let k = 0; k < A_np.length; k++)
                {        
                    A_np[k] = Math.sqrt(complex[0][k] * complex[0][k] + complex[1][k] * complex[1][k]) * this.period
                }                    
                let L_1 = Math.floor(-(L - 1) / 2)
                let L_2 = Math.floor(L / 2)                
                for (let k = 0; k < A.length; k++)
                {                
                    let Sum = 0
                    for (let i = L_1; i < L_2; i++)
                    {
                        Sum += A_np[Math.abs(L * k + i)]
                    }                    
                    A[k] = Sum / L
                }                                
            }        
            
            for (let k = 0; k < K; k++) this.image[k][ns] = A[k]
        }
        let maxValue = -Number.MAX_VALUE        
        for (let k = 0; k < K; k++){            
            for (let ns = 0; ns < Ns; ns++){                
                if (maxValue < this.image[k][ns])
                {
                    maxValue = this.image[k][ns]                    
                }
            }
        }

        this.maxValue = maxValue

        for (let i = 0; i < this.image[0].length; i++)
            for (let j = 0; j < this.image.length / 2; j++)
            {
                let q = this.image[j][i]
                this.image[j][i] = this.image[this.canvas.height - 1 - j][i]
                this.image[this.canvas.height - 1 - j][i] = q
            }

        let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for (let y = 0; y < this.canvas.height; ++y) {
            for (let x = 0; x < this.canvas.width; ++x) {
                let pixelIndex = 4 * (x + y * this.canvas.width);
                let a = Math.min(255, Math.floor(this.image[y][x] / maxValue * coeff * 256))
                imgData.data[pixelIndex] = palette[a][0] //r
                imgData.data[pixelIndex + 1] = palette[a][1]//g
                imgData.data[pixelIndex + 2] = palette[a][2]//b
                imgData.data[pixelIndex + 3] = 255; //a                
            }
        }
        this.ctx.putImageData(imgData, 0, 0)         
    }
}
