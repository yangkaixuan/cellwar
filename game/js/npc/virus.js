import Animation from '../base/animation'
import Enemy from '../npc/enemy.js'
import DataBus from '../databus'
let databus = new DataBus()


const ENEMY_IMG_SRC = 'images/virus.png'
const ENEMY_WIDTH = 100
const ENEMY_HEIGHT = 100
const ENEMY_HEALTHPOINT = 50
const __ = {
  speed: Symbol('speed')
}




export default class virus extends Enemy {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
  }

  drawToCanvas(ctx) {
    if (!this.visible)
      return
    if (this.healthpoint < databus.growup) {
      this.img.src = "images/virus_color.png"
    }
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    ctx.fillText(
      this.healthpoint,
      this.x + 40,
      this.y + 60
    )


   
  }

}
