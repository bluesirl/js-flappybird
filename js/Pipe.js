;(function () {
  let Pipe = window.Pipe = function () {
    this.h1 = Math.round(Math.random() * 160 + 160);
    this.space = 140;
    this.h2 = game.canvas.height - 112 - this.h1 - this.space;
    this.x = game.canvas.width;
    this.step = game.bg.step * 1.6;
    this.down = true;
    game.pipeAry.push(this);
  };
  Pipe.prototype = {
    constructor: Pipe,
    update() {
      this.x -= this.step;
      if (this.x <= -52) {
        for (let i = 0; i < game.pipeAry.length; i++) {
          if (game.pipeAry[i] === this) {
            game.pipeAry.splice(i, 1);
            i--
          }
        }
      }
      this.x1 = this.x;
      this.x2 = this.x + 52;
      this.y1 = this.h1;
      this.y2 = this.h1 + this.space;

      // 碰撞检测
      if (game.bird.x2 >= this.x1 && game.bird.x1 < this.x2) {
        if (game.bird.y1 < this.y1 || game.bird.y2 > this.y2) {
          game.sM.enter(3);
          document.getElementById('die').play();
          document.getElementById('hit').play();
        }
      }
      // 加分
      if (this.down && game.bird.x1 > this.x2) {
        this.down = false;
        game.score++;
        document.getElementById('point').play();
      }

      return this
    },
    render() {
      game.draw.drawImage(game.allImg['pipe_down'], 0, 320 - this.h1, 52, this.h1, this.x, 0, 52, this.h1);
      game.draw.drawImage(game.allImg['pipe_up'], 0, 0, 52, this.h2, this.x, game.canvas.height - 112 - this.h2, 52, this.h2)
    }
  }
})();
