import { keyState } from "../types/keyState";
import { MainScene } from "../scenes/mainScene";
import { LaserBullet } from "./laserBullet";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'playerDefault'
    private static leftFrame = 'playerLeft'
    private static rightFrame = 'playerRight'
    private static velocity = 150
    private bulletRecoil: number = 0

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, MainScene.atlasKey, Player.defaultFrame);
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    public move(scene: MainScene, {up, down, left, right, fire} : keyState) {
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

    
    private fireBullet(scene: MainScene) {
        new LaserBullet(scene, this.x, this.y)
    }
} 
