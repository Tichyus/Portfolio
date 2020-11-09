const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

// Resize

const sizes = { width: 800, height: 600 }

let windowWidth = $canvas.width
let windowHeight = $canvas.height

const resize = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = windowWidth
    $canvas.height = windowHeight
}

window.addEventListener('resize', resize)
resize()

// Cursor

let isPressed = false
const cursor = {}
cursor.x = 0
cursor.y = 0
cursor.radius = 1


window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX
    cursor.y = _event.clientY
})

$canvas.addEventListener('mousedown', () =>
{
    isPressed = true 
})

$canvas.addEventListener('mouseup', () =>
{
    isPressed = false
})


// Dots

class Dots
{
    constructor(_x, _y, _context)
    {
        this.x = _x
        this.y = _y
        this.context = _context
    }

    draw()
    {
        this.context.beginPath()
        this.context.arc(this.x, this.y, 2, 0, Math.PI * 2)
        this.context.fillStyle = 'white'
        this.context.fill()
    }

    gravity()
    {
        this.y+=5
    }
}

// Lines


class Lines
{
    constructor(_x, _y, _a, _b, _context)
    {
        this.x = _x
        this.y = _y
        this.a = _a
        this.b = _b
        this.context = _context
    }

    draw()
    {
        this.context.beginPath()
        this.context.moveTo(this.x, this.y)
        this.context.lineTo(this.a, this.b)
        this.context.strokeStyle = 'white'
        this.context.stroke()
    }

    gravity()
    {
        this.y+=5
        this.b+=5
    }
}


dotsContainer = []
linesContainer = []
cursorPosition = []

// Prism drawing


function drawPrism()
{
    
    dotsX = cursor.x + Math.random() * cursor.radius - (cursor.radius)/2
    dotsY = cursor.y + Math.random() * cursor.radius - (cursor.radius)/2

    if (isPressed) {
        document.addEventListener('click', ()=>
        {
            cursorPosition = [[document.clientX, document.clientY]]
        })
        const dot = new Dots(dotsX, dotsY, context)
        dot.draw()
        dotsContainer.push(dot)
        cursorPosition.push([dotsX,dotsY])
        for (let i = 0; i < cursorPosition.length; i++) 
        {
            for (let j = 0; j < cursorPosition.length; j=j+1) 
            {
                const line = new Lines(cursorPosition[j][0], cursorPosition[j][1],cursorPosition[i][0], cursorPosition[i][1], context)
                line.draw()
                linesContainer.push(line)
            }
        }
        cursor.radius = cursor.radius+40
    }
    resetRadius()
}

function resetRadius() 
{
    if (!isPressed) {
        cursor.radius = 0
    }
}


function fall()
{
    window.requestAnimationFrame(fall)
    if(!isPressed)
    {
        context.fillStyle = 'rgba(0,0,0,1)'
        context.fillRect(0, 0, windowWidth, windowHeight)
        for (const _dot of dotsContainer) 
        {
            _dot.gravity()
            _dot.draw() 
        }
        for (const _line of linesContainer) 
        {
            _line.gravity()
            _line.draw()
        }
    }
}
fall()

// Ressources econmies

let timer = 0
function clock()
{
    timer++
}

setInterval(clock, 1000)

$canvas.addEventListener('mousedown', () =>
{
    timer = 0
})

if (timer>7) {
    dotsContainer = []
    linesContainer = []
}


// Drawing the prism

setInterval(drawPrism, 100)

