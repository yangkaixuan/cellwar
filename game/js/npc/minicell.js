import Animation from '../base/animation'
import Enemy from '../npc/enemy.js'
import DataBus from '../databus'



let databus = new DataBus()

const ENEMY_IMG_SRC = 'images/minicell.png'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60

const __ = {
  speed: Symbol('speed')
}




export default class minicell extends Enemy {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
  }



  drawToCanvas(ctx) {
    if (!this.visible)
      return
    ctx.fillStyle = "#ffffff"
    ctx.font = "18px Arial"
    if (this.healthpoint < databus.growup){
      this.img.src = "images/minicell_color.png"
    }

    

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
    if (this.healthpoint < 100){
      ctx.fillText(
        this.healthpoint,
        this.x + 20,
        this.y + 37
      )
    }else{
      ctx.fillText(
        this.healthpoint,
        this.x + 15,
        this.y + 37
      )
    }
    if (this.showharm) {
      ctx.fillStyle = "#fff"
      ctx.font = "bold 25px Arial"
      ctx.fillText(
        "-"+databus.firepower,
        this.x+15,
        this.y -10
      )
    }
  }

}
