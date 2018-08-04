import Pool from './base/pool'

let instance
let time
/**
 * 全局状态管理器
 */
export default class DataBus {
  page = "home"
  first = true;
  constructor() {
    if (instance)
      return instance

    instance = this
    this.pool = new Pool()
    this.reset()
  }
  bgsun(){
    this.juexing = true;
    this.gAlpha = 1
  }
  reset() {
    this.first = true;
    this.gAlpha = 0
    this.juexing = false
    this.getscore = 0
    this.frame = 0
    this.score = 0
    this.stuts = 1
    this.firepower = 1
    this.consume = 0.1
    this.growup = 10
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.continuous_number  = 1
    this.enemyscamp = "guidance"
    this.gameOver = false
    this.gameOvertip = ""
    this.startenemyscampswitch();

  }

  getscoreanimation(getscore) {
    this.fons = 80
    this.fonsw = 10
    setTimeout(() => {
      this.fonsw = 0
      this.fons = 60
    }, 100)


    if (this.getscore){      
      this.continuous_number++
      this.getscore  = getscore;     
      clearTimeout(time)
      time = setTimeout(() => {
        this.getscore = 0;
        this.continuous_number = 1
      }, 2000)
    }else{
      this.getscore = getscore
      time = setTimeout(() => {
        this.getscore = 0;
        this.continuous_number = 1
      }, 2000)
    } 
   
  }
  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
     let temp = this.enemys.shift()
     temp.visible = false 
    this.pool.recover('minicell', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }

  startenemyscampswitch() { 
    if (this.enemyscamp != "guidance"){
      //当完成新手引导的时候 
      this.enemyscamp = "start"
      setTimeout(() => {
        this.consume = 60
        this.enemyscamp = "monoplast_init";
        init();
      }, 10000);

      var init = () => {
        setTimeout(() => {
          this.consume = 60
          this.enemyscamp = "monoplast_intermediate";
          intermediate();
        }, 15000);
      }


      var intermediate = () => {
        setTimeout(() => {
          this.consume = 50
          this.enemyscamp = "monoplast_highgrade";
          highgrade();
        }, 20000);
      }

      var highgrade = () => {
        setTimeout(() => {
          this.consume = 50
          this.enemyscamp = "monoplast_chaohighgrade";
        }, 20000);
      }
    }
    
    }
    
  
}