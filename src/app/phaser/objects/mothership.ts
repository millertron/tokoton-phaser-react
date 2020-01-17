import { RedEnemy } from "./redEnemy"
import { MainScene } from "../scenes/mainScene"
import { YellowEnemy } from "./yellowEnemy"
import { GreenEnemy } from "./greenEnemy"
import { SCREEN_WIDTH } from "../config"

export class Mothership extends Phaser.Physics.Arcade.Sprite {
    
    private charge: number = 0
    private static defaultFrame = 'mothershipDefault'
    private static level1Score = 100
    private static level2Score = 300
    private static speedX = 80
    private static speedY = 50
    private static screenMargin = 0
    private static amplitudeY = 180

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, MainScene.atlasKey, Mothership.defaultFrame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        const directionX = Math.floor(Math.random() * 2) === 0 ? -1 : 1
        const directionY = Math.floor(Math.random() * 2) === 0 ? -1 : 1
        this.setVelocity(directionX * Mothership.speedX, directionY * Mothership.speedY)
    }

    move(scene: MainScene) {

        if (this.x - this.width < Mothership.screenMargin) {
            this.setVelocityX(Mothership.speedX)
        } else if (this.x + this.width > SCREEN_WIDTH - Mothership.screenMargin) {
            this.setVelocityX(-Mothership.speedX)
        }
        if (this.y - this.height < Mothership.screenMargin) {
            this.setVelocityY(Mothership.speedY)
        } else if (this.y + this.height > Mothership.screenMargin + Mothership.amplitudeY){
            this.setVelocityY(-Mothership.speedY)
        }

        if (this.charge > 15) {
            const y = this.y + (this.y / 4)
            if (Math.floor(Math.random() * 1000) < 50) {
                new RedEnemy(scene, this.x, y)
                this.charge = 0
            }
            if (scene.score > Mothership.level1Score && Math.floor(Math.random() * 1000) < 30) {
                new YellowEnemy(scene, this.x, y)
                this.charge = 0
            }
            if (scene.score > Mothership.level2Score && Math.floor(Math.random() * 1000) < 15) {
                new GreenEnemy(scene, this.x, y)
                this.charge = 0
            }
        } else {
            this.charge++
        }
    }
    
}
