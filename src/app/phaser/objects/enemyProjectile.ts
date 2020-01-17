import { MainScene } from "../scenes/mainScene"
import { Player } from "./player"
import { SCREEN_HEIGHT } from "../config"
import { Explosion } from "./explosion"

export class EnemyProjectile extends Phaser.Physics.Arcade.Sprite {

    protected _hitPoints: number = 0
    protected _scoreValue: number = 0
    protected _lifeTime: number = 0
    protected _explosionFrame: string = 'normalExplosion'

    constructor(scene: MainScene, x: number, y: number, defaultFrame: string) {
        super(scene, x, y, MainScene.atlasKey, defaultFrame)
        scene.add.existing(this)
        scene.enemyProjectiles.add(this)
    }

    takeHit(scene: MainScene, damage: number): number {
        this._hitPoints -= damage
        if (this._hitPoints < 0) {
            this.die(scene)
            return this._scoreValue
        }
        return 0
    }

    die(scene: MainScene) {
        new Explosion(scene, this.x, this.y, this._explosionFrame, 3)
        this.destroy()
    }

    move(player: Player) {
        if (this.y > SCREEN_HEIGHT * 1.2) {
            this.destroy()
        }
    }
}
