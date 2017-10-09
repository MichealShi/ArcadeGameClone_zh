var BASE_HEIGHT = 83,
    BASE_WIDTH = 101;

//设置标志符，当游戏结束时，屏蔽按键功能
var flag = false;

// 这是我们的玩家要躲避的敌人
var Enemy = function (sprite, x, y, rate) {
    // 加载敌人图片，确定初始位置和速度
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.rate = rate;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (!flag) {
        return;
    }

    if (this.x < BASE_WIDTH * 5) {
        this.x = this.x + this.rate * dt * 100;
    } else {
        this.x = -100;
        this.y = getRandomInt(1, 4) * BASE_HEIGHT - 10;
        this.rate = getRandomInt(3, 6);
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    if (!player.isLive) {
        //redrawMeme("gray", col * 101, row * 83);
        ctx.globalAlpha = 0.75;
    } else {
        ctx.globalAlpha = 1;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//加载玩家图片，确定初始位置
var Player = function (sprite, x, y) {
    Enemy.call(this, sprite, x, y);
};

Player.prototype.update = function () {
    //空操作
};

var playerId = 'images/char-boy.png';
//玩家渲染
Player.prototype.render = function () {
    if (!player.isLive) {
        //redrawMeme("gray", col * 101, row * 83);
        ctx.globalAlpha = 0.75;
    } else {
        ctx.globalAlpha = 1;
    }
    ctx.drawImage(Resources.get(playerId), this.x, this.y);
};

Player.prototype.isLive = true;
// 现在实现你自己的玩家类
var player = new Player(playerId, BASE_WIDTH * 2, BASE_HEIGHT * 5);
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.handleInput = function (keyCode) {
    if (flag) {
        if (keyCode == 'left' && this.x > 0) {
            this.x -= BASE_WIDTH;
        } else if (keyCode == 'up' && this.y > 0) {
            this.y -= BASE_HEIGHT;
        } else if (keyCode == 'right' && this.x < BASE_WIDTH * 4) {
            this.x += BASE_WIDTH;
        } else if (keyCode == 'down' && this.y < BASE_HEIGHT * 5) {
            this.y += BASE_HEIGHT;
        }
    } else {
        if (keyCode == 'space') {
            buttonClick();
        }
    }
};
$(document).keydown(function (event) {
    //if (event.keyCode == "down" || event.keyCode == "up")
    event.preventDefault();
})
Player.prototype.reset = function () {
    ctx.globalAlpha = 1;
    flag = true;
    player.isLive = true;
    player.x = BASE_WIDTH * 2;
    player.y = BASE_HEIGHT * 5;
};

//加载游戏图片，确定初始位置
var Game = function (sprite, x, y) {
    Enemy.call(this, sprite, x, y);
};
var game = new Game('images/char-boy.png', 505, 505);
Game.prototype.render = function () {
    if (!player.isLive) {
        //redrawMeme("gray", col * 101, row * 83);
        ctx.fillStyle = "gray";
        ctx.globalAlpha = 0.75;
        ctx.fillRect(0, 50, 505, 538);
    }
    if (player.y === 0) {
        ctx.font = "52pt Impact";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.fillStyle = "black";
        ctx.fillText("YOU WIN!!", 252, 403);
        ctx.strokeText("YOU WIN!!", 252, 403);
        flag = false;
        document.getElementById("start_button").innerText = "ReStart";
        ctx.textAlign = "center";
        ctx.drawImage(Resources.get('images/Selector.png'), 202, 153);
    }
    if (player.isLive == false) {
        ctx.globalAlpha = 1;
        ctx.font = "52pt Impact";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER!!", 252, 303);
        ctx.strokeText("GAME OVER!!", 252, 303);
        flag = false;
        document.getElementById("start_button").innerText = "ReStart";
    }
}

//获得随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
for (var i = 0; i <= 3; i++) {
    var enemy = new Enemy('images/enemy-bug.png', -100, getRandomInt(1, 4) * BASE_HEIGHT - 20, getRandomInt(4, 6));
    allEnemies.push(enemy);
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function buttonClick() {
    if (flag) {
        flag = false;
        document.getElementById("start_button").innerText = "Start";
    } else {
        document.getElementById("start_button").innerText = "Pause";
        player.reset();
    }
}

function selectPlayer1() {
    playerId = "images/char-boy.png";
    player.render();
}
function selectPlayer2() {
    playerId = "images/char-cat-girl.png";
    player.render();
}
function selectPlayer3() {
    playerId = "images/char-horn-girl.png";
    player.render();
}
function selectPlayer4() {
    playerId = "images/char-pink-girl.png";
    player.render();
}
function selectPlayer5() {
    playerId = "images/char-princess-girl.png";
    player.render();
}
