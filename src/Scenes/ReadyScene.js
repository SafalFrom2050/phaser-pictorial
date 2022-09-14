import Scene from "../Base/Scene";

export class ReadyScene extends Scene{

    constructor() {
        super("scene_ready")
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg')
        this.load.image('btn_home', 'assets/icons/home.png')
    }

    create() {
        super.create()

        this.addBackground('background')

        this.showReady()
        this.btnHome = this.add.image(this.w * .75, this.h * .9, 'btn_home')

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
            this.cameras.main.zoomTo(3, 1000, Phaser.Math.Easing.Cubic.Out, false, (c, progress, z) => {
                if (progress === 1) {
                    this.scene.start('scene_game')
                }
            })
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
            text: 'READY?',
            style: {
                font: '150px'
            }
        }

        this.readyText = this.addText(titleTextObj, 5, 5)
    }

    showGo() {
        let titleTextObj = {
            text: 'GO!',
            style: {
                font: '150px'
            }
        }
        this.goText = this.addText(titleTextObj, 5, 5)
    }
}