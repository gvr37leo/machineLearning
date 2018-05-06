class Network{
    network:number[][]
    ins:number[]
    outs:number[]

    constructor(network:number[][],ins:number[],outs:number[]){
        this.ins = ins
        this.outs = outs
    }

    train(initalGene:Gene ,flowers:number[][],labels:number[]):Gene{
        var pool:Gene[] = []
        var poolsize = 100
        for(var i = 0; i < poolsize; i++){
            pool.push(initalGene.copy())
        }
        var scores:{score:number,gene:Gene}[];
        for(var gen = 0; gen < 100; gen++){
            scores = []

            for(var i = 0; i < pool.length; i++){
                var gene = pool[i]
                let score = Network.score(this.predict(gene,flowers),labels)
                scores.push({
                    score:score,
                    gene:gene,
                })
            }
            scores.sort((a,b) => a.score - b.score)//sould maybe be reversed

            scores.splice(10)
            pool = []
            pool.concat(scores.map(score => score.gene))
            for(let score of scores){
                for(var i = 0; i < 9; i++){
                    pool.push(score.gene.reproduce())
                }
            }
        }

        return scores[0].gene
    }

    inputValues:number[]

    predict(gene:Gene,flowers:number[][]):number[][]{
        var predictions:number[][] = []
        for(var flower of flowers){
            var length = flower[0]
            var leafsize = flower[1]

            this.inputValues = [length,leafsize]

            var rose = this.intergrate(5,gene)
            var dandelion = this.intergrate(6,gene)

            predictions.push([rose,dandelion])
            // var total = rose + dandelion

        }
        return predictions
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

    static score(predictions:number[][],actual:number[]):number{
        var scores:number[] = []

        for(var i = 0; i < predictions.length; i++){
            var prediction = predictions[i]
            var rose = prediction[0]
            var dandelion = prediction[1]

            var total = rose + dandelion
            var rosepercentile = rose / total
            var dandelionpercetile = 1 - rosepercentile
            var error = Math.abs(actual[i] - dandelionpercetile)
            scores.push(-error) 
        }

        return scores.reduce((prev,cur,i,array) => prev + cur) / scores.length
    }
}

