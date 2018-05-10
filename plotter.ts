/// <reference path="node_modules/vectorx/vector.ts" />


class Plotter{

    constructor(viewport){

    }

    draw(ctx:CanvasRenderingContext2D,dataPoints:number[][],labels:number[],network:Network,gene:Gene){
        for (let i = 0; i < dataPoints.length; i++) {
            const datapoint = dataPoints.length[i];

            switch (labels[i]) {
                case 0:
                    ctx.fillStyle = 'red'                    
                    break;
                case 1:
                    ctx.fillStyle = 'yellow'
                    break;
            }

            ctx.ellipse(datapoint[0],datapoint[1],10,10,0,0,Math.PI * 2)
            
        }
    }
}