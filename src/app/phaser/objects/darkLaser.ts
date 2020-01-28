import { EnemyProjectile } from "./enemyProjectile";
import { MainScene } from "../scenes/mainScene";
import { Exhaust } from "./exhaust";
import { DarkExhaust } from "./DarkExhaust";
import { SCREEN_HEIGHT } from "../config";
import { Player } from "./player";

export class DarkLaser extends EnemyProjectile {
    
    private static framePrefix = 'darkLaser'
    protected _explosionFrame: string = 'darkLaser'

    private static targetHitTime = 1.5
    private static frameDelayFactor = 3
    private _frameNum = 2

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, `${DarkLaser.framePrefix}`)
        const velocityX = (scene.player.x - scene.mothership.x) / DarkLaser.targetHitTime
        const velocityY = (scene.player.y - scene.mothership.y) / DarkLaser.targetHitTime
        this.setVelocity(velocityX, velocityY)
    }

    move(scene: MainScene, player: Player) {
        
        if (this._lifeTime % DarkLaser.frameDelayFactor === 0){
            this._frameNum = this._frameNum === 2 ? 3 : 2
        }
        this.setFrame(`${DarkLaser.framePrefix}${this._frameNum}`)
        this._lifeTime++
        if (this._lifeTime % Exhaust.exhaustRecoil === 0) {
            new DarkExhaust(scene, this.x, this.y - (this.height / 3), Exhaust.directionUp)
        }
        if (this.y > SCREEN_HEIGHT * 1.2) {
            this.destroy()
        }
    }
}
