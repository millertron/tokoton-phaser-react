import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"

export class RedEnemy extends EnemyProjectile {

    private static defaultFrame = 'redDefault'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, RedEnemy.defaultFrame)
        this.setVelocityY(100)
        this._hitPoints = 10
    }

}
