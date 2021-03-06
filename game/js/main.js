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
import GameOverPage from './runtime/gameoverpage'
import GamePausePage from './runtime/pausepage'
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
    this.gameinfo = new GameInfo();
    //实例化分数音效对象
    this.music = new Music();
    //实例化home页面对象
    this.home = new HomePage();
    this.gameoverpage = new GameOverPage();
    this.pausepage = new GamePausePage();
    
    //解决在真机上画图渲染的锯齿问题 具体逻辑查看微信
    if (window.devicePixelRatio) {
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
      //判断当下属于哪个页面
      let x, y;
      switch (databus.page) {        
        //当页面为home页面时候
        case "home":
          x = e.touches[0].clientX
          y = e.touches[0].clientY
          if (x >= screenWidth / 2 - 90 &&
            x <= screenWidth / 2 + 90 &&
            y >= screenHeight / 2 + 40 &&
            y <= screenHeight / 2 + 90) {
            this.music.playstart()
            databus.page = "home_clicked"
            this.restart();
            }
          break;
        //当页面为游戏页面时候
        case "game":
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
          if (x >= 0 &&
            x <= 60 &&
            y >= 0 &&
            y <= 60) {
            databus.page = "pause";
            databus.gamepause = true
          }
          break;
        case "pause":
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
          let Aarea = this.pausepage.AbtnArea
          if (x >= Aarea.startX &&
            x <= Aarea.endX &&
            y >= Aarea.startY &&
            y <= Aarea.endY){
            databus.page = "home";
            databus.gamepause = false;
            }
            
          let Barea = this.pausepage.BbtnArea
          if (x >= Barea.startX &&
            x <= Barea.endX &&
            y >= Barea.startY &&
            y <= Barea.endY){
            databus.page = "game";
            databus.gamepause = false;
            this.restart()
            }
          let Carea = this.pausepage.CbtnArea
          if (x >= Carea.startX &&
            x <= Carea.endX &&
            y >= Carea.startY &&
            y <= Carea.endY){
            databus.page = "game";
            databus.gamepause = false
            }
            
          break;
        default:
          console.log();
      }
  
       
    
      


      this.player.tem_ = e.touches[0].clientX - this.player.x - 40;
      this.player.tem_y = e.touches[0].clientY - this.player.y;
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      if(!databus.gameOver && !databus.gamepause){
        let x = e.touches[0].clientX - this.player.tem_
        let y = e.touches[0].clientY - this.player.tem_y
        this.player.ismove = true
        this.player.setAirPosAcrossFingerPosZ(x, y)
      }


    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      if (!this.player.ismove &&  "game" == databus.page) {
        this.player.shoot()
        this.player.music.playShoot()
      } 
      if (databus.page == "home_clicked") {
        databus.page = "game"
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
        if (databus.first) {
          console.log(databus.first)
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(1, Math.floor(Math.random() * 5 + 10))
          databus.enemys.push(enemy)
          databus.first = false
        }
        break;
      case 'start':
        //单细胞初级阵营
        if (databus.frame % 80 === 0) {
          let enemy = databus.pool.getItemByClass('minicell', minicell)
          enemy.init(1.5, Math.floor(Math.random() * 10 + 20))
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

    let tem_enemys = [];
    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]
      if (this.player.isCollideWith(enemy)) {
        if (databus.growup > enemy.healthpoint) {
          this.killenemy(enemy);
        } else {

          databus.stuts -= 0.03

        }
      }
      tem_enemys.push(enemy);
    }


    enemyisCollideWith();

    function enemyisCollideWith() {
      let enemy_tem = tem_enemys.shift()
      if (0 == tem_enemys.length) {
        return
      }

      for (let i = 0, il = tem_enemys.length; i < il; i++) {
        if (enemy_tem.isCollideWith(tem_enemys[i])) {
          if (enemy_tem.healthpoint > tem_enemys[i].healthpoint) {
            enemy_tem.healthpoint += tem_enemys[i].healthpoint
            tem_enemys[i].playAnimation();
          } else {
            tem_enemys[i].healthpoint += enemy_tem.healthpoint
            enemy_tem.playAnimation();
          }
        }
      }
      enemyisCollideWith();
    }
  }
  killenemy(enemy) {
    this.music.playExplosion();
    enemy.playAnimation();

    this.player.zhendong()
    databus.score += databus.continuous_number;


    databus.getscoreanimation(Math.round(enemy.healthpoint / 2))
    if (databus.stuts < 0.97) {
      databus.stuts += 0.03
    };
    databus.growup += enemy.healthpoint / 2
    if (databus.continuous_number % 2 == 0) {
      databus.bgsun()
    }


    if (databus.enemyscamp == "guidance") {
      databus.startenemyscampswitch();
      databus.enemyscamp = "start"
    }


  }
  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameoverpage.btnArea
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
    this.gameinfo.renderactionhint(ctx)

  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver || databus.gamepause)
      return;

    this.bg.update()

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update(ctx)
      })

    this.enemyGenerate()
    databus.consume = parseInt(databus.growup / 100) * 0.2


    this.collisionDetection()


  }




  // 实现游戏帧循环
  loop() {
    databus.frame++

    switch (databus.page) {
      case "home":
        this.bg.render(ctx)
        this.home.showpage(ctx)
        break;
      case "game":
        this.update();
        this.render();
        if (databus.enemyscamp == "guidance" && !databus.gameOver && !databus.gamepause) {
          this.gameinfo.guidance(ctx);
        }
        // 游戏结束停止帧循环
        if (databus.gameOver) {
          this.gameoverpage.renderGameOver(ctx, databus.score)
          if (!this.hasEventBind) {
            this.hasEventBind = true
            this.touchHandler = this.touchEventHandler.bind(this)
            canvas.addEventListener('touchstart', this.touchHandler)
          }
        }
        break;
      case "pause":
        this.bg.render(ctx)
        this.pausepage.renderGamepause(ctx)        
        
      default:

    }
      

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}