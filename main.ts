/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="neuron.ts" />
/// <reference path="flower.ts" />
/// <reference path="network.ts" />
/// <reference path="plotter.ts" />




var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt
var plotter = new Plotter(new Vector2(-50,450),new Vector2(40,400))



var trainingSet = Flower.generateFlowers(100)
var dataset = Flower.generateFlowers(100)
var network = Network.genNetwork([2,2])



var seedgene = network.genBlankGene()

var gene = network.train(seedgene,trainingSet.map(f => f.toArray()),trainingSet.map(f => f.type))
var score = Network.scoreList(network.predictList(gene,dataset.map(f => f.toArray())),dataset.map(f => f.type))

console.log(score)
console.log(gene)

var flower = Flower.generateFlowers(1)[0]
var prediction = network.predict(gene,flower.toArray())

plotter.draw(ctxt,dataset.map(f => f.toVector()),dataset.map(f => f.type),network,gene)
// network.draw(ctxt,[[]],gene)

