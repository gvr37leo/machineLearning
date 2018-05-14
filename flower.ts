/// <reference path="node_modules/utilsx/utils.ts" />


enum FlowerType{rose,dandelion}

class Flower{
    length:number
    leafSize:number
    type:FlowerType

    constructor(length:number,leafSize:number,type:FlowerType){
        this.leafSize = leafSize
        this.length = length
        this.type = type
    }

    static generateFlowers(x:number):Flower[]{
        var flowers = []
        for(var i = 0; i < x; i++){
            if(coinflip()){
                flowers.push(new Flower(randomSpread(5,2),randomSpread(0.8,0.2),FlowerType.dandelion))
            }else{
                flowers.push(new Flower(randomSpread(9,4),randomSpread(0.3,0.2),FlowerType.rose))
            }
        }
        return flowers
    }

    toArray():number[]{
        return [this.length,this.leafSize]
    }

    toVector():Vector2{
        return new Vector2(this.length,this.leafSize)
    }
}

function coinflip(){
    return Math.random() > 0.5
}