import { Bullet } from "./bullet";
import { MainScene } from "../scenes/mainScene";

export class Missile extends Bullet {

    private static defaultFrame = 'missile'
    static horizontalAcceleration1 = 20
    static horizontalAcceleration2 = 80
    private static verticalAcceleration = -300
    private _horizontalAcceleration: number

    constructor(scene: MainScene, x: number, y: number, horizontalAcceleration: number) {
        super(scene, x, y, Missile.defaultFrame)
        this._damage = 10
        this._horizontalAcceleration = horizontalAcceleration
        this._explosionFramePrefix = 'missileExplosion'
        this._explosionFrameDelayFactor = 3
        this.setVelocityY(-120)
        this.setAcceleration(this._horizontalAcceleration, Missile.verticalAcceleration)
    }
}
