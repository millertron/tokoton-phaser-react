import { Bullet } from "./bullet";
import { MainScene } from "../scenes/mainScene";

export class LaserBullet extends Bullet {

    private static frame0 = 'laserBullet0';
    private static frame1 = 'laserBullet1';
    private static frame2 = 'laserBullet2';
    
    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, LaserBullet.frame0);
        this.setVelocityY(-400);
        this._damage = 2;
        this._explosionFramePrefix = 'laserBulletExplosion';
    }

    move(scene: MainScene) {
        if (this.y < -10) {
            this.destroy();
        }
        if (this._lifeTime === 5) {
            this.setFrame(LaserBullet.frame1);
        } else if (this._lifeTime === 8) {
            this.setFrame(LaserBullet.frame2);
        }
        super.move(scene);
    }

}
