/* window.addEventListener("resize", () => {
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  console.log(w, h);
}); */
//import { size } from "./module/size";

let app = {};
let player;
let keys = {};
let bullets = [];
let bulletSpeed = 2;
let enemy;

window.onload = function () {
  app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true,
    backgroundColor: 0xaaaaab,
  });

  document.getElementById("gameDiv").appendChild(app.view);

  app.loader.baseUrl = "image";
  app.loader.add("player", "sample.png").add("bColor", "loc0.png");
  app.loader.onProgress.add(showProgress);
  app.loader.onComplete.add(doneLoading);
  app.loader.onError.add(reportError);
  app.loader.load();

  app.stage.interactive = true;
  app.stage.on("pointerdown", fireBall);

  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);

  app.ticker.add(gameLoop);
};

function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

const fireBall = (e) => {
  // let pos = e.data.global;
  // player.scale.x = 0.5;
  //player.scale.y = 0.5;
  // player.rotation = 1.1;
  /// player.x = pos.x;
  // player.y = pos.y;

  let bullet = createBullet();
  bullets.push(bullet);
};

function createBullet() {
  let bullet = new PIXI.Sprite.from("image/bullet.png");
  bullet.anchor.set(0.5);
  bullet.x = player.x;
  bullet.y = player.y - 40;
  bullet.speed = bulletSpeed;
  app.stage.addChild(bullet);

  return bullet;
}
a;

function gameLoop() {
  if (keys["87"]) {
    if (player.y >= 5) {
      player.y -= 5;
    }
  }

  if (keys["65"]) {
    if (player.x >= 5) {
      player.x -= 5;
    }
  }

  if (keys["83"]) {
    if (player.y <= 595) {
      player.y += 5;
    }
  }

  if (keys["68"]) {
    if (player.x <= 795) {
      player.x += 5;
    }
  }
  updateBullet();
}

function updateBullet() {
  bullets.forEach((bullet) => {
    bullet.position.y -= bullet.speed;
    if (bullet.position.y < 0) {
      bullet.dead = true;
    }
  });
  bullets.forEach((bullet, index) => {
    if (bullet.dead) {
      app.stage.removeChild(bullet);
      bullets.splice(index, 1);
    }
  });
}

function showProgress(e) {
  console.log(e.progress);
}

function doneLoading(e) {
  let bColor = new PIXI.Sprite.from(app.loader.resources.bColor.texture);
  player = new PIXI.Sprite.from(app.loader.resources.player.texture);
  player.anchor.set(0.5);
  player.scale.x = 0.6;
  player.scale.y = 0.6;
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;

  app.stage.addChild(bColor);
  app.stage.addChild(player);
}

function reportError(e) {
  console.log("error:" + e.message);
}
