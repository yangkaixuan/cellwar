
/**
 * 首页
 * author:yangkaixuan
 * date:2018-08-04
 */

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

//初始化
let title = new Image()
title.src = 'images/title.png';


export default class HomePage {
  constructor() {
 
  }
  showpage(ctx){
    //背景颜色为灰色
    ctx.fillStyle = "#84858c";
    ctx.globalAlpha = 0.6
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    ctx.save();
    ctx.globalAlpha = 1;

    ctx.drawImage(
      title,
      screenWidth / 2 - 100,
      120,
      200,
      48
    )


    ctx.save();
    // //先画一长方形，背景色为白    
    ctx.fillStyle = "#fff";
    ctx.fillRect(screenWidth / 2 - 65, screenHeight / 2 + 40, 130, 50);
    ctx.save();

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

    ctx.fillStyle = "#000";
    ctx.font = "bold 23px Arial"
    ctx.fillText(
      "开始游戏",
      screenWidth / 2 - 28,
      screenHeight / 2 + 73
    )

    ctx.beginPath();
    var width = canvas.width,
      height = canvas.height;
    if (window.devicePixelRatio) {

    }

    // //画一条线
    ctx.beginPath();
    ctx.moveTo(0, screenHeight - 150);
    ctx.lineTo(screenWidth, screenHeight - 150);
    ctx.strokeStyle = "#fff"
    ctx.stroke();



    ctx.beginPath();
    ctx.arc(screenWidth / 2 - 100, screenHeight - 80, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = "bold 23px Arial"
    ctx.fillStyle = "#fff";
    ctx.fillText(
      "排行",
      screenWidth / 2 - 123,
      screenHeight - 74
    )



    ctx.beginPath();
    ctx.arc(screenWidth / 2, screenHeight - 80, 40, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.font = "bold 23px Arial"
    ctx.fillStyle = "#fff";
    ctx.fillText(
      "分享",
      screenWidth / 2 - 22,
      screenHeight - 74
    )
    ctx.beginPath();
    ctx.arc(screenWidth / 2 + 100, screenHeight - 80, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(
      "设置",
      screenWidth / 2 + 77,
      screenHeight - 74
    )
  }
}
