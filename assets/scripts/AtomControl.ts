
import { _decorator, Component, RigidBody2D, Vec3, Vec2, CircleCollider2D, Contact2DType, Collider2D, IPhysics2DContact, log } from 'cc';
import { Commander } from './Commander';
import { CommandType } from './ECommands';
import Utils from './utils';
import { WorldControl } from './WorldControl';
const { ccclass, property } = _decorator;

/**

 *
 */
const MAX_Y = 360
const MAX_X = 512
const GO_W = 8
const ACCELERATE = 50
const HEALTH = 50
@ccclass('AtomControl')
export class AtomControl extends Component {
    private health: number = HEALTH
    private commands: Commander
    private summator: number = 0
    private direction: number = Utils.getRandomInt(0, 7)
    private script: WorldControl
    private contacted: number = 0

    public dnc: number[]
    onLoad() {
        let parent = this.node.parent
        this.script = parent.getComponent(WorldControl)
        this.dnc = this.script.newGenom()
        this.commands = new Commander(this.dnc)



    }
    start() {
        let collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }
    think() {
        if (this.health > 0) {
            // здоровье и цвет бактерии (не реализовано)

            let command = this.commands.NextCommand()
            // log('command:', command)
             //console.log('Health:', this.health)
            if (command.command == CommandType.Go) {
                let velocity = ACCELERATE * command.value
                let rb = this.node.getComponent(RigidBody2D)
                let vec = new Vec2(Math.cos(this.direction) * velocity, Math.sin(this.direction) * velocity)
                rb.applyForceToCenter(vec, true)
                this.health = this.health - GO_W * command.value
            }
            if (command.command == CommandType.Turn) {
                this.direction = command.value
                this.health = this.health - 1
            }
            if (command.command == CommandType.Genesis) {
                let vec3 = new Vec3(Math.cos(this.direction) * 15, Math.sin(this.direction) * 15, 0)
                vec3 = this.node.position.add(vec3)
                let x = vec3.x
                let y = vec3.y
                this.script.Genesis(x, y)
                this.health = this.health - 10
            }
            if (command.command == CommandType.View) {
                let rot = 0.005*command.value * (command.value%2)==0?-1:1
                let rb = this.node.getComponent(RigidBody2D)
                rb.applyAngularImpulse(rot,true)
                this.health -= 2
            }
            if (command.command == CommandType.None) {
                this.health -= 1
            }
        } else {
            try {
                this.script.DestroyerBac(this.node.name)
            } finally {
                this.node.destroy()
            }
        }

        // если контактеров больше 5 то минус здоровья
        if (this.contacted > 5) {
            this.health -= 40

        } else if (this.contacted == 2) {
            this.health -= 0
        }


        // контроль пределов экрана
        this.correcting_position()


    }
    update(dtime) {
        this.summator = this.summator + dtime
        if (this.summator > 0.2) {
            this.think()
            this.summator = 0
        }
    }

    private correcting_position() {
        if (this.node.position.x > MAX_X) {
            this.node.setPosition(-MAX_X + 1, this.node.position.y)
        }
        if (this.node.position.x < -MAX_X) {
            this.node.setPosition(MAX_X - 1, this.node.position.y)
        }
        if (this.node.position.y > MAX_Y) {
            this.node.setPosition(this.node.position.x, -MAX_Y + 1)
        }
        if (this.node.position.y < -MAX_Y) {
            this.node.setPosition(this.node.position.x, MAX_Y - 1)
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.node.name.includes('atom')) {
            this.contacted++
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when the contact between two colliders just about to end.
        if (otherCollider.node.name.includes('atom')) {
            this.contacted--
        }
    }
    onDestroy() {

    }
}

