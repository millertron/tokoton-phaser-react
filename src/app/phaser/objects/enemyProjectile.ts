import { MainScene } from "../scenes/mainScene"

export class EnemyProjectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
    }
}
