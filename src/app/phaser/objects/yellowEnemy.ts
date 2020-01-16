import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"

export class YellowEnemy extends EnemyProjectile {
    private static defaultFrame = 'yellowDefault'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, YellowEnemy.defaultFrame)
        this.setVelocityY(100)
        this._hitPoints = 15
    }
}
