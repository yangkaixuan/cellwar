import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'
import Music from '../runtime/music'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let bgsun = new Image()
bgsun.src = 'images/bgsun.png'
let EnergyRing = new Image()

EnergyRing.src = 'images/energy.png';


// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
let PLAYER_WIDTH = 60
let PLAYER_HEIGHT = 60

let databus = new DataBus()

export default class Player extends Sprite {
  h = 0
  a = 10
  constructor() {

    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
    this.music = new Music()
    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = window.innerHeight - 250
    this.tem_ = 0
    var self = this;
  }



  zhendong() {
    this.a = 10
    setTimeout(() => {
      this.a = 0
    }, 100);
  }

  drawToCanvas(ctx) {
    databus.firepower = 1+ parseInt(databus.growup/50);
    if (this.h < databus.growup) {
      this.h += 2;
    }

    var q = parseInt(databus.growup / 50)
    if (q < 20) {
      this.width = PLAYER_WIDTH + q + this.a;
      this.height = PLAYER_HEIGHT + q + this.a
    }


    if (!this.visible)
      return



    ctx.drawImage(
      this.img,
      this.x - this.a / 3,
      this.y - this.a / 3,
      this.width,
      this.height
    )



    if (databus.gAlpha > 0.05) {
      databus.gAlpha -= 0.05
    }
    ctx.save();

    ctx.globalAlpha = databus.gAlpha
    ctx.drawImage(
      bgsun,
      0,
      0,
      this.width,
      this.height,
      0, 0,
      screenWidth,
      screenHeight
    )

    ctx.restore();
    ctx.beginPath();

    ctx.fillStyle = "#ffffff"

    ctx.font = "bold " + ((this.width / 5) + 4) + "px Arial"
    var x
    if (this.h < 100) {
      x = this.x + (this.width / 2) - (this.width / 6) - this.a / 3
    } else if (this.h >= 100 && this.h <= 1000) {
      x = this.x + (this.width / 2) - (this.width / 4.5) - this.a / 3
    } else {
      x = this.x + (this.width / 2) - (this.width / 3.5) - this.a / 3
    }

    ctx.fillText(
      this.h,
      x,
      this.y + (this.height / 2) + 6 - this.a / 3
    )

    

  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y

    if (disX < 0)
      disX = 0

    else if (disX > screenWidth - this.width)
      disX = screenWidth - this.width

    if (disY <= 0)
      disY = 0

    else if (disY > screenHeight - this.height)
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }



  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    let bullet = databus.pool.getItemByClass('bullet', Bullet)
    var nearest = 0
    var nearestEnemy
    for (var i = 0; i < databus.enemys.length; i++) {
      if (databus.enemys[i].visible) {
        var distance = Math.pow((databus.enemys[i].getPositionX() - this.x), 2) + Math.pow((databus.enemys[i].getPositionY() - this.y), 2)
        if (nearest > distance || nearest == 0) {
          nearestEnemy = databus.enemys[i];
          nearest = distance;
        }
      }
    }
    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y + 20,
      5,
      nearestEnemy
    )

    databus.bullets.push(bullet)
  }
}