class Network{
    network:number[][]
    ins:number[]
    outs:number[]

    constructor(network:number[][],ins:number[],outs:number[]){
        this.ins = ins
        this.outs = outs
        this.network = network
    }

    draw(ctx:CanvasRenderingContext2D,layers:number[],gene:Gene){
        for(var layer of layers){
            // ctx.ellipse(10,10)
        }
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
            scores.sort((a,b) => b.score - a.score)//sould maybe be reversed

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
        prediction = this.ins.map(v => this.intergrate(this.ins[v],gene))
        return prediction
    }



    intergrate(neuronIndex:number,gene:Gene):number{
        if(neuronIndex == this.ins[0]){
            return this.inputValues[0]
        }else if(neuronIndex == this.ins[1]){
            return this.inputValues[1]
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
        error = prediction.reduce((acc,val) => acc + val)
        error -= prediction[actual] + (1 - prediction[actual])
        return -error
    }
    
}

