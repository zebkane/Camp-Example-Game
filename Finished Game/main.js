const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

const playPage = document.querySelector(".play-page");
const playButton = document.querySelector("#play-button");

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

let enemies = [];

let gameHasStarted = false;

playButton.addEventListener("click", () => {
  playPage.style.display = "none";
  canvas.style.display = "block";
  gameHasStarted = true;

  setup();
});

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
  constructor(pos) {
    this.pos = pos;
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
    ctx.fillStyle = "#FF6666";
    ctx.fillRect(25, 25, this.health * 2, 20);

    ctx.strokeStyle = "#2C3333";
    ctx.lineWidth = 8;
    ctx.strokeRect(25, 25, 200, 20);

    ctx.drawImage(gollum, this.pos.x, this.pos.y, 50, 50);
  }

  update() {
    this.move();
    this.checkBorders();
    this.draw();
  }
}

class Enemy {
  constructor(pos) {
    this.pos = pos;
    this.speed = 2;
    this.damage = 5;
    this.attackedRecently = false;
  }

  attack() {
    if (
      this.pos.x + 50 > player.pos.x &&
      this.pos.x < player.pos.x + 50 &&
      this.pos.y + 50 > player.pos.y &&
      this.pos.y < player.pos.y + 50 &&
      !this.attackedRecently &&
      player.health > 0
    ) {
      player.health -= this.damage;
      this.attackedRecently = true;
      setTimeout(() => {
        this.attackedRecently = false;
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
    this.attack();
    this.move();
    this.draw();
  }
}

const player = new Player({
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
});

function spawnEnemies() {
  for (i = 0; i < 5; i++) {
    enemies.push(
      new Enemy({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
      })
    );
  }
}

function updateEnemies() {
  enemies.forEach((enemy) => {
    enemy.update();
  });
}

function checkEndGame() {
  if (player.health <= 0) {
    playPage.style.display = "flex";
    canvas.style.display = "none";
    gameHasStarted = false;

    reset();
  }
}

function reset() {
  player.health = 100;
  enemies = [];
}

function setup() {
  spawnEnemies();
}

function loop() {
  if (gameHasStarted) {
    checkEndGame();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    player.update();

    updateEnemies();
  }

  requestAnimationFrame(loop);
}

loop();
