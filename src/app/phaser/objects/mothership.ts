import { RedEnemy } from "./redEnemy"
import { MainScene } from "../scenes/mainScene"
import { YellowEnemy } from "./yellowEnemy"
import { GreenEnemy } from "./greenEnemy"
import { SCREEN_WIDTH } from "../config"
import { SpaceTorpedo } from "./spaceTorpedo"
import { DarkLaser } from "./darkLaser"

export class Mothership extends Phaser.Physics.Arcade.Sprite {
    
    private static framePrefix = 'mothership'    
    private static level1Score = 100
    private static level2Score = 300
    private static level3Score = 1000
    private static level4Score = 0
    private static speedX = 80
    private static speedY = 50
    private static screenMargin = 0
    private static amplitudeY = 180
    private _lifeTime: number = 0
    private _hitPoints: number = 1000
    private _value: number = 2000
    private _hurt: boolean = false
    private _xDirection: number = 0
    private _yDirection: number = 0

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, MainScene.atlasKey, `${Mothership.framePrefix}0`)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this._xDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1
        this._yDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1
        this.setVelocity(this._xDirection * Mothership.speedX, this._yDirection * Mothership.speedY)
    }

    move(scene: MainScene) {
        if (this.x - this.width < Mothership.screenMargin) {
            this._xDirection = 1
            this.setVelocityX(Mothership.speedX)
        } else if (this.x + this.width > SCREEN_WIDTH - Mothership.screenMargin) {
            this._xDirection = -1
            this.setVelocityX(-Mothership.speedX)
        }
        if (this.y - this.height < Mothership.screenMargin) {
            this._yDirection = 1
            this.setVelocityY(Mothership.speedY)
        } else if (this.y + this.height > Mothership.screenMargin + Mothership.amplitudeY){
            this._yDirection = -1
            this.setVelocityY(-Mothership.speedY)
        }
        if (this._hurt) {
            this.setFrame(`${Mothership.framePrefix}0`)
            this.setVelocity(this._xDirection * Mothership.speedX, this._yDirection * Mothership.speedY)
            this._hurt = false
        }

        const y = this.y + (this.y / 4)
        if (this._lifeTime % 2 === 0) {
            if (Math.floor(Math.random() * 1000) < 50) {
                new RedEnemy(scene, this.x, y)
            }
            if (scene.score > Mothership.level1Score && Math.floor(Math.random() * 1000) < 30) {
                new YellowEnemy(scene, this.x, y)
            }
            if (scene.score > Mothership.level2Score && Math.floor(Math.random() * 1000) < 15) {
                new GreenEnemy(scene, this.x, y)
            }
        }
        if (scene.score > Mothership.level3Score && this._lifeTime % 100 === 0) {
            new SpaceTorpedo(scene, this.x, y)
        }
        if (scene.score > Mothership.level4Score && this._lifeTime % 100 === 0) {
            new DarkLaser(scene, this.x, y)
        }

        if (this._lifeTime > 8000) {
            this._lifeTime = 1
        } else {
            this._lifeTime++
        }
    }

    private _die(){
        this.destroy
    }

    takeHit(scene: MainScene, damage: number): number {
        if (scene.score > Mothership.level4Score) {
            this._hitPoints -= damage
            this.setVelocity(0, 0)
            this.setFrame(`${Mothership.framePrefix}1`)
            this._hurt = true
        }
        if (this._hitPoints <= 0) {
            this._die()
        }
        return this._value
    }
    
}
