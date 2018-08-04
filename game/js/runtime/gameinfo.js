import DataBus from '../databus'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let databus = new DataBus()

let energy = new Image()

let paopao = new Image()

energy.src = 'images/energy.png';

paopao.src = 'images/bullet.png'


export default class GameInfo {

  energy_Width = screenWidth - 80


  fonts = 60
  fontw = 0
  s = 5
  renderGameScore(ctx, score) {
    ctx.drawImage(
      paopao,
      20,
      screenHeight - 120,
      50,
      50
    )
    ctx.fillText(
      databus.firepower,
      35,
      screenHeight - 88
    )
    ctx.font = "bold 50px Arial"
    ctx.fillText(
      databus.score,
      10,
      50
    )



    if (this.fonts == databus.fons) {

    } else if (this.fonts < databus.fons) {
      this.fonts += this.s
    } else if (this.fonts > databus.fons) {
      this.fonts -= this.s
    }
    if (this.fontw == databus.fonsw) {

    } else if (this.fontw < databus.fonsw) {
      this.fontw += this.s / 2
    } else if (this.fontw > databus.fonsw) {
      this.fontw -= this.s / 2
    }
    ctx.fillStyle = "#fff"
    ctx.font = "bold " + this.fonts + "px Arial";
   
    if (databus.getscore) {  
        
      ctx.globalAlpha = 0.2
      ctx.fillStyle = "#000";
      ctx.fillRect(0, screenHeight / 2 - 110, screenHeight, 130);
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 1
      ctx.fillStyle = "#fff";
      if (databus.continuous_number < 10) {

        ctx.fillText(
          "+" + databus.continuous_number,
          screenWidth / 2 - 38 - this.fontw,
          screenHeight / 2 - 50 + this.fontw
        )
      } else if (databus.continuous_number < 100 && databus.continuous_number >= 10) {

        ctx.fillText(
          "+" + databus.continuous_number,
          screenWidth / 2 - 23 - this.fontw,
          screenHeight / 2 - 50 + this.fontw
        )
      } else if (databus.continuous_number < 1000 && databus.continuous_number >= 100) {
        ctx.fillText(
          "+" + databus.continuous_number,
          screenWidth / 2 - 45 - this.fontw,
          screenHeight / 2 - 50 + this.fontw
        )
      }
      ctx.font = "bold " + this.fonts / 2 + "px Arial"
      
      ctx.fillText(
        "+" + databus.getscore + "点成长",
        screenWidth / 2 - 82 - this.fontw * 2,
        screenHeight/2 -20 + this.fontw * 2
      )



    }
    











    var energyCells;
    if (databus.stuts < 1000) {
      energyCells = 100
    } else if (databus.stuts > 1000 && databus.stuts < 10000) {
      energyCells = 1000
    } else {
      energyCells = 1000
    }

    // ctx.drawImage(
    //   energy,
    //   20,
    //   screenHeight -100,
    //   100,
    //   40
    // )

    ctx.fillStyle = "#f8e516"
    ctx.font = "bold 18px Arial"
    // ctx.restore()
    // ctx.shadowBlur = 10;
    // ctx.shadowColor = "black";

  




    let energyCells_length;
    let interspace = 1;

    let energyCells_percent = energyCells / databus.growup;
    let energyCells_remainderpercent = (databus.stuts % energyCells) / databus.growup
    if (energyCells_remainderpercent) {
      energyCells_length = parseInt(databus.stuts / energyCells) + 1
    } else {
      energyCells_length = parseInt(databus.stuts / energyCells)
    }
    let energyCellsWidth = this.energy_Width * energyCells_percent

    ctx.beginPath();




    //绘制进度条 1.先绘制一个底色为黑的容器2.绘制红色的能量进度条
    //填充颜色为黑
    ctx.fillStyle = "#000000";  
    //定义矩形的长度宽度和所在位置  
    let progressback_width = screenWidth - 60
    let progressback_height = 38
    //绘制矩形，居中显示
    ctx.fillRect(30, screenHeight - 60, progressback_width, progressback_height);
    //开始左半画圆
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(30, screenHeight - 41,19, 0 + 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();
    ctx.save()
    //开始右半画圆
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(screenWidth - 30, screenHeight - 41, 19, 0 - 0.5 * Math.PI, 0.5 * Math.PI);
    ctx.fill();
    ctx.save();



    ctx.fillStyle = "#e75643"
    let progress_width = (progressback_width - 10) * databus.stuts
    let progress_height = progressback_height-14
    ctx.fillRect(33, screenHeight - 53, progress_width, progress_height);
    //开始左半画圆
    ctx.beginPath();
    ctx.arc(33, screenHeight - 41, 12, 0 + 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();
    ctx.save()
    //开始右半画圆
    ctx.beginPath();
    ctx.arc(32 + progress_width, screenHeight - 41, 12, 0 - 0.5 * Math.PI, 0.5 * Math.PI);
    ctx.fill();
    ctx.save();


  }


  renderactionhint(ctx, hint) {
    if (databus.getscore) {
      ctx.fillStyle = "#f8e516"
      ctx.font = "bold 20px Arial"
      ctx.fillText(
        "+" + databus.getscore,
        screenWidth - 10,
        150
      )
      if (databus.continuous_number > 1) {
        ctx.fillText(
          hint,
          10,
          180
        )
      }

    }
  }
  guidance(ctx) {
    if(databus.enemys[0].healthpoint >= databus.growup){
      ctx.globalAlpha = 0.2
      ctx.fillStyle = "#000";
      ctx.fillRect(0, screenHeight / 2 - 110, screenHeight, 100);      
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 1
      ctx.fillStyle = "#fff"
      ctx.font = "bold 32px Arial"
      ctx.fillText(
        '点击屏幕攻击',
        screenWidth / 2 - 90,
        screenHeight / 2 - 50
      )
    } else if (databus.enemys[0].healthpoint<=0){
      ctx.globalAlpha = 0.2
      ctx.fillStyle = "#000";
      ctx.fillRect(0, screenHeight / 2 - 110, screenHeight, 100);
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 1
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px Arial"

      ctx.fillText(
        'No!能量浪费了',
        screenWidth / 2 - 110,
        screenHeight / 2 - 70
      )
      ctx.fillText(
        '再试一次 吃掉它',
        screenWidth / 2 - 125,
        screenHeight / 2 - 30
      )
    }else{
      ctx.globalAlpha = 0.2
      ctx.fillStyle = "#000";
      ctx.fillRect(0, screenHeight / 2 - 110, screenHeight, 100);  
      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 1
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px Arial"
    
      ctx.fillText(
        'Good! 吃掉它',
        screenWidth / 2 - 90,
        screenHeight / 2 - 50
      )
    }
    
  }


  renderGameOver(ctx, score) {

    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.7
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    ctx.save();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      '得分',
      screenWidth / 2 - 15,
      130
    )  
    ctx.font = "bold 25px Arial"
    if (databus.gameOvertip == 1) {
      ctx.fillText(
        '细胞相遇会互相吞噬',
        screenWidth / 2 -110,
        screenHeight / 2 -50
      )
      ctx.fillText(
        '看看谁的能量强大',
        screenWidth / 2 - 100,
        screenHeight / 2 - 10
      )
    } else if (databus.gameOvertip == 2){
      ctx.fillText(
        '最下方为细胞能量',
        screenWidth / 2 - 100,
        screenHeight / 2 - 50
      )
      ctx.fillText(
        '不断吞噬细胞才能维持生命',
        screenWidth / 2 - 150,
        screenHeight / 2 - 10
      )
    }
    

    ctx.font = "bold 70px Arial"
    if (score >= 10 && score < 100){
      ctx.fillText(
        score,
        screenWidth / 2 - 30,
        200
      )
    } else if (score >= 100 && score < 1000){
      ctx.fillText(
        score,
        screenWidth / 2 - 50,
        200
      )
    }
    else if (score >= 1000 && score < 10000) {
      ctx.fillText(
        score,
        screenWidth / 2 - 75,
        200
      )
    }else{
      ctx.fillText(
        score,
        screenWidth / 2 - 15,
        200
      )
    }

 
   


    //先画一长方形，背景色为白    
    ctx.fillStyle = "#fff";
    ctx.fillRect(screenWidth / 2 - 65, screenHeight / 2 + 40, 130, 50);
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.font = "bold 23px Arial"
    ctx.fillText(
      "重新开始",
      screenWidth / 2 - 28,
      screenHeight / 2 + 73
    )
    //画一个半圆（右）
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(screenWidth / 2 + 64, screenHeight / 2 + 65, 25, 0 - 0.5 * Math.PI, 0.5 * Math.PI);
    ctx.fill();
    ctx.save();

    //画一个半圆（左）

    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(screenWidth / 2 - 64, screenHeight / 2 + 65, 25, 0 + 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();
    ctx.save();

    //画一个三角形
    ctx.beginPath();
    var startx = screenWidth / 2 - 62;
    var starty = screenHeight / 2 + 50;
    ctx.moveTo(startx, starty);
    ctx.lineTo(startx + 23, starty + 15);
    ctx.lineTo(startx, starty + 30);
    ctx.lineTo(startx, starty);
    ctx.fillStyle = "#588ddc";
    ctx.fill();
    ctx.save();

 

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 65,
      startY: screenWidth / 2 + 65,
      endX: screenHeight - 280,
      endY: screenHeight - 230
    }

  }
}