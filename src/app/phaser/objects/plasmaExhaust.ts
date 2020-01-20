import { Explosion } from "./explosion";
import { MainScene } from "../scenes/mainScene";

export class PlasmaExhaust extends Explosion {

    public static directionUp = -1
    public static directionDown = 1
    public static exhaustRecoil = 5
    private static plasmaExhaustFramePrefix = 'plasmaExhaust'
    
    constructor(scene: MainScene, x: number, y: number, direction: number = PlasmaExhaust.directionUp) {
        super(scene, x, y, PlasmaExhaust.plasmaExhaustFramePrefix, { frameDelayFactor: 3, velocityY: 100 * direction, alpha: 0.6 })
    }
}
