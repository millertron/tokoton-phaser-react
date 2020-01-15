export class YellowEnemy extends Phaser.Physics.Arcade.Sprite {
    private static defaultFrame = 'yellowDefault'

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, YellowEnemy.defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
        this.setVelocityY(100)
    }
}