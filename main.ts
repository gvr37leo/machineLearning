/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="neuron.ts" />
/// <reference path="flower.ts" />
/// <reference path="network.ts" />

var trainingSet = Flower.generateFlowers(100)
var dataset = Flower.generateFlowers(100)

var network = new Network(
    [[],[],[0,1],[0,1]],
    [0,1],
    [0,1]
)

var seedgene = network.genBlankGene()

var gene = network.train(seedgene,trainingSet.map(f => f.toArray()),trainingSet.map(f => f.type))
var score = Network.scoreList(network.predictList(gene,dataset.map(f => f.toArray())),dataset.map(f => f.type))

console.log(score)
console.log(gene)

var flower = Flower.generateFlowers(1)[0]
var prediction = network.predict(gene,flower.toArray())

console.log(1)

