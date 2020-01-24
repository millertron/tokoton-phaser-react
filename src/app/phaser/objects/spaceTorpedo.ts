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
        super(scene, x, y, SpaceTorpedo.framePrefix)
        this.setVelocityY(75)
    }

    move(scene: MainScene, player: Player) {
        let frame: number = 0
        for (let i = 1; i <= 3; i++) {
            if (Math.floor(this._lifeTime / SpaceTorpedo.frameDelayFactor) % i === 0) {
                frame = i - 1
            }
        }
        console.log(frame)
        this.setFrame(`${SpaceTorpedo.framePrefix}${frame}`)
        this._lifeTime++
        if (this.y > SCREEN_HEIGHT * 1.2) {
            this.destroy()
        }
    }

    takeHit(scene: MainScene, damage: number): number {
        return 0
    }
}
