;(function () {
  let Bird = window.Bird = function () {
    this.x = game.canvas.width / 2;
    this.y = game.canvas.width * (1 - 0.618);
    this.img = [game.allImg['bird0_0'], game.allImg['bird0_1'], game.allImg['bird0_2']];
    this.changeY = .1;
    this.rotate = 0;
    this.status = 'drop';
    this.wing = 0;
  };
  Bird.prototype = {
    constructor: Bird,
    update() {
      if (this.status === 'drop') {
        this.changeY += 0.1;
        this.y += this.changeY;
        this.rotate += 0.05;
      } else if (this.status === 'up') {
        this.changeY -= 0.06;
        this.y -= this.changeY;
        if (this.changeY <= 0) {
          this.status = 'drop'
        }
        this.y < 24 ? this.y = 24 : null;
        this.wing++;
        this.wing %= 3
      }
      // 落地检测
      if (this.y > game.canvas.height - 112 - 16) {
        game.sM.enter(3);
        document.getElementById('die').play();
        document.getElementById('hit').play();
      }

      this.x1 = this.x - 17;
      this.x2 = this.x + 17;
      this.y1 = this.y - 12;
      this.y2 = this.y + 12;

      /*// 碰撞检测
      for(let i=0; i<game.pipeAry.length; i++){
        let cur = game.pipeAry[i];
        if(this.x >= cur.x && this.x <= cur.x + 52){
          if(this.y <= cur.h1 || this.y >= cur.h1 + cur.space){
            console.log('死了');
            clearInterval(game.timer);
          }
        }
      }
*/
      return this
    },
    render() {
      game.draw.save();
      game.draw.translate(this.x, this.y);
      game.draw.rotate(this.rotate);
      game.draw.drawImage(this.img[this.wing], -24, -24);
      game.draw.restore();
    },
    fly() {
      this.changeY = 3;
      this.rotate = -.8;
      this.status = 'up';
      document.getElementById('wing').play()
    }
  }
})();
