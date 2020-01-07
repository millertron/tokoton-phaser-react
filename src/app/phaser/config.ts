import { MainScene } from "./scenes/mainScene";

export const Config: Phaser.Types.Core.GameConfig = {
    width: 600,
    height: 500,
    parent: "phaserGameContainer",
    scene: MainScene,
    physics: { default: 'arcade' }
}
