import { RedEnemy } from "./redEnemy"
import { MainScene } from "../scenes/mainScene"
import { YellowEnemy } from "./yellowEnemy"
import { GreenEnemy } from "./greenEnemy"

export class Mothership extends Phaser.Physics.Arcade.Sprite {
    
    private charge: number = 0
    private static defaultFrame = 'mothershipDefault'
    private static level1Score = 100
    private static level2Score = 300

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, MainScene.atlasKey, Mothership.defaultFrame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    move(scene: MainScene) {
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
