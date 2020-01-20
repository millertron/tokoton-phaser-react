import { Scene } from "phaser";
import { MainScene } from "../scenes/mainScene";

export type options = {
    maxFrames?: number,
    frameDelayFactor?: number,
    velocityX?: number,
    velocityY?: number,
    alpha?: number
}

export class Explosion extends Phaser.Physics.Arcade.Sprite {

    public static plasmaExhaustFramePrefix = 'plasmaExhaust'
    private _lifeTime = 0
    private _frameprefix: string
    private _maxFrames: number
    private _frameDelayFactor: number

    constructor(scene: MainScene, x: number, y: number, framePrefix:string, options: options = {}) {
        super(scene, x, y, MainScene.atlasKey, `${framePrefix}0`)
        this._frameprefix = framePrefix
        this._maxFrames = options.maxFrames || 4
        this._frameDelayFactor = options.frameDelayFactor || 1

        console.log(options.velocityY || 0)
        scene.add.existing(this)
        scene.explosions.add(this)
        this.setVelocityX(options.velocityX || 0)
        this.setVelocityY(options.velocityY || 0)
        this.setAlpha(options.alpha || 1)
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
