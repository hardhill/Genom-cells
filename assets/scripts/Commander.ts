import { Command, CommandType } from "./ECommands"


const DNKLEN = 64

export class Commander {
    
    private genom:Array<number>
    private cursor:number
    constructor(genom:Array<number>){
        
        this.genom = genom
        this.cursor = 0
        
    }
    NextCommand():Command{
        let com = this.genom[this.cursor]
        let typeCom:CommandType
        let value:number
        let result:Command = {command:CommandType.None,value:63}
        if(com>=0&&com<8){
            typeCom = CommandType.Go
            value = (com+1)/8
            this.cursor = (this.cursor < DNKLEN-1)?this.cursor + 1 : 0
        }else if(com>=8&&com<16){
            typeCom = CommandType.Genesis
            value = (16-com)*Math.PI/4
            this.cursor = (this.cursor < DNKLEN-1)?this.cursor + 1 : 0
        }else if(com>=16&&com<24){
            typeCom = CommandType.Turn
            value = (24-com) * Math.PI/4
            this.cursor = (this.cursor < DNKLEN-1)?this.cursor + 1 : 0
        }else{
            typeCom = CommandType.None
            let cur = this.cursor + com
            if(cur>DNKLEN-1){
                this.cursor = cur - DNKLEN
            }else{
                this.cursor = cur
            }
            value = com
        }
        result = {command:typeCom,value:value}
        //console.log('Cursor',this.cursor,result)
        return result
    }
    
}

