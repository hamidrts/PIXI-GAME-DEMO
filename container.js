let mainScreen;
let endScreen;
let titleScreen;
let app = {};

window.onload = function () {
  app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true,
    backgroundColor: 0xaaaaab,
  });

  document.getElementById("gameDiv").appendChild(app.view);
  window.addEventListener("keyup", (e) => {
    console.log(e);
    if (e.key == 1) {
      titleScreen.visible = true;
      mainScreen.visible = false;
      endScreen.visible = false;
    }
    if (e.key == 2) {
      titleScreen.visible = false;
      mainScreen.visible = true;
      endScreen.visible = false;
    }
    if (e.key == 3) {
      titleScreen.visible = false;
      mainScreen.visible = false;
      endScreen.visible = true;
    }
  });
  mainScreen = new PIXI.Container();
  endScreen = new PIXI.Container();
  titleScreen = new PIXI.Container();

  mainScreen.visible = false;
  endScreen.visible = false;
  endScreen.interactive = true;
  endScreen.buttonMode = true;
  endScreen.on("click", (e) => {
    console.log(e);
    e.target.tint = 0xff0000;
  });

  app.stage.addChild(titleScreen);
  app.stage.addChild(mainScreen);
  app.stage.addChild(endScreen);

  let redRact = new PIXI.Graphics();
  redRact.beginFill(0xff0000);
  redRact.drawRect(0, 0, app.view.width, app.view.height);
  titleScreen.addChild(redRact);

  let text = new PIXI.Text("Title Screen");
  text.anchor.set(0.5);
  text.x = app.view.width / 2;
  text.y = app.view.height / 2;

  text.style = new PIXI.TextStyle({
    fill: 0x000000,
    fontSize: 40,
    fontFamily: "Arial",
    fontStyle: "bold",
    stroke: 0xffffff,
    strokeThickness: 3,
  });

  titleScreen.addChild(text);

  let bluRact = new PIXI.Graphics();
  bluRact.beginFill(0x00ff00);
  bluRact.drawRect(0, 0, app.view.width, app.view.height);
  mainScreen.addChild(bluRact);

  let text1 = new PIXI.Text("Main Screen");
  text1.anchor.set(0.5);
  text1.x = app.view.width / 2;
  text1.y = app.view.height / 2;

  text1.style = new PIXI.TextStyle({
    fill: 0x000000,
    fontSize: 40,
    fontFamily: "Arial",
    fontStyle: "bold",
    stroke: 0xffffff,
    strokeThickness: 3,
  });

  mainScreen.addChild(text1);

  let greenRact = new PIXI.Graphics();
  greenRact.beginFill(0x00ff00);
  greenRact.drawRect(0, 0, app.view.width, app.view.height);
  endScreen.addChild(greenRact);

  let text2 = new PIXI.Text("End Screen");
  text2.anchor.set(0.5);
  text2.x = app.view.width / 2;
  text2.y = app.view.height / 2;

  text2.style = new PIXI.TextStyle({
    fill: 0x000000,
    fontSize: 40,
    fontFamily: "Arial",
    fontStyle: "bold",
    stroke: 0xffffff,
    strokeThickness: 3,
  });

  endScreen.addChild(text2);
};
