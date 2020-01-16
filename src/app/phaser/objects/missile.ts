import { Bullet } from "./bullet";
import { MainScene } from "../scenes/mainScene";

export class Missile extends Bullet {

    private static defaultFrame = 'missile'

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, Missile.defaultFrame)
        this._damage = 10
    }
}
