import { EnemyProjectile } from "./enemyProjectile";
import { MainScene } from "../scenes/mainScene";
import { Player } from "./player";
import { SCREEN_HEIGHT } from "../config";

export class SpaceTorpedo extends EnemyProjectile {
    private static framePrefix = 'spaceTorpedo'
    private static explosionFramePrefix = 'darkExplosion'
    private static exhaustFramePrefix = 'darkExhaust'
    private static frameDelayFactor = 3

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, `${SpaceTorpedo.framePrefix}0`)
        this.setVelocityY(75)
    }

    move(scene: MainScene, player: Player) {
        this.setFrame(`${SpaceTorpedo.framePrefix}${Math.floor(this._lifeTime / SpaceTorpedo.frameDelayFactor)}`)
        this._lifeTime++
        if (this._lifeTime > 2 * SpaceTorpedo.frameDelayFactor){
            this._lifeTime = 0
        }
        if (this.y > SCREEN_HEIGHT * 1.2) {
            this.destroy()
        }
    }

    takeHit(scene: MainScene, damage: number): number {
        return 0
    }
}
