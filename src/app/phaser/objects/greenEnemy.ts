import { MainScene } from "../scenes/mainScene"

export class GreenEnemy extends Phaser.Physics.Arcade.Sprite {
    private static defaultFrame = 'greenDefault'

    constructor(scene: MainScene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, GreenEnemy.defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
        this.setVelocityY(100)
    }
}
