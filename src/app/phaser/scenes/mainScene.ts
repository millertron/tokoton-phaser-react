import Phaser from 'phaser'
//@ts-ignore
import atlas from '../assets/sprites/atlas.png'
//@ts-ignore
import atlasJson from '../assets/sprites/atlas.json'
import { Player } from '../objects/player'
import { keyState } from '../types/keyState'
import { Mothership } from '../objects/mothership'

export class MainScene extends Phaser.Scene {

    private player?: Player
    private mothership?: Mothership
    private upKey?: Phaser.Input.Keyboard.Key
    private downKey?: Phaser.Input.Keyboard.Key
    private leftKey?: Phaser.Input.Keyboard.Key
    private rightKey?: Phaser.Input.Keyboard.Key
    private fireKey?: Phaser.Input.Keyboard.Key
    private bullets?: Phaser.Physics.Arcade.Group
    private enemyProjectiles?: Phaser.Physics.Arcade.Group

    public static atlasKey = 'atlas'

    public preload() {
        this.load.atlas(MainScene.atlasKey, atlas, atlasJson)
    }
    
    public create() {
        this.player = new Player(this, 200, 300).setInteractive()
        this.mothership = new Mothership(this, 200, 100)
        this.bullets = this.physics.add.group()
        this.enemyProjectiles = this.physics.add.group()

        this.upKey = this.input.keyboard.addKey('w')
        this.downKey = this.input.keyboard.addKey('s')
        this.leftKey = this.input.keyboard.addKey('a')
        this.rightKey = this.input.keyboard.addKey('d')
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    public update() {
        if (this.mothership) {
            this.mothership.move(this)
        }
        let player = this.player
        if (player) {
            const keyState: keyState = {
                up: this.upKey ? this.upKey.isDown : false,
                down: this.downKey ? this.downKey.isDown : false,
                left: this.leftKey ? this.leftKey.isDown : false,
                right: this.rightKey ? this.rightKey.isDown : false,
                fire: this.fireKey ? this.fireKey.isDown : false
            }
            player.move(this, keyState)
            
        }
        this.physics.overlap(this.bullets, this.enemyProjectiles, function(bullet: Phaser.GameObjects.GameObject, enemy: Phaser.GameObjects.GameObject) {
            bullet.destroy()
            enemy.destroy()
        })
        
    }

}
