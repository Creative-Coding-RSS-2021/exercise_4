const canvas = document.getElementById('exercise_4')
const ctx = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

const sceneSizes = [0, 0, canvas.width, canvas.height]
const sceneCenter = sceneSizes.slice(2).map(s => Math.floor(s * .5))

const canvasDraft = document.createElement('canvas')
const ctxDraft = canvasDraft.getContext('2d')

canvasDraft.width = sceneSizes[2]
canvasDraft.height = sceneSizes[3]




const transaction = (x, y, func) => {
    ctx.save()
    ctx.translate(x, y)
    func()
    ctx.restore()
} 

const border = (ctx, stroke) => {

    ctx.fillStyle = "#ccc";
    ctx.fillRect(...sceneSizes);
    ctx.beginPath()
    ctx.arc(...sceneCenter, 150, 0, Math.PI * 2)
    ctx.fillStyle = '#222'
    if(stroke){
        ctx.stroke()
    }else {
        ctx.fill()
    }
    

}

border(ctxDraft)
//border(ctx)


const draw = (time) => {
    
    //if(time > 5000) return
    
    requestAnimationFrame(draw)

    ctx.clearRect(...sceneSizes)
    //border(ctx, true)
    
    points.forEach(p => p.move(points))

    


}

requestAnimationFrame(draw)



class Point {

    constructor (x, y, index) {

        const angel = index/pointsNum * Math.PI * 2
        this.init(x, y, angel)
        
    }

    init (x, y, angle) {
        const [dx, dy] = sceneCenter

        this.x = dx + x 
        this.y = dy + y
        this.angel = angle //Math.PI * 2 * Math.random()
        this.speed = Math.random() + 1 
        this.arcRadius = 5
        this.color = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`
        this.heu = 360*Math.random();
    } 

    hsl (lightness) {
        return  `hsl(${this.heu},100%,${lightness}%)`;
    }

    move (allPoints) {
       // ctx.save()
       // ctx.translate(...sceneCenter)
        //ctx.rotate(this.angel)
        
        this.angel = this.angel - .01
        this.x = (this.x + Math.sin(this.angel) )
        this.y = (this.y + Math.cos(this.angel) )

        
        let flag = false

        allPoints.forEach(p => {
            if(!flag && !p.isInDraft()){
                flag = true
            }
        })

        if(flag) {
            
            this.init(0, 0, this.angel)
            
        }
                
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.arcRadius * 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
     //   ctx.restore()
    }

    isInDraft () {
        
        const width = sceneSizes[2]
        
        const [dx, dy] = sceneCenter
    //    ctxDraft.save()
    //    ctxDraft.rotate(this.angel)
       
        const data = ctxDraft.getImageData(...sceneSizes).data
       
        const index = Math.floor(width * Math.floor(this.y) * 4 + (Math.floor(this.x)  * 4))
        const pointInDraft = data[index]  
        
        
        //console.log('pointInDraft', pointInDraft, this.x, this.y)
        return pointInDraft !== 204
        


    }

}


const pointsNum = 5

const points = [...Array(pointsNum).keys()].map((i) => new Point(0, 0, i))

