import { Explosion } from "./explosion";
import { MainScene } from "../scenes/mainScene";

export class Exhaust extends Explosion {

    public static directionUp = -1;
    public static directionDown = 1;
    public static exhaustRecoil = 5;
    
    constructor(scene: MainScene, x: number, y: number, framePrefix: string, direction: number = Exhaust.directionUp) {
        super(scene, x, y, framePrefix, { frameDelayFactor: 3, velocityY: 100 * direction, alpha: 0.6 });
    }
}
