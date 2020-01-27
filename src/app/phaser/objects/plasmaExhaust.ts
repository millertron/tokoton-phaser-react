import { Explosion } from "./explosion";
import { MainScene } from "../scenes/mainScene";
import { Exhaust } from "./exhaust";

export class PlasmaExhaust extends Exhaust {

    private static plasmaExhaustFramePrefix = 'plasmaExhaust'
    
    constructor(scene: MainScene, x: number, y: number, direction: number = PlasmaExhaust.directionUp) {
        super(scene, x, y, PlasmaExhaust.plasmaExhaustFramePrefix, direction)
    }
}
