
import { _decorator, Component,  Prefab, instantiate, Vec3, RigidBody2D, Vec2,Node } from 'cc';
import { AtomControl } from './AtomControl';
import Utils from './utils';
const { ccclass, property } = _decorator;


 
@ccclass('WorldControl')
export class WorldControl extends Component {

    @property({type:Prefab})
    public Atom:Prefab
    
    private bacterias:Array<Node>
    onLoad(){
        this.bacterias = new Array<Node>()
        let x = Utils.getRandomInt(-510,510)
        let y = Utils.getRandomInt(-300,300)
        this.Genesis(x,y)
        
    }
    Genesis(x:number,y:number){
        if(this.Atom!=null){
            let node:Node = instantiate(this.Atom)
            node.parent = this.node
            node.setPosition(new Vec3(x,y,0))
            let script = node.getComponent(AtomControl)
            
            this.bacterias.push(node)
         }
    }   
    start(){
                
    }
    update(dtime){

    }
}

