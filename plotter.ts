/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/matrix2x/matrix.ts" />


class Plotter{
    vp: Matrix;
    transform: Matrix;
    offset:Vector2
    zoom:Vector2

    constructor(offset:Vector2,zoom:Vector2){
        this.offset = offset
        this.zoom = zoom

        var canvas = Matrix.canvasTransform(new Vector2(0,0),new Vector2(500,500))
        var camera = Matrix.canvasCamera(new Vector2(4,0.5), new Vector2(11,1.5))
        
        this.transform = canvas.multM(camera)
    }

    draw(ctx:CanvasRenderingContext2D,dataPoints:Vector2[],labels:number[],network:Network,gene:Gene){
        for (let i = 0; i < dataPoints.length; i++) {
            var datapoint = dataPoints[i];

            switch (labels[i]) {
                case 0:
                    ctx.fillStyle = 'red'                    
                    break;
                case 1:
                    ctx.fillStyle = 'yellow'
                    break;
            }

            var transformedPoint = this.transform.multV(datapoint.c())

            ctx.beginPath()
            ctx.ellipse(transformedPoint.x,transformedPoint.y,5,5,0,0,Math.PI * 2)
            ctx.fill()
            
        }
    }
}