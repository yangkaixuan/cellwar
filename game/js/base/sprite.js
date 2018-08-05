/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }



  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  chageimg(imgsrc) {
    this.img.src = imgsrc
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let deep = 10
    let spstartX = sp.x + deep
    let spendX = sp.x + sp.width - deep
    let spstartY = sp.y + deep
    let spendY = sp.y + sp.height - deep

    let selfstartX = this.x + deep;
    let selfendX = this.x + this.width - deep;
    let selfstartY = this.y + deep;
    let selfendY = this.y + this.height - deep;
    if (!this.visible || !sp.visible)
      return false


    return !!(
       ((spstartX <= selfstartX && spendX >= selfstartX) || (spstartX <= selfendX && spendX >= selfendX) ||
       (selfstartX <= spstartX && selfendX >= spstartX) || (selfstartX <= spendX && selfendX >= spendX))
       &&
       ((spstartY <= selfstartY && spendY >= selfstartY) || (spstartY <= selfendY && spendY >= selfendY) ||
       (selfstartY <= spstartY && selfendY >= spstartY) || (selfstartY <= spendY && selfendY >= spendY))
    )
  }
}
