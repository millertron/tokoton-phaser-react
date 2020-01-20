import { MainScene } from "../scenes/mainScene"
import { EnemyProjectile } from "./enemyProjectile"
import { Player } from "./player"

export class RedEnemy extends EnemyProjectile {

    private static defaultFrame = 'redDefault'
    private static phase1Timer = 50
    private _rootVelocityX: number = 70

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, RedEnemy.defaultFrame)
        this.setVelocityY(100)
        this._hitPoints = 10
        this._scoreValue = 10
    }

    move(scene: MainScene, player: Player) {
        switch(this._phase) {
            case 0:
                if (this._lifeTime >= RedEnemy.phase1Timer) {
                    this._phase = 1
                    if (this.x < player.x) {
                        this.setFrame('redRight')
                    }
                    if (this.x > player.x) {
                        this._rootVelocityX = -this._rootVelocityX
                        this.setFrame('redLeft')
                    }
                    this.setVelocityX(this._rootVelocityX)
                }
                break;
            case 1:
                const playerFactor = 20 * (this.x < player.x ? 1 : -1)
                const sineWaveFactor = 10 * Math.sin(this._lifeTime / 10)
                this.setVelocityX(this._rootVelocityX + sineWaveFactor + playerFactor)
                break;
            default:
                break;
        }
        super.move(scene, player)
    }

}
