import { Exhaust } from "./exhaust";
import { MainScene } from "../scenes/mainScene";

export class DarkExhaust extends Exhaust {
    private static defaultFrame = 'darkExhaust'

    constructor(scene: MainScene, x: number, y: number, direction: number) {
        super(scene, x, y, DarkExhaust.defaultFrame, direction);
    }
}
