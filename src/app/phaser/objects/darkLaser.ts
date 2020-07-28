import { EnemyProjectile } from "./enemyProjectile";
import { MainScene } from "../scenes/mainScene";
import { Exhaust } from "./exhaust";
import { DarkExhaust } from "./DarkExhaust";
import { SCREEN_HEIGHT } from "../config";

export class DarkLaser extends EnemyProjectile {
    
    private static framePrefix = 'darkLaser';
    protected _explosionFrame: string = 'darkLaser';

    private static baseVelocity = 250;
    private static frameDelayFactor = 3;
    private _frameNum = 2;

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, `${DarkLaser.framePrefix}2`);
        
        const dx = (scene.player.x - scene.mothership.x);
        const dy = (scene.player.y - scene.mothership.y);
        const d = (dx * dx) + (dy * dy);
        const xdir = dx < 0 ? -1 : 1;
        const k = dy / dx;
        const ix = Math.sqrt(dx * dx / d) * xdir;
        const iy = Math.abs(k * ix);
 
        this.setVelocity(ix * DarkLaser.baseVelocity, iy * DarkLaser.baseVelocity);
    }

    move(scene: MainScene) {
        
        if (this._lifeTime % DarkLaser.frameDelayFactor === 0){
            this._frameNum = this._frameNum === 2 ? 3 : 2;
        }
        this.setFrame(`${DarkLaser.framePrefix}${this._frameNum}`);
        this._lifeTime++;
        if (this._lifeTime % Exhaust.exhaustRecoil === 0) {
            new DarkExhaust(scene, this.x, this.y - (this.height / 3), Exhaust.directionUp);
        }
        if (this.y > SCREEN_HEIGHT * 1.2) {
            this.destroy();
        }
    }
}
