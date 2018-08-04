import Player from './player/index'

import bule_di from './award/blue_diamond'

import minicell from './npc/minicell'
import virus from './npc/virus.js'
import redvirus from './npc/redvirus.js'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import HomePage from './runtime/homepage'







let hero = new Image()
hero.src = 'images/hero.png'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let ctx = canvas.getContext('2d')


let databus = new DataBus()

/**
 * 游戏主函数
 * author:yangkaixuan
 * date:2018-08-04
 */


export default class Main {
  constructor() {

    //实例化分数系统对象
    this.gameinfo = new GameInfo()
    //实例化分数音效对象
    this.music = new Music()
    //实例化home页面对象
    this.home = new HomePage()


    //解决在真机上画图渲染的锯齿问题 具体逻辑查看微信
    if(window.devicePixelRatio){      
      var width = canvas.width;
      var height = canvas.height;
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      canvas.height = height * window.devicePixelRatio
      canvas.width = width * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }


    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()
      if (databus.page == "home"){
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        screenWidth / 2 - 65, screenHeight - 280, 130, 50
        if (x >= screenWidth / 2 - 65 &&
          x <= screenWidth / 2 + 65 &&
          y >= screenHeight - 280 &&
          y <= screenHeight - 230){
          databus.page = "game"
          this.restart()
          }
          
      }
     


      this.player.tem_ = e.touches[0].clientX - this.player.x - 40;
      this.player.tem_y = e.touches[0].clientY - this.player.y;
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      let x = e.touches[0].clientX - this.player.tem_
      let y = e.touches[0].clientY - this.player.tem_y
      this.player.ismove = true
      this.player.setAirPosAcrossFingerPosZ(x, y)

    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      if (!this.player.ismove) {
        this.player.shoot()
        this.player.music.playShoot()
        
      }
      this.player.ismove = false
    }).bind(this))
   
  }

  restart() {
    databus.reset();
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.player = new Player(ctx)


    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    this.bg = new BackGround(ctx)
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )

  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    switch (databus.enemyscamp) {
      case 'guidance':
        if (databus.first){
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(1, Math.floor(Math.random() * 5 + 10))
          databus.enemys.push(enemy)
          databus.first = false
        }       
        break;
      case 'start':
        //单细胞初级阵营
        if (databus.frame %80 === 0) {
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(1, Math.floor(Math.random() * 10 + 20))
          databus.enemys.push(enemy)
        }
        if (databus.frame % 80 === 1) {
          let enemyvirus = databus.pool.getItemByClass('virus', virus)
          enemyvirus.init(1, Math.floor(Math.random() * 100 + 100))
          databus.enemys.push(enemyvirus)
        }
        

        // if (databus.frame % 150 === 1) {
        //   let enemy = databus.pool.getItemByClass('bule_di', bule_di)
        //   enemy.init(2, Math.floor(Math.random() * 100 + 500))
        //   databus.enemys.push(enemy)
        // }        
        break;
      case 'monoplast_init':
        //单细胞初级阵营
        if (databus.frame % 40 === 0) {
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(2, Math.floor(Math.random() * 50 + 100))
          databus.enemys.push(enemy)
        }
        // if (databus.frame % 50 === 1) {
        //   let enemy = databus.pool.getItemByClass('bule_di', bule_di)
        //   enemy.init(2, Math.floor(Math.random() * 100 + 100))
        //   databus.enemys.push(enemy)
        // }        
        break;
      case 'monoplast_primary':
        //单细胞初级阵营
        if (databus.frame % 40 === 0) {
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(2, Math.floor(Math.random() * 500 + 50))
          databus.enemys.push(enemy)
        }
        // if (databus.frame % 50 === 1) {
        //   let enemy = databus.pool.getItemByClass('bule_di', bule_di)
        //   enemy.init(2, Math.floor(Math.random() * 100 + 100))
        //   databus.enemys.push(enemy)
        // }        
        break;
      case 'monoplast_intermediate':
        //单细胞中级阵营
        if (databus.frame % 50 === 0) {
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(1.5, Math.floor(Math.random() * 300 + 200))
          databus.enemys.push(enemy)
        }
        if (databus.frame % 80 === 1) {
          let enemyvirus = databus.pool.getItemByClass('virus', virus)
          enemyvirus.init(1, Math.floor(Math.random() * 5000 + 1000))
          databus.enemys.push(enemyvirus)
        }
        break;
      case 'monoplast_highgrade':
        //单细胞高级阵营

        if (databus.frame % 50 === 0) {
          let enemyenemy = databus.pool.getItemByClass('enemy', minicell)
          enemyenemy.init(1.5, Math.floor(Math.random() * 100 + 800))
          databus.enemys.push(enemyenemy)
        } else if (databus.frame % 150 === 2) {
          let enemyvirus = databus.pool.getItemByClass('virus', virus)
          enemyvirus.init(1, Math.floor(Math.random() * 8000 + 2000))
          databus.enemys.push(enemyvirus)
        } else if (databus.frame % 200 === 3) {
          let enemyredvirus = databus.pool.getItemByClass('redvirus', redvirus)
          enemyredvirus.init(1, Math.floor(Math.random() * 13000 + 25000))
          databus.enemys.push(enemyredvirus)
        }
        break;
      case 'monoplast_chaohighgrade':
        if (databus.frame % 150 === 2) {
          let enemyvirus = databus.pool.getItemByClass('virus', virus)
          enemyvirus.init(1, Math.floor(Math.random() * 8000 + 2000))
          databus.enemys.push(enemyvirus)
        } else if (databus.frame % 200 === 3) {
          let enemyredvirus = databus.pool.getItemByClass('redvirus', redvirus)
          enemyredvirus.init(1, Math.floor(Math.random() * 15000 + 5000))
          databus.enemys.push(enemyredvirus)
        }
        break;

      default:
    }





  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.enemys.length; i < il; i++) {
        let enemy = databus.enemys[i]

        if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.healthpoint -= databus.firepower;
          enemy.zhendong()
          if (0 >= enemy.healthpoint) {
            enemy.playAnimation();
            this.music.playExplosion();
          } else {
            this.music.playattacked();
          }
          bullet.visible = false;
          break;
        }
      }
    })

    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]
      if (this.player.isCollideWith(enemy)) {
        if (databus.growup > enemy.healthpoint) {
          this.killenemy(enemy);
        } else {
          databus.gameOver = true
          databus.gameOvertip = 1
        }
        break
      }
    }
  }
  killenemy(enemy) {
    enemy.playAnimation();
    this.music.playExplosion();
    this.player.zhendong()
    databus.score += databus.continuous_number;
      

    databus.getscoreanimation(Math.round(enemy.healthpoint / 2))
    databus.stuts = 1;
    databus.growup += enemy.healthpoint/2
    if (databus.continuous_number % 2 == 0) {
      databus.bgsun()
    }


    if (databus.enemyscamp == "guidance"){
      databus.startenemyscampswitch();
      databus.enemyscamp = "start"
    }


  }
  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY)
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)

    databus.bullets
      //.concat(databus.enemys)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })
    databus.enemys
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    if (databus.stuts < 0) {
      databus.gameOver = true  
      databus.gameOvertip = 2
    }

    this.player.drawToCanvas(ctx)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.bg.update()

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update(ctx)
      })

    this.enemyGenerate()
    databus.consume = parseInt(databus.growup / 100) * 0.2
    if (databus.enemyscamp != "guidance" && !databus.gameOver) {
    databus.stuts -= 0.003
    }

    this.collisionDetection()


  }


  mainrender() {    
    this.bg.render(ctx)
    this.home.showpage(ctx)


  }

  // 实现游戏帧循环
  loop() {
    databus.frame++   
    if (databus.page == "home") {
      this.mainrender()
    }else{
      this.update();
      this.render();
      if (databus.enemyscamp == "guidance" && !databus.gameOver) {
        this.gameinfo.guidance(ctx);
      }
      
    }


    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}