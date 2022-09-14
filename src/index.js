import 'phaser';
import MenuScene from "./Scenes/MenuScene";
import GameScene from "./Scenes/GameScene";
import {ReadyScene} from "./Scenes/ReadyScene";


let config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    scene: [MenuScene, ReadyScene, GameScene]
};

let game = new Phaser.Game(config);