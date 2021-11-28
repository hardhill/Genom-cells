import Utils from "./utils"

const DNCLEN = 64
export class Genom{
    public genom:Array<number>
    constructor(){
        this.genom = new Array<number>(DNCLEN)
        GenerateGenom(this.genom)
    }
}

function GenerateGenom(genom:Array<number>){
    for (let i = 0; i < DNCLEN; i++) {
        genom[i] = Utils.getRandomInt(0,DNCLEN-1)
    }
}