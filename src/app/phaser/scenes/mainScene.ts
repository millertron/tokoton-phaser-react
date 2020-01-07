import Phaser from 'phaser'
//@ts-ignore
import atlas from '../assets/sprites/atlas.png'
//@ts-ignore
import atlasJson from '../assets/sprites/atlas.json'

export class MainScene extends Phaser.Scene {

    private player?: Phaser.Physics.Arcade.Sprite
    private motherBase?: Phaser.Physics.Arcade.Sprite
    private upKey?: Phaser.Input.Keyboard.Key
    private downKey?: Phaser.Input.Keyboard.Key
    private leftKey?: Phaser.Input.Keyboard.Key
    private rightKey?: Phaser.Input.Keyboard.Key
    private fireKey?: Phaser.Input.Keyboard.Key
    private bullets?: Phaser.Physics.Arcade.Group
    private bulletRecoil = 0

    public preload() {
        this.load.atlas('atlas', atlas, atlasJson)
    }
    
    public create() {
        this.player = this.physics.add.sprite(200, 300, 'atlas', 'playerDefault').setInteractive()
        this.motherBase = this.physics.add.sprite(200, 100, 'atlas', 'motherBaseDefault')
        this.bullets = this.physics.add.group()

        this.upKey = this.input.keyboard.addKey('w')
        this.downKey = this.input.keyboard.addKey('s')
        this.leftKey = this.input.keyboard.addKey('a')
        this.rightKey = this.input.keyboard.addKey('d')
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    public update() {
        let player = this.player
        const playerVelocity = 2
        if (player) {
            if (this.upKey && this.upKey.isDown){
                player.y-= playerVelocity
            }
            if (this.downKey && this.downKey.isDown){
                player.y+= playerVelocity
            }
            const leftKeyDown = this.leftKey ? this.leftKey.isDown : false
            const rightKeyDown = this.rightKey? this.rightKey.isDown : false
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
            if (this.fireKey && this.fireKey.isDown) {
                if (this.bulletRecoil >= 5) {
                    this.bulletRecoil = 0
                }
                if (this.bulletRecoil === 0) {
                    this.fireBullet();
                }
            }
        }
        this.bulletRecoil++
    }

    private fireBullet() {
        let player = this.player
        if (player && this.bullets) {
            const bullet = this.bullets.create(player.x, player.y - (player.height / 4), 'atlas', 'bullet0')
            bullet.setVelocityY(-400)
        }
    }
}
