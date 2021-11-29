import Utils from "./utils"

const DNCLEN = 64
export class Genom {

    public genom: Array<number>
    public static genofond: BacteriaStat[]
    constructor() {
        this.genom = new Array<number>(DNCLEN)
        Genom.genofond = new Array<BacteriaStat>()

    }
    newGenom() {
        if (Genom.genofond.length > 0) {
            let rnd = Utils.getRandomInt(0, Genom.genofond.length - 2)
            this.genom = Genom.genofond[rnd].genom.slice(0)
            //console.log('Take genofond',this.genom)
        } else {
            GenerateFirstGenom(this.genom)
            console.log('First genom', this.genom)
        }
        return this.genom

    }
    Recombination() {
        if (Genom.genofond.length > 7) {
            for (let i = 0; i < Genom.genofond.length - 2; i++) {
                let bacstat: BacteriaStat = Genom.genofond[i]
                for (let n = 0; n < bacstat.genom.length; n++) {
                    if ([6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63].includes(n)) {
                        Genom.genofond[i].genom[n] = Utils.getRandomInt(0, DNCLEN - 1)
                    }
                }
            }
        }
    }

}

export class BacteriaStat {
    public id: string
    public genom: Array<number>
    public livelength: number
    public born: number
}

function GenerateFirstGenom(genom: Array<number>) {
    for (let i = 0; i < DNCLEN; i++) {
        genom[i] = Utils.getRandomInt(0, DNCLEN - 1)
    }
}