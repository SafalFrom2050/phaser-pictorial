import 'phaser'

export default class Scene extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName);
    }

    create() {
        this.gameHeight = this.sys.game.config.height
        this.gameWidth = this.sys.game.config.width
    }

    addBackground(imageName) {
        this.background = this.add.image(0, 0, imageName)

        this.background.displayHeight = this.gameHeight
        this.background.scaleX = this.background.scaleY

        this.background.x = this.gameWidth / 2
        this.background.y = this.gameHeight / 2
    }

    addText(textObj = {content: "", style: {}}, gridX, gridY) {

        let percentX = gridX * .1
        let percentY = gridY * .1

        let newText = this.add.text(this.gameWidth * percentX, this.gameHeight * percentY, textObj.content, textObj.style)

        newText.x -= newText.width / 2

        return newText
    }

}