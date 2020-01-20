import { keyState } from "../types/keyState";
import { MainScene } from "../scenes/mainScene";
import { LaserBullet } from "./laserBullet";
import { Missile } from "./missile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config";
import { Explosion } from "./explosion";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private static defaultFrame = 'playerDefault'
    private static leftFrame = 'playerLeft'
    private static rightFrame = 'playerRight'
    private static velocity = 150
    private static laserRecoil = 5
    private static missileRecoil = 60
    private static screenMargin = 5
    private _lifeTime: number = 0

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
            this.recoiledTrigger(scene, Player.laserRecoil, this.fireLaser)
            this.recoiledTrigger(scene, Player.missileRecoil, this.fireMissile)
        }
        this.recoiledTrigger(scene, 5, this.exhaust)
        this._lifeTime++
    }

    
    private recoiledTrigger(scene: MainScene, recoil: number, callback: Function) {
        if (this._lifeTime % recoil === 0) {
            callback.call(this, scene)
        }
    }

    private fireLaser(scene: MainScene) {
        new LaserBullet(scene, this.x, this.y - (this.height / 4))
    }

    private fireMissile(scene: MainScene) {
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration1)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration2)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration1 * -1)
        new Missile(scene, this.x, this.y, Missile.horizontalAcceleration2 * -1)
    }

    private exhaust(scene: MainScene) {
        new Explosion(scene, this.x, this.y + (this.height / 4), Explosion.plasmaExhaustFramePrefix, { velocityY: 50, alpha: 0.8 })
    }
} 
