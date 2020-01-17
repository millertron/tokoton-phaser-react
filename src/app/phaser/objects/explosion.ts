import { Scene } from "phaser";
import { MainScene } from "../scenes/mainScene";

export class Explosion extends Phaser.GameObjects.Sprite {

    private _lifeTime = 0
    private _frameprefix: string
    private _maxFrames: number
    private _frameDelayFactor: number

    constructor(scene: MainScene, x: number, y: number, framePrefix:string, frameDelayFactor: number = 1, maxFrames: number = 4) {
        super(scene, x, y, MainScene.atlasKey, `${framePrefix}0`)
        this._frameprefix = framePrefix
        this._maxFrames = maxFrames
        this._frameDelayFactor = frameDelayFactor
        scene.add.existing(this)
        scene.explosions.add(this)
    }

    public disperse() {
        if (this._lifeTime >= this._maxFrames * this._frameDelayFactor) {
            this.destroy()
        } else {
            this.setFrame(`${this._frameprefix}${Math.floor(this._lifeTime / this._frameDelayFactor)}`)
            this._lifeTime++
        }
    }
}
