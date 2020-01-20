import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"
import { Player } from "./player"

export class GreenEnemy extends EnemyProjectile {
    private static defaultFrame = 'greenDefault'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, GreenEnemy.defaultFrame)
        this.setVelocityY(80)
        this._hitPoints = 60
        this._scoreValue = 50
    }

    move(scene: MainScene, player: Player) {
        const proximityThreshold = 100
        if (player.y - this.y > proximityThreshold) {
            const playerFactor = player.x - this.x
            const amplitudeFactor = 2
            this.setVelocityX(amplitudeFactor * playerFactor)
        } else {
            this.setVelocityX(0)
            this.setAccelerationY(200)
        }
        super.move(scene, player)
    }

}
