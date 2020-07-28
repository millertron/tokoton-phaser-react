import { MainScene } from "./scenes/mainScene";

export const SCREEN_WIDTH = 600;
export const SCREEN_HEIGHT = 500;

export const Config: Phaser.Types.Core.GameConfig = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    parent: "phaserGameContainer",
    scene: MainScene,
    physics: { 
        default: 'arcade',
        //arcade: { debug: true } 
    }
};
