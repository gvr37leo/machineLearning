/// <reference path="node_modules/utilsx/utils.ts" />

class Neuron{
    weights:number[]
    bias:number
    mutationRate = 0.9

    constructor(weights:number[], bias:number){
        this.weights = weights
        this.bias = bias
    }

    copy():Neuron{
        return new Neuron(this.weights.map(w => w),this.bias)
    }

    mutate():Neuron{
        this.bias += randomSpread(0,this.mutationRate)
        this.weights.forEach((v,i,array) => array[i] += randomSpread(0,this.mutationRate))
        return this
    }
}

class Gene{
    neurons:Neuron[]

    constructor(neurons:Neuron[]){
        this.neurons = neurons
    }

    copy():Gene{
        return new Gene(this.neurons.map(n => n.copy()))
    }

    mutate():Gene{
        this.neurons.forEach(n => n.mutate())
        return this
    }

    reproduce():Gene{
        return this.copy().mutate()
    }
}

function clamped(x:number):number{
    if(x >= 0){
        return x
    }else{
        return 0
    }
}

function neural(x:number):number{
    if(x >= 0){
        return 1
    }else{
        return 0
    }
}

function sigmoid(x:number):number{
    return 1 / (1 + Math.pow(Math.E,-x))
}