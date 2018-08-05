import Animation from '../base/animation'
import DataBus   from '../databus'

// const ENEMY_IMG_SRC = 'images/enemy.png'
// const ENEMY_WIDTH   = 100
// const ENEMY_HEIGHT  = 100

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height)
    this.a = true
    this.b = false
    this.initExplosionAnimation()
  }


  getPositionX(){
    return this.x + this.width/2
      
  }
  getPositionY() {
    return this.y
  }



  init(speed, healthpoint) {
    this.x = rnd(0, window.innerWidth - this.width)
    this.y = -this.height
    this.healthpoint = healthpoint
    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []
    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 5

  
    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')     
    }
    this.initFrames(frames)
  }


  zhendong(){

    this.b = true
    setTimeout(()=>{
      this.b = false
    }, 100)


    this.showharm = true
    setTimeout(() => {
      this.showharm = false
    }, 1000)

  }


  // 每一帧更新当敌人的位置位置
  update(ctx) {
    

 

    this.y += this[__.speed]

   
    if (databus.frame % 2 === 0 && this.b) {
      if (this.a) {
        this.x = this.x + 3
        this.a = false
      } else {
        this.x = this.x -3
        this.a = true
      }
    }
   
    
    
    // 对象回收
    if ( this.y > window.innerHeight + this.height ){
      databus.removeEnemey(this)
      if (databus.enemyscamp == "guidance") {
        databus.first = true;
      }
    }
      
    
  }
}
