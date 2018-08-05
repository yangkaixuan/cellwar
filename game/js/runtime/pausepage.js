import DataBus from '../databus'
let databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


export default class GamePausePage {


  //结束游戏页面画图
  renderGamepause(ctx) {
    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.7
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    ctx.save();
    ctx.globalAlpha = 1;

    


    let drawbutton = (color,text,height)=>{
      //先画一长方形，背景色为白    
      ctx.fillStyle = "#fff";
      ctx.fillRect(screenWidth / 2 - 65, height, 130, 50);
      ctx.save();
      ctx.fillStyle = "#000";
      ctx.font = "bold 23px Arial"
      ctx.fillText(
        text,
        screenWidth / 2 - 28,
        height+33
      )
      //画一个半圆（右）
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(screenWidth / 2 + 64, height+25, 25, 0 - 0.5 * Math.PI, 0.5 * Math.PI);
      ctx.fill();
      ctx.save();

      //画一个半圆（左）

      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(screenWidth / 2 - 64, height + 25, 25, 0 + 0.5 * Math.PI, 1.5 * Math.PI);
      ctx.fill();
      ctx.save();

      //画一个三角形
      ctx.beginPath();
      var startx = screenWidth / 2 - 62;
      var starty = height + 10;
      ctx.moveTo(startx, starty);
      ctx.lineTo(startx + 23, starty + 15);
      ctx.lineTo(startx, starty + 30);
      ctx.lineTo(startx, starty);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.save();
    }
    drawbutton("#588ddc","返回主页", screenHeight / 2 + 40);
    drawbutton("#588ddc","重新开始", screenHeight / 2 - 40);
    drawbutton("#83c566","继续游戏", screenHeight / 2- 120 );
    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.AbtnArea = {
      startX: screenWidth / 2 - 90,
      endX: screenWidth / 2 + 90,
      startY: screenHeight / 2 + 40,
      endY: screenHeight / 2 + 90
    }
    this.BbtnArea = {
      startX: screenWidth / 2 - 90,
      endX: screenWidth / 2 + 90,
      startY: screenHeight / 2 -40,
      endY: screenHeight / 2 + 10
    }
    this.CbtnArea = {
      startX: screenWidth / 2 - 90,
      endX: screenWidth / 2 + 90,
      startY: screenHeight / 2 - 120,
      endY: screenHeight / 2 -70
    }

  }
}