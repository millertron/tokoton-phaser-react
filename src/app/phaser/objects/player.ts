import { keyState } from "../types/keyState";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'playerDefault'
    private static leftFrame = 'playerLeft'
    private static rightFrame = 'playerRight'
    private static velocity = 150

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, Player.defaultFrame);
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    public move({up, down, left, right} : keyState) {
        this.setVelocity(0)
        if (up) {
            this.setVelocityY(-(Player.velocity))
        }
        if (down) {
            this.setVelocityY(Player.velocity)
        }
        if (left) {
            this.setVelocityX(-(Player.velocity))
            this.setFrame(Player.leftFrame)
        }
        if (right) {
            this.setVelocityX(Player.velocity)
            this.setFrame(Player.rightFrame)
        }
        if ((left && right) || (!left && !right)) {
            this.setFrame(Player.defaultFrame)
        }
    }
} 
