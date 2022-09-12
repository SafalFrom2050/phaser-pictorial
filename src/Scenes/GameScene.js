import 'phaser'
import Scene from "../Base/Scene";
import {getRandomItem} from "../utils";

export default class GameScene extends Scene {
    constructor() {
        super("scene_game")

        this.pictures = [
            {image: 'actor_dog', answer: 'dog'},
            {image: 'actor_cat', answer: 'cat'}
        ]
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg')


        this.load.image('btn_home', 'assets/icons/home.png')
        this.load.image('btn_play', 'assets/icons/play.png')
        this.load.image('btn_pause', 'assets/icons/pause.png')
        this.load.image('btn_next', 'assets/icons/next.png')

        this.load.image('img_star', 'assets/star.png')

        this.load.image('actor_dog', 'assets/dog.png')
        this.load.image('actor_cat', 'assets/cat.png')

    }

    create() {
        super.create()

        this.addBackground('background')

        this.showReady()
        this.btnHome = this.add.image(this.gameWidth * .75, this.gameHeight * .9, 'btn_home')

        this.setEvents()

        this.setTimer()
    }

    setTimer() {
        this.time.delayedCall(1000, () => {
            this.readyText.setVisible(false)
            this.showGo()
        })

        this.time.delayedCall(2000, () => {
            this.goText.setVisible(false)
            // this.cameras.main.flash()
            this.cameras.main.zoomTo(3, 1000, Phaser.Math.Easing.Cubic.Out)

            this.onGameStart()
        })
    }

    setEvents() {
        this.btnHome.setInteractive()

        this.btnHome.on('pointerover', p => {
            this.btnHome.scale = 1.1
        })

        this.btnHome.on('pointerout', p => {
            this.btnHome.scale = 1
        })

        this.btnHome.on('pointerup', p => {
            this.scene.start('scene_menu')
        })
    }

    showReady() {
        let titleTextObj = {
            content: 'READY?',
            style: {
                font: '150px "Press Start 2P"'
            }
        }
        this.readyText = this.addText(titleTextObj, 5, 5)
    }

    showGo() {
        let titleTextObj = {
            content: 'GO!',
            style: {
                font: '150px "Press Start 2P"'
            }
        }
        this.goText = this.addText(titleTextObj, 5, 5)
    }

    onGameStart() {
        let scoreTextObj = {
            content: '0',
            style: {
                font: '40px "Press Start 2P"'
            }
        }
        this.textScore = this.addText(scoreTextObj, 4.7, 3.9)

        this.imgStar = this.add.image(this.gameWidth * .5, this.gameHeight * .4, 'img_star')

        this.btnPause = this.add.image(this.gameWidth * .64, this.gameHeight * .4, 'btn_pause')

        // this.btnPause.setSize(30, 30)

        this.setGameUIEvents()
        this.startSequence()
    }

    startSequence() {
        let selectedPicture = getRandomItem(this.pictures)

        let picture = this.add.image(this.gameWidth * .5, this.gameHeight * .55, selectedPicture.image).setScale(0.5, 0.5)
        let timerText = this.add.text(this.gameWidth * .5, this.gameHeight * .64, 'Ready?')

        timerText.setOrigin(0.5)

        this.time.delayedCall(1000, () => {
            timerText.text = 'GO!'
        })

        this.time.delayedCall(1500, () => {
            picture.setVisible(false)
            timerText.text = 'Do you remember?'
            this.showOptions()
        })
    }

    showOptions() {
        let option1 = this.add.text(this.gameWidth/2 - 25, this.gameHeight/2, 'CAT', {fontSize: '45px', fontStyle: "bold", color: "#f6d200"})
            .setOrigin(1, 0)

        let option2 = this.add.text(this.gameWidth/2 + 25, this.gameHeight/2, 'DOG', {fontSize: '45px', fontStyle: "bold", color: "#f6d200"})


        option1.setInteractive()
        option1.on('pointerover', p => {
            option1.setAlpha(0.5)
        })
        option1.on('pointerout', p => {
            option1.setAlpha(1)
        })

        option2.setInteractive()
        option2.on('pointerover', p => {
            option2.setAlpha(0.5)
        })
        option2.on('pointerout', p => {
            option2.setAlpha(1)
        })
    }

    setGameUIEvents() {
        this.btnPause.setInteractive()

        this.btnPause.on('pointerover', p => {
            this.btnPause.setScale(1.1)
        })

        this.btnPause.on('pointerout', p => {
            this.btnPause.setScale(1)
        })

        this.btnPause.on('pointerup', p => {
            // this.scene.start('scene_menu')
        })
    }
}