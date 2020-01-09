export class RedEnemy extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'redDefault'

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, RedEnemy.defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
        this.setVelocityY(100)
    }

}
