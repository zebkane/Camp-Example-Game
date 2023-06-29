const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

let pos = {
  x: 100,
  y: 100,
};

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

class Enemy {
  constructor() {
    this.pos = {
      x: 0,
      y: 0,
    };
    this.speed = 2;
  }

  move() {
    if (this.pos.x < pos.x) {
      this.pos.x += this.speed;
    }
  }

  draw() {
    ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
  }

  update() {
    this.move();
    this.draw();
  }
}

let enemy01 = new Enemy();

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(gollum, pos.x, pos.y, 50, 50);

  enemy01.update();

  if (keys.w == true) {
    pos.y = pos.y - 5;
  } else if (keys.a == true) {
    pos.x = pos.x - 5;
  } else if (keys.s == true) {
    pos.y = pos.y + 5;
  } else if (keys.d == true) {
    pos.x = pos.x + 5;
  }

  requestAnimationFrame(loop);
}

loop();
