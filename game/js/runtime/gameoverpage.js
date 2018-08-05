import DataBus from '../databus'
let databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


export default class GameOverPage {


  //结束游戏页面画图
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
      startX: screenWidth / 2 - 90,
      endX: screenWidth / 2 + 90,
      startY: screenHeight / 2 + 40,      
      endY: screenHeight/2 + 90
    }

  }
}