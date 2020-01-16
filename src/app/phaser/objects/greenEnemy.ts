import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"

export class GreenEnemy extends EnemyProjectile {
    private static defaultFrame = 'greenDefault'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, GreenEnemy.defaultFrame)
        this.setVelocityY(100)
        this._hitPoints = 60
        this._scoreValue = 50
    }

}
