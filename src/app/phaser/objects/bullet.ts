import { MainScene } from "../scenes/mainScene";

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    protected _damage: number = 0

    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame);
        scene.add.existing(this)
        scene.bullets.add(this)
    }

    get damage(): number {
        console.log(this._damage)
        return this._damage
    }

    public move() {
        
    }
}
