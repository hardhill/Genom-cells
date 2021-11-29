
import { _decorator, Component, Prefab, instantiate, Vec3, Node, Label, log } from 'cc';
import { AtomControl } from './AtomControl';
import { BacteriaStat, Genom } from './Genom';
import Utils from './utils';
const { ccclass, property } = _decorator;



@ccclass('WorldControl')
export class WorldControl extends Component {

    @property({ type: Prefab })
    public Atom: Prefab
    @property({type:Label})
    public LabelPoints:Label
    private counter_id: number = 0
    private bacterias: Array<BacteriaStat>
    //private elita: Array<BacteriaStat>
    private livetime: number = 0
    private recombination_time: number = 0
    private genetic:Genom
    onLoad() {
        //this.elita = Genom.genofond
        
        
    }
    private FirstSeeding() {
        this.genetic = new Genom()
        this.bacterias = new Array<BacteriaStat>()
        let x = Utils.getRandomInt(-510, 510);
        let y = Utils.getRandomInt(-300, 300);
        this.Genesis(x, y);
    }

    Genesis(x: number, y: number) {
        if (this.Atom != null) {
            
            let node: Node = instantiate(this.Atom)
            
            this.counter_id++
            node.parent = this.node
            node.setPosition(new Vec3(x, y, 0))
            let script = node.getComponent(AtomControl)
            node.name = 'atom.' + this.counter_id.toString()
            let bac = new BacteriaStat()
            bac.genom = script.dnc
            bac.livelength = 0
            bac.id = node.name
            bac.born = this.livetime
            this.bacterias.push(bac)
        }
        //console.log('Bacs:',this.bacterias.length)
    }
    DestroyerBac(id: string) {
        let idx = this.bacterias.findIndex(bac => bac.id = id)
        //сколько прожил объект до смерти
        let lives = Math.abs(this.bacterias[idx].born - this.livetime)
        // занести данные в базу
        this.bacterias[idx].livelength = lives
        //сравнить с "элитой" - лучшей восмеркой долгожителей и попасть туда если достоин
        this.InElita(this.bacterias[idx])
        // исключить из списка живущих
        this.bacterias.splice(idx, 1)
    }
    start() {
        this.livetime = 0
        this.FirstSeeding();
    }
    update(dtime) {
        this.livetime += dtime
        this.recombination_time += dtime
        if (this.recombination_time > 30 || this.bacterias.length>30 ) {
            //TODO recombination
            
                this.genetic.Recombination()
            
            //log('Recombination')
            this.recombination_time = 0
        }
        if(this.bacterias.length==0){
            this.FirstSeeding()
        }
        this.LabelPoints.string = this.bacterias.length.toString()
    }
    InElita(bacteria:BacteriaStat) {
        Genom.genofond.push(bacteria)
        Genom.genofond.sort((a,b)=>(b.livelength-a.livelength))
        let arr:BacteriaStat[] = Genom.genofond.slice(0,8)
        Genom.genofond = arr.slice(0)
    }
    newGenom():number[]{
        let dnc = new Array<number>()
        dnc = this.genetic.newGenom()
        return dnc
    }
}





