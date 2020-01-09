import { keyState } from "../types/keyState";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'playerDefault'
    private static leftFrame = 'playerLeft'
    private static rightFrame = 'playerRight'
    private static velocity = 150
    private bulletRecoil: number = 0

    constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string) {
        super(scene, x, y, textureKey, Player.defaultFrame);
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    public move(scene: Phaser.Scene, {up, down, left, right, fire} : keyState) {
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
        if (fire) {
            if (this.bulletRecoil >= 5) {
                this.bulletRecoil = 0
            }
            if (this.bulletRecoil === 0) {
                this.fireBullet(scene);
            }
        }
        this.bulletRecoil++
    }

    
    private fireBullet(scene: Phaser.Scene) {
        const bulletGroup = scene.bullets
        if (bulletGroup) {
            const bullet = bulletGroup.create(this.x, this.y - (this.height / 4), 'atlas', 'bullet0')
            bullet.setVelocityY(-400)
        }
    }
} 
