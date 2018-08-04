import Animation from '../base/animation'
import Enemy from '../npc/enemy.js'

import DataBus from '../databus'
let databus = new DataBus()


const ENEMY_IMG_SRC = 'images/redvirus.png'
const ENEMY_WIDTH = 150
const ENEMY_HEIGHT = 150
const ENEMY_HEALTHPOINT = 150
const __ = {
  speed: Symbol('speed')
}

export default class redvirus extends Enemy {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
  }
  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"
   

    if (this.healthpoint < databus.growup) {
      this.img.src = "images/redvirus_color.png"
    }


    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    ctx.fillText(
      this.healthpoint,
      this.x + 55,
      this.y + 80
    )
  }
}
