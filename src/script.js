const canvas = document.getElementById('exercise_4')
const ctx = canvas.getContext('2d')
canvas.width = 400
canvas.height = 400


const sceneSize = [canvas.width, canvas.height]
const sceneCenter =  sceneSize.map(p => p * .5)

const canvasDraft = document.createElement('canvas')
canvasDraft.width = sceneSize[0]
canvasDraft.height = sceneSize[1]
const ctxDraft = canvasDraft.getContext('2d')

const border = (ctx) => {

    ctx.fillStyle = '#ccc'
    ctx.fillRect(0, 0, ...sceneSize)
    ctx.beginPath()
    ctx.arc(...sceneCenter, 150, 0, Math.PI * 2)
    ctx.fillStyle = '#222'
    ctx.fill()
}


border(ctxDraft)

const draw = (time) => {

    requestAnimationFrame(draw)

    ctx.clearRect(0, 0, ...sceneSize)

    //border(ctx)

    points.forEach(p => p.move())
    
}


class Point {

    constructor (x, y, i) {
        this.startX = x
        this.startY = y
        this.init()
    }

    init () {
        this.x = this.startX
        this.y = this.startY
        this.angle = Math.PI * 2 * Math.random()
        this.color = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`
        this.speed = Math.random() * 2
    }




    move () {
        this.x = this.x + Math.sin(this.angle) * this.speed
        this.y = this.y + Math.cos(this.angle) * this.speed


        if(!this.withinBorder()){
            this.init()
        }

        const radius = 10 * .1  + Math.abs((this.startX - this.x) * .2)
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }


    withinBorder () {

        const width = sceneSize[0]
        const data = ctxDraft.getImageData(0, 0, ...sceneSize).data

        const index = width * Math.floor(this.y) * 4 +  Math.floor(this.x) * 4
        const point = data[index]
       // console.log('point', point)

       return point !== 204


    }





}

const points = [...Array(5).keys()].map(i => new Point(...sceneCenter, i))

requestAnimationFrame(draw)
