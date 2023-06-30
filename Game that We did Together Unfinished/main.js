const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

let keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

const gollum = new Image();
gollum.src = "img/gollum.jpg";

const background = new Image();
background.src = "img/background.jpg.avif";

const enemy = new Image();
enemy.src = "img/enemy.png";

window.addEventListener("keydown", (event) => {
  if (event.key == "w") {
    keys.w = true;
  } else if (event.key == "a") {
    keys.a = true;
  } else if (event.key == "s") {
    keys.s = true;
  } else if (event.key == "d") {
    keys.d = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "w") {
    keys.w = false;
  } else if (event.key == "a") {
    keys.a = false;
  } else if (event.key == "s") {
    keys.s = false;
  } else if (event.key == "d") {
    keys.d = false;
  }
});

class Player {
  constructor() {
    this.health = 100;
    this.pos = {
      x: 0,
      y: 0,
    };
  }

  drawHealthBar() {
    ctx.fillStyle = "red";
    ctx.fillRect(25, 25, this.health * 2, 25);
  }
}

class Enemy {
  constructor(pos) {
    this.pos = pos;
    this.speed = 2;
    this.hasAttacked = false;
    this.damage = 5;
  }

  damagePlayer() {
    if (
      this.pos.x < player.pos.x + 50 &&
      this.pos.x + 50 > player.pos.x &&
      this.pos.y < player.pos.y + 50 &&
      this.pos.y + 50 > player.pos.y &&
      !this.hasAttacked &&
      player.health > 0
    ) {
      player.health -= this.damage;
      this.hasAttacked = true;

      setTimeout(() => {
        this.hasAttacked = false;
      }, 1000);
    }
  }

  move() {
    if (this.pos.x < player.pos.x) {
      this.pos.x += this.speed;
    } else if (this.pos.x > player.pos.x) {
      this.pos.x -= this.speed;
    }

    if (this.pos.y < player.pos.y) {
      this.pos.y += this.speed;
    } else if (this.pos.y > player.pos.y) {
      this.pos.y -= this.speed;
    }
  }

  draw() {
    ctx.drawImage(enemy, this.pos.x, this.pos.y, 50, 50);
  }

  update() {
    this.damagePlayer();
    this.move();
    this.draw();
  }
}

let player = new Player();

let enemy01 = new Enemy({
  x: 100,
  y: 300,
});
let enemy02 = new Enemy({
  x: 200,
  y: 300,
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(gollum, player.pos.x, player.pos.y, 50, 50);

  enemy01.update();
  enemy02.update();

  player.drawHealthBar();

  if (keys.w == true) {
    player.pos.y = player.pos.y - 5;
  }
  if (keys.a == true) {
    player.pos.x = player.pos.x - 5;
  }
  if (keys.s == true) {
    player.pos.y = player.pos.y + 5;
  }
  if (keys.d == true) {
    player.pos.x = player.pos.x + 5;
  }

  requestAnimationFrame(loop);
}

loop();
