const canvas = document.getElementById('exercise_4')
const ctx = canvas.getContext('2d')
canvas.width = Math.min(window.innerWidth, window.innerHeight)
canvas.height = Math.min(window.innerWidth, window.innerHeight)




const sceneSize = [canvas.width, canvas.height]
const sceneCenter = sceneSize.map(p => p * .5)

const canvasDraft = document.createElement('canvas')
canvasDraft.width = sceneSize[0]
canvasDraft.height = sceneSize[1]
const ctxDraft = canvasDraft.getContext('2d')

const border = (ctx) => {

    ctx.fillStyle = '#ccc'
    ctx.fillRect(0, 0, ...sceneSize)
    ctx.beginPath()
    ctx.arc(...sceneCenter, Math.min(...sceneCenter) - 50, 0, Math.PI * 2)
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

    constructor(x, y, i) {
        this.startX = x
        this.startY = y
        this.init()
    }

    init() {
        this.x = this.startX
        this.y = this.startY
        this.angle = Math.PI * 2 * Math.random()
        this.shape = Math.floor(Math.random() * 3)

        //rgb original
        //this.color = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`

        //this.color = [360 * Math.random(), 100 * Math.random(), 60 * Math.random(), 1]
        //ctx.fillStyle = `hsl(${ this.color[0] }, ${ this.color[1] }%, ${ this.color[2] }%)`


        this.color = [360 * Math.random(), 100, 50, 1]
        ctx.fillStyle = `hsl(${ this.color[0] }, ${ this.color[1] }%, ${ this.color[2] }%)`


        this.speed = Math.random() * 4 + .5
    }




    move() {
        this.x = this.x + Math.sin(this.angle) * this.speed
        this.y = this.y + Math.cos(this.angle) * this.speed


        if (!this.withinBorder()) {
            this.init()
        }

        /*
        const radius = 10 * .1 + Math.abs((this.startX - this.x) * .2)
        ctx.beginPath()
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
            //this.color[3] -= .009 //change opacity
        this.color[0] += 2 //change color
        ctx.fillStyle = `hsl(${ this.color[0] }, ${ this.color[1] }%, ${ this.color[2] }%,${this.color[3]})`
        ctx.fill()
        */

        ctx.beginPath()

        switch (this.shape) {
            case 0: // rectangle
                ctx.rect(this.x, this.y, 15, 15)

                break;
            case 1: //circle
                ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)

                break;
            case 2: //triangle
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + 10, this.y + 20);
                ctx.lineTo(this.x - 10, this.y + 20);
                ctx.lineTo(this.x, this.y);

                break;
        }
        ctx.lineWidth = "2";
        this.color[3] -= .005 //change opacity
        this.color[0] += 2 //change color
        ctx.strokeStyle = `hsla(${ this.color[0] }, ${ this.color[1] }%, ${ this.color[2] }%,${this.color[3]})` //colors
            //ctx.strokeStyle = `hsla(${ this.color[0] }, ${ this.color[1] }%, ${ 0 }%,${this.color[3]})` //black
        ctx.stroke();
    }


    withinBorder() {

        const width = sceneSize[0]
        const data = ctxDraft.getImageData(0, 0, ...sceneSize).data

        const index = width * Math.floor(this.y) * 4 + Math.floor(this.x) * 4
        const point = data[index]
            //console.log('point', point)

        return point !== 204


    }

}


const points = [...Array(15).keys()].map(i => new Point(...sceneCenter, i))

requestAnimationFrame(draw)