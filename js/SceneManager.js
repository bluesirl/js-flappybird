;(function () {
  let SceneManager = window.SceneManager = function () {
    this.bindEvent()
  };
  SceneManager.prototype.enter = function (num) {
    game.scene = num;
    switch (num) {
      case 0:
        this.titleY = -178;
        this.buttonY = game.canvas.height;
        this.birdY = 260;
        this.birdChangeY = 1.2;
        break;
      case 1:
        this.alpha = 0;
        this.changeAlpha = 0.05;
        break;
      case 2:
        game.score = 0;
        game.bg = new Background;
        game.land = new Land;
        game.bird = new Bird;
        game.pipeAry = [];
        break;
      case 3:
        this.isBoom = false;
        this.boomIndex = 1;
        break;
      case 4:
        this.gameOverY = 0;
        this.scorePanelY = game.canvas.height;
        let arr = JSON.parse(localStorage.getItem('FB'));
        arr.sort((a,b) => b - a );
        this.best = arr[0];
        if(game.score > arr[0]){
          this.medals = 'medals_1';
          this.best = game.score;
        }else if(game.score > arr[1]){
          this.medals = 'medals_2';
        }else if(game.score > arr[2]){
          this.medals = 'medals_3';
        }else {
          this.medals = 'medals_0';
        }
        if(!arr.includes(game.score)){
          arr.push(game.score)
        }
        localStorage.setItem('FB',JSON.stringify(arr));
        break;
      default:
        break;
    }
  };
  SceneManager.prototype.updateAndRender = function () {
    switch (game.scene) {
      case 0:
        game.draw.fillStyle = '#4ec0ca';
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112);
        this.titleY += 7;
        this.buttonY -= 8;
        if (this.titleY >= 160) this.titleY = 160;
        if (this.buttonY <= 370) this.buttonY = 370;
        game.draw.drawImage(game.allImg['title'], (game.canvas.width - 178) / 2, this.titleY);
        game.draw.drawImage(game.allImg['button_play'], (game.canvas.width - 116) / 2, this.buttonY);
        this.birdY += this.birdChangeY;
        if (this.birdY >= 300 || this.birdY < 250) {
          this.birdChangeY *= -1;
        }
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, this.birdY);
        break;
      case 1:
        game.draw.fillStyle = '#4ec0ca';
        game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.draw.drawImage(game.allImg['bg_day'], 0, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['bg_day'], 288, game.canvas.height - 512);
        game.draw.drawImage(game.allImg['land'], 0, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['land'], 336, game.canvas.height - 112);
        game.draw.drawImage(game.allImg['bird0_0'], (game.canvas.width - 48) / 2, 150);
        game.draw.save();
        if (this.alpha > 1 || this.alpha < 0) this.changeAlpha *= -1;
        this.alpha += this.changeAlpha;
        game.draw.globalAlpha = this.alpha;
        game.draw.drawImage(game.allImg['tutorial'], (game.canvas.width - 114) / 2, 250);
        game.draw.restore();
        break;
      case 2:
        game.bg.update().render();
        game.land.update().render();
        game.bird.update().render();
        game.f % 220 === 0 ? new Pipe : null;
        game.pipeAry.forEach(item => {
          item.update();
          item.render()
        });
        scoreRender();
        break;
      case 3:
        game.bg.render();
        game.land.render();
        game.pipeAry.forEach(item => {
          item.render()
        });
        if (this.isBoom) {
          game.draw.drawImage(game.allImg['baozha' + this.boomIndex], game.bird.x - 50, game.bird.y - 100, 100, 100);
          if (this.boomIndex < 9) {
            if (game.f % 2) this.boomIndex++;
          } else {
            this.enter(4)
          }
        } else {
          game.bird.y += 5;
          if (game.bird.y >= game.canvas.height - 112) {
            this.isBoom = true;
          }
          game.bird.render();
        }
        scoreRender();
        break;
      case 4:
        game.bg.render();
        game.land.render();
        game.pipeAry.forEach(item => {
          item.render()
        });
        this.gameOverY += 7;
        this.scorePanelY -= 20;
        if (this.gameOverY >= 160) this.gameOverY = 160;
        if (this.scorePanelY <= 270) {
          this.scorePanelY = 270;
          this.isShowMedal = true;
        }
        game.draw.drawImage(game.allImg['game_over'], (game.canvas.width - 204) / 2, this.gameOverY);
        game.draw.drawImage(game.allImg['score_panel'], (game.canvas.width - 238) / 2, this.scorePanelY);
        if(this.isShowMedal){
          game.draw.drawImage(game.allImg[this.medals], game.canvas.width / 2 - 88, this.scorePanelY + 44);
          game.draw.fillStyle = '#333';
          game.draw.font = '20px consolas';
          game.draw.textAlign = 'right';
          game.draw.fillText(game.score, game.canvas.width / 2 + 93, this.scorePanelY + 50);
          game.draw.fillText(this.best, game.canvas.width / 2 + 93, this.scorePanelY + 96);
          clearInterval(game.timer);
          document.getElementById('swoo').play();
        }
        break;
      default:
        break;
    }
  };
  SceneManager.prototype.bindEvent = function () {
    game.canvas.onclick = (e) => {
      switch (game.scene) {
        case 0:
          if (e.clientY > this.buttonY && e.clientY < this.buttonY + 70
            && e.clientX > (game.canvas.width - 116) / 2
            && e.clientX < (game.canvas.width + 116) / 2) {
            this.enter(1);
          }
          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          game.bird.fly();
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    }
  };

  function scoreRender() {
    let score = game.score.toString();
    let cenLin = game.canvas.width / 2 - (score.length) / 2 * 30;
    for (let i = 0; i < score.length; i++) {
      game.draw.drawImage(game.allImg['shuzi' + score[i]], cenLin + i * 30, 80)
    }
  }
})();
