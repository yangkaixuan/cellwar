import Sprite from '../base/sprite'
import DataBus from '../databus'

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 30
const BULLET_HEIGHT = 30

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

export default class Bullet extends Sprite {
  enemy
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }

  init(x, y, speed, enemy) {
    this.enemy = enemy;
    this.x = x
    this.y = y
    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    if(this.enemy){
      if (!this.enemy.visible){
        databus.removeBullets(this)
      }
        
      var tem_x;
      var tem_y;
      if (this.enemy.getPositionX() - this.x > 0) {
        tem_x = -1;
      } else {
        tem_x = 1;
      }

      if (this.enemy.getPositionY() - this.y > 0) {
        tem_y = -1;
      } else {
        tem_y = 1;
      }
      //泡泡到敌方细胞的x距离
      var distanceX = this.enemy.getPositionX() - this.x
      //泡泡到敌方细胞的y距离
      var distanceY = this.enemy.getPositionY() - this.y
      if (distanceY > 0) {
        var y = this[__.speed] 
      } else {
        var y = -this[__.speed]
      }
      //console.log((this[__.speed] / Math.sqrt(Math.pow(distanceX, 2) + (Math.pow(distanceY, 2)))))

      var x = Math.abs(y) * (Math.abs(distanceX) / Math.abs(distanceY))
      if (distanceX < 0) {
        var x = -x
      }
      this.y += y
      this.x += x
    }else{
      this.y -= this[__.speed]
    }
    
    // 超出屏幕外回收自身
    if (this.y < -this.height)
      databus.removeBullets(this)
  }
}