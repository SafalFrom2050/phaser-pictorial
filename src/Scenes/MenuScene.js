import 'phaser'
import Scene from "../Base/Scene";

export default class MenuScene extends Scene {

    constructor() {
        super("scene_menu")
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg')
    }

    create() {
        super.create()

        this.addBackground('background')
        this.addTexts()
        this.setEvents()
    }

    addTexts() {

        let titleTextObj = {
            text: "Pictorial",
            style: {
                font: '100px "Press Start 2P"',
                align: 'center'
            }
        }

        let startTextObj = {
            text: "Start",
            style: {
                font: '80px "Press Start 2P"',
                color: "#FFFF00",
                align: 'center'
            }
        }

        this.title = this.addText(titleTextObj, 5, 4)
        this.startText = this.addText(startTextObj, 5, 6)
    }

    setEvents() {
        this.startText.setInteractive()

        this.startText.on('pointerover', function (pointer) {
            this.setAlpha(0.7)
        })
        this.startText.on('pointerout', function (pointer) {
            this.setAlpha(1)
        })

        this.startText.on('pointerdown', pointer => {
            this.scene.start("scene_ready")
        })
    }

}