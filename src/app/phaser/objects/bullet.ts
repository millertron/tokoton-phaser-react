import { MainScene } from "../scenes/mainScene";
import { Explosion } from "./explosion";

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    protected _damage: number = 0
    protected _explosionFramePrefix: string = ''
    protected _explosionFrameDelayFactor = 1

    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame);
        scene.add.existing(this)
        scene.bullets.add(this)
    }

    get damage(): number {
        return this._damage
    }

    public move() {

    }

    public explode(scene: MainScene) {
        new Explosion(scene, this.x, this.y, this._explosionFramePrefix, this._explosionFrameDelayFactor)
        this.destroy()
    }
}
