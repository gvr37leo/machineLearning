class Network{
    network:number[][]
    ins:Set<number>
    outs:number[]

    constructor(network:number[][],ins:number[],outs:number[]){
        this.ins = new Set(ins)
        this.outs = outs
        this.network = network
        
    }

    draw(ctx:CanvasRenderingContext2D,layers:number[][],gene:Gene){
        var x = 0;
        for(var layer of layers){
            var y = 0;
            for(var neuronIndex of layer){
                var neuron = gene.neurons[neuronIndex]
                ctx.ellipse(x * 100 + 100,y * 50 + 50,neuron.bias,neuron.bias,0,0,Math.PI * 2)
                y++;
            }
            x++;
        }

        for(var x = 1; x < layers.length;x++){
            for(var y = 0; y < layers[x].length; y++){
                var neuron = gene.neurons[y]

                for(var weight of neuron.weights){
                    this.line(ctx,new Vector2(x * 100 + 100,0),new Vector2(0,0),weight)
                }
            }
        }

    }

    line(ctx:CanvasRenderingContext2D,a:Vector2,b:Vector2,width:number){
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineWidth = width;
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }

    genBlankGene():Gene{
        return new Gene(this.network.map(v => new Neuron(new Array(v.length).fill(1),0)))
    }

    train(initalGene:Gene ,flowers:number[][],labels:number[]):Gene{
        var pool:Gene[] = []
        var poolsize = 100
        for(var i = 0; i < poolsize; i++){
            pool.push(initalGene.reproduce())
        }
        var scores:{score:number,gene:Gene}[];
        for(var gen = 0; gen < 100; gen++){
            scores = []

            for(var i = 0; i < pool.length; i++){
                var gene = pool[i]
                let score = Network.scoreList(this.predictList(gene,flowers),labels)
                scores.push({
                    score:score,
                    gene:gene,
                })
            }
            scores.sort((a,b) => a.score - b.score)

            scores.splice(10)
            pool = []
            pool = pool.concat(scores.map(score => score.gene))
            for(let score of scores){
                for(var i = 0; i < 9; i++){
                    pool.push(score.gene.reproduce())
                }
            }
        }

        return scores[0].gene
    }

    inputValues:number[]

    predictList(gene:Gene,flowers:number[][]):number[][]{
        return flowers.map(f => this.predict(gene,f))
    }

    predict(gene:Gene,flower:number[]):number[]{
        var prediction:number[] = []
        this.inputValues = flower
        prediction = this.outs.map(index => this.intergrate(index,gene))
        return prediction
    }



    intergrate(neuronIndex:number,gene:Gene):number{
        if(this.ins.has(neuronIndex)){
            return this.inputValues[neuronIndex]
        }else{
            var result = 0;

            var neuron = gene.neurons[neuronIndex]
            for(var i = 0; i < neuron.weights.length; i++){
                var weight = neuron.weights[i]
                result += weight * this.intergrate(this.network[neuronIndex][i],gene)
            }

            return sigmoid(result + neuron.bias)
        }
    }

    static scoreList(predictions:number[][],actual:number[]):number{
        return predictions.map((p, i) => Network.score(p,actual[i])).reduce((acc, val) => acc + val) / predictions.length
    }

    static score(prediction:number[],actual:number):number{
        var error:number = 0
        for(var i = 0; i < prediction.length; i++){
            if(i == actual){
                error += 1 - prediction[i]
            }else{
                error += prediction[i]
            }
        }
        return error
    }
    
    static genNetwork(layers:number[]):Network{
        var network:number[][] = []
        var neuronIndex = 0;
        var neuronIndexes = []

        for(var  i = 0; i < layers.length; i++){
            var layerSize = layers[i]
            for(var j = 0; j < layerSize; j++){
                network.push(neuronIndexes.slice())
            }
            neuronIndexes = range(neuronIndex,layerSize + neuronIndex)
            neuronIndex += layerSize
        }
        return new Network(network,range(0,layers[0]),neuronIndexes)
    }


}

function range(from:number, to:number):number[]{
    var result = []
    for(var i = from; i < to; i++){
        result.push(i)
    }
    return result
}