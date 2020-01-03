import Phaser from 'phaser'
//@ts-ignore
import atlas from '../assets/sprites/atlas.png'
//@ts-ignore
import atlasJson from '../assets/sprites/atlas.json'

export class MainScene extends Phaser.Scene {

    private player
    private upKey
    private downKey
    private leftKey
    private rightKey

    public preload() {
        this.load.atlas('atlas', atlas, atlasJson)
    }
    
    public create() {
        this.player = this.add.sprite(100, 100, 'atlas', 'playerDefault').setInteractive()
        this.upKey = this.input.keyboard.addKey('w')
        this.downKey = this.input.keyboard.addKey('s')
        this.leftKey = this.input.keyboard.addKey('a')
        this.rightKey = this.input.keyboard.addKey('d')
    }

    public update() {
        let player = this.player
        const playerVelocity = 2
        if (this.upKey.isDown){
            player.y-= playerVelocity
        }
        if (this.downKey.isDown){
            player.y+= playerVelocity
        }
        const leftKeyDown = this.leftKey.isDown
        const rightKeyDown = this.rightKey.isDown
        if (leftKeyDown) {
            player.x-= playerVelocity
            player.setFrame('playerLeft')
        }
        if (rightKeyDown) {
            player.x+= playerVelocity
            player.setFrame('playerRight')
        }
        if ((leftKeyDown && rightKeyDown) || (!leftKeyDown && !rightKeyDown)) {
            player.setFrame('playerDefault')
        }
    }
}
