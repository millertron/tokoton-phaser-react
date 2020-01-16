import { MainScene } from "../scenes/mainScene"

export class EnemyProjectile extends Phaser.Physics.Arcade.Sprite {

    protected _hitPoints = 0
    protected _scoreValue = 0

    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
    }

    public takeHit(damage: number): number {
        this._hitPoints -= damage
        if (this._hitPoints < 0) {
            this.die()
            return this._scoreValue
        }
        return 0
    }

    public die() {
        this.destroy()
    }
}
