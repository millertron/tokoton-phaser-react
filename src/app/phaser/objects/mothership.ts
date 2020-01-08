export class Mothership extends Phaser.Physics.Arcade.Sprite {
    
    private charge: number = 0
    private static defaultFrame = 'mothershipDefault'

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, Mothership.defaultFrame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    move() {
        if (this.charge > 30) {
            if (Math.floor(Math.random() * 100) < 50) {
                console.log("Red!")
                this.charge = 0
            }
            if (Math.floor(Math.random() * 100) < 30) {
                console.log("Yellow!")
                this.charge = 0
            }
            if (Math.floor(Math.random() * 100) < 15) {
                console.log("Green!")
                this.charge = 0
            }
        } else {
            this.charge++
        }
    }
    
}
