/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="neuron.ts" />
/// <reference path="flower.ts" />
/// <reference path="network.ts" />

var trainingSet = Flower.generateFlowers(100)
var dataset = Flower.generateFlowers(100)

var network = new Network(
    [[],[],[0,1],[0,1],[2,3,4],[2,3,4],[2,3,4]],
    [0,1],
    [5,6]
)

var seedgene = new Gene([
    new Neuron([],0),
    new Neuron([],0),
    new Neuron([1,1],0),
    new Neuron([1,1],0),
    new Neuron([1,1,1],0),
    new Neuron([1,1,1],0),
    new Neuron([1,1,1],0),
])

var gene = network.train(seedgene,trainingSet.map(f => f.toArray()),trainingSet.map(f => f.type))
Network.score(network.predict(gene,dataset.map(f => f.toArray())),dataset.map(f => f.type))

https://github.com/gvr37leo/machineLearning.git