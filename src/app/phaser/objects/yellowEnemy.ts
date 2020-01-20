import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"
import { Player } from "./player"

export class YellowEnemy extends EnemyProjectile {
    private static defaultFrame = 'yellowDefault'
    private static leftFrame = 'yellowLeft'
    private static rightFrame = 'yellowRight'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, YellowEnemy.defaultFrame)
        this.setVelocityY(100)
        this._hitPoints = 15
        this._scoreValue = 15
    }

    move(player: Player) {
        const amplitudeFactor = 300
        const frequencyFactor = 15
        const cosineWaveFactor = amplitudeFactor * Math.cos(this._lifeTime / frequencyFactor)
        const switchFrameFactor = 100
        const playerFactor = 50 * (this.x < player.x ? 1 : -1)

        this.setVelocityX(cosineWaveFactor + playerFactor)
        if (cosineWaveFactor > switchFrameFactor) {
            this.setFrame(YellowEnemy.rightFrame)
        } else if (cosineWaveFactor < -switchFrameFactor) {
            this.setFrame(YellowEnemy.leftFrame) 
        } else {
            this.setFrame(YellowEnemy.defaultFrame)
        }

        this._lifeTime++
        super.move(player)
    }
}
