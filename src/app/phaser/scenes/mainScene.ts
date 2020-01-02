import Phaser from 'phaser'
//@ts-ignore
import atlas from '../assets/sprites/atlas.png'
//@ts-ignore
import atlasJson from '../assets/sprites/atlas.json'

export class MainScene extends Phaser.Scene {

    preload() {
        this.load.atlas('atlas', atlas, atlasJson)
    }
    
    create() {
        this.add.image(100, 100, 'atlas', 'playerDefault')
    }

    update() {

    }
}
