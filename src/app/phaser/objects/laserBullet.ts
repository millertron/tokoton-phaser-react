import { Bullet } from "./bullet";
import { MainScene } from "../scenes/mainScene";

export class LaserBullet extends Bullet {

    private static defaultFrame = 'laserBullet0'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, LaserBullet.defaultFrame)
        this.setVelocityY(-400)
        this._damage = 2
    }

}
