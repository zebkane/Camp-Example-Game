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
background.src = "img/background.jpg";

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
    this.pos = {
      x: 0,
      y: 0,
    };
    this.speed = 5;
    this.health = 100;
  }

  move() {
    if (keys.w == true) {
      this.pos.y = this.pos.y - this.speed;
    }

    if (keys.a == true) {
      this.pos.x = this.pos.x - this.speed;
    }

    if (keys.s == true) {
      this.pos.y = this.pos.y + this.speed;
    }

    if (keys.d == true) {
      this.pos.x = this.pos.x + this.speed;
    }
  }

  checkBorders() {
    if (this.pos.x + 50 < 0) {
      this.pos.x = canvas.width;
    } else if (this.pos.x > canvas.width) {
      this.pos.x = -50;
    }

    if (this.pos.y + 50 < 0) {
      this.pos.y = canvas.height;
    } else if (this.pos.y > canvas.height) {
      this.pos.y = -50;
    }
  }

  draw() {
    ctx.drawImage(gollum, this.pos.x, this.pos.y, 50, 50);
  }

  update() {
    this.move();
    this.checkBorders();
    this.draw();
  }
}

class Enemy {
  constructor() {
    this.pos = {
      x: 0,
      y: 0,
    };
    this.speed = 2;
  }

  attack() {}

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
    this.move();
    this.draw();
  }
}

let enemy01 = new Enemy();
const player = new Player();

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  player.update();

  enemy01.update();

  requestAnimationFrame(loop);
}

loop();
