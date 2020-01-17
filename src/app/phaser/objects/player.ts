import { keyState } from "../types/keyState";
import { MainScene } from "../scenes/mainScene";
import { LaserBullet } from "./laserBullet";
import { Missile } from "./missile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'playerDefault'
    private static leftFrame = 'playerLeft'
    private static rightFrame = 'playerRight'
    private static velocity = 150
    private static maxBulletRecoil = 5
    private static maxMissileRecoil = 60
    private static screenMargin = 5
    private _bulletRecoil: number = 0
    private _missileRecoil: number = 0

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, MainScene.atlasKey, Player.defaultFrame);
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    public move(scene: MainScene, {up, down, left, right, fire} : keyState) {
        this.setVelocity(0)
        if (up && (this.y - this.height) > Player.screenMargin) {
            this.setVelocityY(-(Player.velocity))
        }
        if (down && (this.y + this.height) < (SCREEN_HEIGHT - Player.screenMargin)) {
            this.setVelocityY(Player.velocity)
        }
        if (left && (this.x - this.width) > Player.screenMargin) {
            this.setVelocityX(-(Player.velocity))
            this.setFrame(Player.leftFrame)
        }
        if (right && (this.x + this.width) < (SCREEN_WIDTH - Player.screenMargin)) {
            this.setVelocityX(Player.velocity)
            this.setFrame(Player.rightFrame)
        }
        if ((left && right) || (!left && !right)) {
            this.setFrame(Player.defaultFrame)
        }
        if (fire) {
            if (this._bulletRecoil >= Player.maxBulletRecoil) {
                this._bulletRecoil = 0
            }
            if (this._bulletRecoil === 0) {
                this.fireBullet(scene);
            }
            if (this._missileRecoil >= Player.maxMissileRecoil) {
                this._missileRecoil = 0
            }
            if (this._missileRecoil === 0) {
                this.fireMissile(scene);
            }
        }
        this._bulletRecoil++
        this._missileRecoil++
    }

    
    private fireBullet(scene: MainScene) {
        new LaserBullet(scene, this.x, this.y - (this.height / 4))
    }

    private fireMissile(scene: MainScene) {
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration1)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration2)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration1 * -1)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration2 * -1)
    }
} 
