let app = {};
let gameScreen;
let dialogueScreen;
let titleScreen;
let titleScreenBackground;
let playButton;
let quitButton;
let test;
let boardContainer;
let scoreContainer;

class Locations {
  constructor(position, texture) {
    this.position = position;
    this.residents = [];
    this.sprite = {};
    this.texture = texture;
  }
}

class Person {
  constructor(name, texture, position) {
    this.name = name;
    this.position = position;
    this.location = "";
    this.texture = texture;
    this.sprite = {};
  }
}

let aquariumIcon = new Locations(
  [429, 200],
  "assets/TitleScreenAssets/AquariumIcon.png"
);
let beachIcon = new Locations(
  [192, 70],
  "assets/TitleScreenAssets/BeachIcon.png"
);
let cafeIcon = new Locations(
  [301, 463],
  "assets/TitleScreenAssets/CafeIcon.png"
);
let childrenHospitalIcon = new Locations(
  [260, 722],
  "assets/TitleScreenAssets/ChildrenHospitalIcon.png"
);
let coffeeShopIcon = new Locations(
  [377, 589],
  "assets/TitleScreenAssets/CoffeeShopIcon.png"
);
let fashionShowIcon = new Locations(
  [480, 530],
  "assets/TitleScreenAssets/FashionShowIcon.png"
);
let hikingTrailIcon = new Locations(
  [600, 670],
  "assets/TitleScreenAssets/HikingTrailIcon.png"
);
let homelessShelterIcon = new Locations(
  [600, 480],
  "assets/TitleScreenAssets/HomelessShelterIcon.png"
);
let loungeIcon = new Locations(
  [620, 330],
  "assets/TitleScreenAssets/LoungeIcon.png"
);
let officeIcon = new Locations(
  [228, 313],
  "assets/TitleScreenAssets/OfficeIcon.png"
);
let petShelterIcon = new Locations(
  [680, 150],
  "assets/TitleScreenAssets/ZooIcon.png"
);
let restaurantIcon = new Locations(
  [550, 180],
  "assets/TitleScreenAssets/RestaurantIcon.png"
);
let conjunction = new Locations(
  [450, 400],
  "assets/TitleScreenAssets/FashionShowIcon.png"
);

let jenPresent = new Person(
  "Jen",
  "assets/TitleScreenAssets/JenPresent.png",
  [3, 0]
);
let jPPresent = new Person(
  "JP",
  "assets/TitleScreenAssets/JPPresent.png",
  [4, 1]
);
let sharrelPresent = new Person(
  "Sharrel",
  "assets/TitleScreenAssets/SharrelPresent.png",
  [2, 2]
);
let rock = new Person("Rock", "assets/TitleScreenAssets/rock.png", [0, 1]);
let moneyBar0 = {};
let kdeMap = {};

let gameObject = {
  locations: {
    loops: [
      [aquariumIcon, beachIcon, officeIcon],
      [cafeIcon, childrenHospitalIcon, coffeeShopIcon],
      [fashionShowIcon, hikingTrailIcon, homelessShelterIcon],
      [loungeIcon, petShelterIcon, restaurantIcon],
    ],
    conjunction: conjunction,
  },
  backgrond: { texture: "assets/TitleScreenAssets/KDEMap.png" },
  scoreBoard: {
    text: [
      { name: "Goal:130000", position: [2, 1] },
      { name: "Turn Left:", position: [3, 7] },
      { name: "Move Left:", position: [3, 8] },
      { name: "Donors", position: [3, 10] },
    ],
  },
  donors: [jenPresent, jPPresent, sharrelPresent],
};

window.addEventListener("resize", () => {
  // app.view.width = window.innerWidth;
  // app.view.height = window.innerHeight;
});

window.onload = function () {
  app = new PIXI.Application({
    //resizeTo: window,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    antialias: true,
    // resolution: window.devicePixelRatio || 0.5,
    backgroundColor: 0xaaaaab,
  });
  document.getElementById("gameDiv").appendChild(app.view);

  app.loader.baseUrl = "assets/TitleScreenAssets";
  app.loader
    .add("titleScreenBackground", "KDE-TItleScreen.png")
    .add("playButton", "play_button1.png")
    .add("quitButton", "Quit_button.png")
    .add("aquariumIcon", "AquariumIcon.png")
    .add("beachIcon", "BeachIcon.png")
    .add("cafeIcon", "CafeIcon.png")
    .add("childrenHospitalIcon", "ChildrenHospitalIcon.png")
    .add("coffeeShopIcon", "CoffeeShopIcon.png")
    .add("fashionShowIcon", "FashionShowIcon.png")
    .add("hikingTrailIcon", "HikingTrailIcon.png")
    .add("homelessShelterIcon", "HomelessShelterIcon.png")
    .add("loungeIcon", "LoungeIcon.png")
    .add("officeIcon", "OfficeIcon.png")
    .add("petShelterIcon", "PetShelterIcon.png")
    .add("restaurantIcon", "RestaurantIcon.png")
    .add("JenPresent", "JenPresent.png")
    .add("JPPresent", "JPPresent.png")
    .add("SharrelPresent", "SharrelPresent.png")
    .add("rock", "rock.png")
    .add("MoneyBar0", "MoneyBar0.png")
    .add("KDEMap", "KDEMap.png");

  app.loader.onComplete.add(finishLoading);
  app.loader.load();
};

function finishLoading() {
  createTitleScreen();
  createGameScreen();
  //dialogueScreen = new PIXI.Container();

  //app.stage.addChild(dialogueScreen);

  gameScreen.visible = false;
  // titleScreen.visible = false;
  //dialogueScreen.visible = false;
}

function createTitleScreen() {
  titleScreen = new PIXI.Container();
  app.stage.addChild(titleScreen);
  titleScreenBackground = new PIXI.Sprite.from(
    app.loader.resources.titleScreenBackground.texture
  );

  playButton = new PIXI.Sprite.from(app.loader.resources.playButton.texture);

  quitButton = new PIXI.Sprite.from(app.loader.resources.quitButton.texture);
  titleScreen.addChild(titleScreenBackground);
  titleScreen.addChild(playButton);
  titleScreen.addChild(quitButton);

  titleScreenBackground.anchor.set(0.5);
  titleScreenBackground.x = app.view.width / 2;
  titleScreenBackground.y = app.view.height / 2;

  playButton.anchor.set(0.5);
  playButton.x = app.view.width / 4;
  playButton.y = app.view.height / 1.5;
  playButton.interactive = true;
  playButton.buttonMode = true;

  playButton.on("pointerdown", (e) => {
    gameScreen.visible = true;
    titleScreen.visible = false;
  });

  playButton.on("pointerover", (e) => {
    playButton.scale.x = 1.5;
    playButton.scale.y = 1.5;
  });

  playButton.on("pointerout", (e) => {
    playButton.scale.x = 1;
    playButton.scale.y = 1;
  });

  quitButton.anchor.set(0.5);
  quitButton.x = app.view.width / 1.25;
  quitButton.y = app.view.height / 1.5;
}

function createGameScreen() {
  gameScreen = new PIXI.Container();
  app.stage.addChild(gameScreen);

  createBoardContainer();

  createScoreContainer();
}

function createBoardContainer() {
  boardContainer = new PIXI.Container();
  gameObject.backgrond.sprite = new PIXI.Sprite.from(
    gameObject.backgrond.texture
  );
  boardContainer.addChild(gameObject.backgrond.sprite);
  gameObject.locations.loops.forEach((loop) => {
    loop.forEach((location) => {
      location.sprite = new PIXI.Sprite.from(location.texture);
      location.sprite.x = location.position[0];
      location.sprite.y = location.position[1];
      location.sprite.anchor.set(0.5);
      location.sprite.scale.x = 0.3;
      location.sprite.scale.y = 0.3;
      boardContainer.addChild(location.sprite);
    });
  });
  gameScreen.addChild(boardContainer);
}

function createScoreContainer() {
  scoreContainer = new PIXI.Container();
  scoreContainer.x = gameScreen.width;
  let greenRact = new PIXI.Graphics();
  greenRact.beginFill(0x073719);
  greenRact.drawRect(0, 0, gameScreen.width / 3, gameScreen.height);
  scoreContainer.addChild(greenRact);
  gameScreen.addChild(scoreContainer);

  gameObject.scoreBoard.text.forEach((item) => {
    let text = new PIXI.Text(item.name);
    text.anchor.set(0.5);
    text.x = scoreContainer.width / item.position[0];
    text.y = (scoreContainer.height / 26) * item.position[1];

    text.style = new PIXI.TextStyle({
      fill: 0xffffff,
      fontSize: 16,
      fontFamily: "Arial",
      fontStyle: "bold",
      //stroke: 0xffffff,
      //strokeThickness: 6,
    });
    scoreContainer.addChild(text);
  });

  let scoreBar = new PIXI.Sprite.from("assets/TitleScreenAssets/MoneyBar0.png");
  scoreBar.anchor.set(0.5);
  scoreBar.x = scoreContainer.width / 2;
  scoreBar.y = (scoreContainer.height / 26) * 3;
  scoreBar.scale.x = 0.2;
  scoreBar.scale.y = 0.2;
  scoreContainer.addChild(scoreBar);

  let seasonBar = new PIXI.Sprite.from("assets/ui/TurnTimerFall.png");
  seasonBar.anchor.set(0.5);
  seasonBar.x = scoreContainer.width / 2;
  seasonBar.y = (scoreContainer.height / 26) * 6;
  seasonBar.scale.x = 0.4;
  seasonBar.scale.y = 0.4;
  scoreContainer.addChild(seasonBar);

  gameObject.donors.forEach((donor, index) => {
    gameObject.donors.sprite = new PIXI.Sprite.from(donor.texture);
    gameObject.donors.sprite.anchor.set(0.5);
    gameObject.donors.sprite.x = scoreContainer.width / 6;
    gameObject.donors.sprite.y =
      (scoreContainer.height / 26) * (index * 2.5 + 12);
    gameObject.donors.sprite.scale.x = 0.25;
    gameObject.donors.sprite.scale.y = 0.25;
    scoreContainer.addChild(gameObject.donors.sprite);

    gameObject.donors.scoreBar = new PIXI.Sprite.from(
      "assets/TitleScreenAssets/MoneyBar0.png"
    );
    gameObject.donors.scoreBar.anchor.set(0.5);
    gameObject.donors.scoreBar.x = scoreContainer.width / 1.7;
    gameObject.donors.scoreBar.y =
      (scoreContainer.height / 26) * (index * 2.5 + 12);
    gameObject.donors.scoreBar.scale.x = 0.2;
    gameObject.donors.scoreBar.scale.y = 0.2;
    scoreContainer.addChild(gameObject.donors.scoreBar);
  });

  gameLoop();
}

function gameLoop() {
  rock.sprite = new PIXI.Sprite.from(rock.texture);
  rock.sprite.anchor.set(0.5);
  rock.sprite.x =
    gameObject.locations.loops[rock.position[0]][rock.position[1]].position[0] +
    30;
  rock.sprite.y =
    gameObject.locations.loops[rock.position[0]][rock.position[1]].position[1];
  rock.sprite.scale.x = 0.06;
  rock.sprite.scale.y = 0.06;
  boardContainer.addChild(rock.sprite);

  if (rock.position[1] < 2) {
    console.log(
      gameObject.locations.loops[rock.position[0]][rock.position[1] + 1].sprite
    );
    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.interactive = true;
    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.buttonMode = true;

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.scale.x = 0.6;

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.scale.y = 0.6;

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.tint = 0x00ff00;

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.on("pointerdown", (e) => {});

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.on("pointerover", (e) => {
      e.target.scale.x = 0.8;
      e.target.scale.y = 0.8;
    });

    gameObject.locations.loops[rock.position[0]][
      rock.position[1] + 1
    ].sprite.on("pointerout", (e) => {
      gameObject.locations.loops[rock.position[0]][
        rock.position[1] + 1
      ].sprite.scale.x = 0.6;
      gameObject.locations.loops[rock.position[0]][
        rock.position[1] + 1
      ].sprite.scale.y = 0.6;
    });
  }
}
