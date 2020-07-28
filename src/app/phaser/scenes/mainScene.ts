import Phaser from 'phaser';
//@ts-ignore
import backgroundSky from '../assets/sprites/background_sky.png';
//@ts-ignore
import atlas from '../assets/sprites/atlas.png';
//@ts-ignore
import atlasJson from '../assets/sprites/atlas.json';
import { Player } from '../objects/player';
import { keyState } from '../types/keyState';
import { Mothership } from '../objects/mothership';
import { EnemyProjectile } from '../objects/enemyProjectile';
import { Bullet } from '../objects/bullet';
import { Explosion } from '../objects/explosion';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config';
import { SpaceTorpedo } from '../objects/spaceTorpedo';
import { DarkLaser } from '../objects/darkLaser';

export class MainScene extends Phaser.Scene {

    private _background?: Phaser.GameObjects.TileSprite;
    private _player?: Player;
    private _mothership?: Mothership;
    private _upKey?: Phaser.Input.Keyboard.Key;
    private _downKey?: Phaser.Input.Keyboard.Key;
    private _leftKey?: Phaser.Input.Keyboard.Key;
    private _rightKey?: Phaser.Input.Keyboard.Key;
    private _fireKey?: Phaser.Input.Keyboard.Key;
    private _bullets?: Phaser.Physics.Arcade.Group;
    private _enemyProjectiles?: Phaser.Physics.Arcade.Group;
    private _explosions?: Phaser.Physics.Arcade.Group;
    private _score: number = 0;
    private _scoreText?: Phaser.GameObjects.Text;

    public static backgroundKey = 'background';
    public static atlasKey = 'atlas';

    public preload() {
        this.load.image(MainScene.backgroundKey, backgroundSky);
        this.load.atlas(MainScene.atlasKey, atlas, atlasJson);
    }
    
    public create() {
        this._background = this.add.tileSprite(0 + SCREEN_WIDTH / 2, 0 + SCREEN_HEIGHT / 2, 800, 960, MainScene.backgroundKey);
        this._player = new Player(this, 200, 300).setInteractive();
        this._mothership = new Mothership(this, 200, 100);
        this._bullets = this.physics.add.group();
        this._enemyProjectiles = this.physics.add.group();
        this._explosions = this.physics.add.group();

        this._upKey = this.input.keyboard.addKey('w');
        this._downKey = this.input.keyboard.addKey('s');
        this._leftKey = this.input.keyboard.addKey('a');
        this._rightKey = this.input.keyboard.addKey('d');
        this._fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this._scoreText = this.add.text(15, 15, 'Score: 0', { fontSize: '20px', fill: '#fff'});
    }

    public update() {
        if (this._mothership && this._mothership.active) {
            this._mothership.move(this);
        }
        let player = <Player> this._player;
        if (player && player.active) {
            const keyState: keyState = {
                up: this._upKey ? this._upKey.isDown : false,
                down: this._downKey ? this._downKey.isDown : false,
                left: this._leftKey ? this._leftKey.isDown : false,
                right: this._rightKey ? this._rightKey.isDown : false,
                fire: this._fireKey ? this._fireKey.isDown : false
            };
            player.move(this, keyState);
        }
        this.bullets.getChildren().map(bullet => (<Bullet> bullet).move(this));
        this.enemyProjectiles.getChildren().map(enemyProjectile => (<EnemyProjectile> enemyProjectile).move(this));
        this.explosions.getChildren().map(explosion => {
            (<Explosion> explosion).disperse();
        })

        let score = this._score;
        let scene = this;
        const scoreText = <Phaser.GameObjects.Text> this._scoreText;
        this.physics.overlap(this.bullets, this._enemyProjectiles, function(bulletObject: Phaser.GameObjects.GameObject, enemyObject: Phaser.GameObjects.GameObject) {
            const enemy = <EnemyProjectile> enemyObject;
            const bullet = <Bullet> bulletObject;
            if (!(enemy instanceof DarkLaser)){
                score += enemy.takeHit(scene, bullet.damage);
                scoreText.setText(`Score: ${score}`);
                bullet.explode(scene);
            }
        })
        
        this.physics.overlap(this.bullets, this._mothership, function(mothershipObject: Phaser.GameObjects.GameObject, bulletObject: Phaser.GameObjects.GameObject) {
            const bullet = <Bullet> bulletObject;
            const mothership = <Mothership> mothershipObject;
            score += mothership.takeHit(scene, bullet.damage);
            bullet.explode(scene);
        })

        this._score = score;

        this.physics.overlap(player, this._enemyProjectiles, function(playerObject: Phaser.GameObjects.GameObject, enemyObject: Phaser.GameObjects.GameObject) {
            const enemyProjectile = <EnemyProjectile> enemyObject;
            if (enemyProjectile instanceof SpaceTorpedo || enemyProjectile instanceof DarkLaser) {
                enemyProjectile.die(scene);
            }
        })
    }

    get enemyProjectiles() {
        return <Phaser.Physics.Arcade.Group> this._enemyProjectiles;
    }

    get bullets(){
        return <Phaser.Physics.Arcade.Group> this._bullets;
    }

    get explosions() {
        return <Phaser.Physics.Arcade.Group> this._explosions;
    }

    get score() {
        return this._score;
    }

    get player() {
        return <Player> this._player;
    }

    get mothership() {
        return <Mothership> this._mothership;
    }

}
