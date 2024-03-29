import 'phaser'
import Scene from "../Base/Scene"
import {getRandomItem} from "../utils"

export default class GameScene extends Scene {
    constructor() {
        super("scene_game")

        this.score = 0
        this.interval = 1500
    }

    preload() {
        this.load.image('background', 'assets/bg.jpg')


        this.load.image('btn_home', 'assets/icons/home.png')
        this.load.image('btn_play', 'assets/icons/play.png')
        this.load.image('btn_pause', 'assets/icons/pause.png')
        this.load.image('btn_next', 'assets/icons/next.png')

        this.load.image('img_star', 'assets/star.png')

        this.load.image('dog', 'questions/pictures/dog.png')
        this.load.image('cat', 'questions/pictures/cat.png')
        this.load.image('car', 'questions/pictures/car.png')
        this.load.image('apple', 'questions/pictures/apple.png')
        this.load.image('ball', 'questions/pictures/ball.png')
        this.load.image('elephant', 'questions/pictures/elephant.png')
        this.load.image('frog', 'questions/pictures/frog.png')
        this.load.image('giraffe', 'questions/pictures/giraffe.png')
        this.load.image('hen', 'questions/pictures/hen.png')
        this.load.image('ice', 'questions/pictures/ice.png')
        this.load.image('jacket', 'questions/pictures/jacket.png')
        this.load.image('key', 'questions/pictures/key.png')
        this.load.image('tree', 'questions/pictures/tree.png')

        this.load.json('questions', '/questions/list.json')
    }

    create() {
        super.create()

        this.questions = this.cache.json.get('questions')

        this.background = this.addBackground('background')
        this.background.setScale(5)

        let scoreTextObj = {
            text: this.score,
            style: {
                font: '40px "Press Start 2P"'
            }
        }
        this.textScore = this.addText(scoreTextObj, 4.9, 1)

        this.imgStar = this.addImage('img_star', 5, 1)
        this.imgStar.displayHeight = 80
        this.imgStar.displayWidth = 80
        this.imgStar.setOrigin(0)

        // this.imgStar = this.add.image(this.w * .5, this.h * .4, 'img_star')

        this.btnPause = this.addImage('btn_pause', 9, 1)

        this.setGameUIEvents()
        this.startSequence()
    }


    updateScore(newScore) {
        if (newScore < 0) return

        if (this.score < newScore) {
            if (this.interval > 200) {
                this.interval = this.interval - (newScore * 10)
            }
        } else {
            if (this.interval < 1500) {
                this.interval = this.interval + (newScore * 10)
            }
        }

        console.log(this.interval)

        this.textScore.setText(newScore)
        this.score = newScore
    }

    startSequence() {
        let selectedQuestion = getRandomItem(this.questions)

        let picture = this.add.image(this.w * .5, this.h * .55, selectedQuestion.image)
        this.timerText.setText('Ready?')

        this.timerText.setOrigin(0.5)

        this.time.delayedCall(this.interval * .7, () => {
            this.timerText.text = 'GO!'
        })

        this.time.delayedCall(this.interval, () => {
            picture.setVisible(false)
            this.timerText.text = 'Do you remember?'
            this.showOptions(selectedQuestion)
        })
    }

    showOptions(selectedQuestion = {answerSet: []}) {

        this.optionsGroup = this.add.group()

        selectedQuestion.answerSet.map((option, i) => {
            let xPos = 5
            let yPos = 3 + (i * 2)

            let text = this.addText({
                text: option, style: {
                    fontSize: '90px',
                    fontStyle: "bold",
                    color: "#f6d200"
                }
            }, xPos, yPos)

            text.x = this.w / 2
            text.x -= (text.width / 2)

            text.setInteractive()
            text.on('pointerover', p => {
                text.setAlpha(0.5)
            })
            text.on('pointerout', p => {
                text.setAlpha(1)
            })
            text.on('pointerdown', p => {
                this.checkAnswer(text.text, selectedQuestion)
            })

            this.optionsGroup.add(text)
        })
    }

    checkAnswer(answer, selectedQuestion) {
        let result = answer.toLowerCase() === selectedQuestion.answer.toLowerCase()
        console.log("Correct Answer: ", selectedQuestion.answer)

        if (result) {
            this.updateScore(this.score + 1)
            this.timerText.setText("Yay!")
        } else {
            this.updateScore(this.score - 1)
            this.timerText.setText("Incorrect :(")
        }

        this.time.delayedCall(1000, () => {
            this.startSequence()
        })
        this.optionsGroup.destroy(true, true)
    }

    setGameUIEvents() {

        this.showReady()
        this.btnPause.setInteractive()

        this.btnPause.on('pointerover', p => {
            this.btnPause.setScale(1.1)
        })

        this.btnPause.on('pointerout', p => {
            this.btnPause.setScale(1)
        })

        this.btnPause.on('pointerup', p => {
            this.scene.start('scene_menu')
        })
    }


    showReady() {
        if (this.timerText !== undefined) this.timerText.destroy()
        this.timerText = this.addText({
            text: "Ready?", style: {
                font: '60px'
            }
        }, 5, 9)
        this.positionManager.centerX(this.timerText)

    }
}