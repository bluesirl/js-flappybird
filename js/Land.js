/**
 * Created by lzb on 2017/12/21.
 */
(function () {
  /**
   * 地面
   * @constructor Land
   */
  let Land = window.Land = function () {
    this.x = 0;
    this.w = 336;
    this.h = 112;
    this.step = game.bg.step * 1.6;
  };
  Land.prototype = {
    constructor: Land,
    update() {
      this.x -= this.step;
      if (this.x <= -this.w) {
        this.x = 0;
      }
      return this
    },
    render() {
      game.draw.drawImage(game.allImg['land'], this.x, game.canvas.height - this.h);
      game.draw.drawImage(game.allImg['land'], this.x + this.w, game.canvas.height - this.h);
      game.draw.drawImage(game.allImg['land'], this.x + this.w * 2, game.canvas.height - this.h);
    }
  }
})();
