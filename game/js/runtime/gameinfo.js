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
    // ctx.drawImage(
    //   paopao,
    //   20,
    //   screenHeight - 120,
    //   50,
    //   50
    // )
    // ctx.fillText(
    //   databus.firepower,
    //   35,
    //   screenHeight - 88
    // )
    // ctx.font = "bold 50px Arial"
    // ctx.fillText(
    //   databus.score,
    //   10,
    //   50
    // )



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
}