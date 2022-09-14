export class PositionManager {
    constructor(context) {
        this.gameHeight = context.sys.game.config.height
        this.gameWidth = context.sys.game.config.width
    }

    contain(image) {
        image.displayHeight = this.gameHeight
        image.scaleX = image.scaleY
    }

    center(image) {
        image.x = this.gameWidth / 2
        image.y = this.gameHeight / 2
    }

    centerX(obj) {
        obj.x = this.gameWidth / 2
    }
}