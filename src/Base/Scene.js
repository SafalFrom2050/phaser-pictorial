import 'phaser'
import {PositionManager} from "./PositionManager";

export default class Scene extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName)
    }

    create() {
        this.h = this.sys.game.config.height
        this.w = this.sys.game.config.width

        this.positionManager = new PositionManager(this)
    }

    addBackground(imageName) {
        this.background = this.add.image(0, 0, imageName)

        this.positionManager.contain(this.background)
        this.positionManager.center(this.background)

        return this.background
    }

    addText(textObj = {text: "", style: {}}, gridX, gridY) {

        let percentX = gridX * .1
        let percentY = gridY * .1

        let newText = this.add.text(this.w * percentX, this.h * percentY, textObj.text, textObj.style)

        newText.x -= newText.width / 2
        newText.y += newText.height / 2

        return newText
    }

    addImage(texture, gridX, gridY) {
        let percentX = gridX * .1
        let percentY = gridY * .1

        let image = this.add.image(this.w * percentX, this.h * percentY, texture)

        return image
    }
}