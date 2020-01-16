import { MainScene } from "../scenes/mainScene";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame);
        scene.add.existing(this)
        scene.bullets.add(this)
    }

    get damage(): number {
        return 0
    }
}
