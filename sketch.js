//CREATE VARIABLES
var backgrnd, backgroundImg;
var ground;
var monkey, monkeyAni;
var bananaGroup, bananaImg;
var stoneGroup, stoneImg;
var score = 0;
var gameState = "tutorial";
var forest;
var arrowImg, arrowGroup;
var restart,showTutorial;

//PRELOAD FNC.
function preload() {
  backgroundImg = loadImage("images/jungle.jpg");
  monkeyAni = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");
  stoneImg = loadImage("images/stone.png");
  bananaImg = loadImage("images/banana.png");
  forest = loadSound("zapsplat_nature_forest_birds_wind_trees_leaves_falling_qld_australia_56740.mp3");
  arrowImg = loadImage("images/arrow0.png");
}

//SETUP FNC.
function setup() {
  //CREATE CANVAS
  createCanvas(windowWidth, windowHeight);
  
  //CREATE MONKEY
  monkey = createSprite(width / 12, height - 80, 20, 50);
  monkey.addAnimation("running", monkeyAni);
  monkey.scale = 0.2;
  monkey.setCollider("circle", 0, -80, 200)
  monkey.debug = false;

    //CREATE GROUND
  ground = createSprite(width / 2, height - 30, width*3, 10);
  ground.visible = false;
 

restart=createButton("RESTART");
    restart.position(width/4 , height / 15);
    restart.mousePressed(restartFnc);
    
    


  //CREATES GROUPS
  bananaGroup = new Group();
  stoneGroup = new Group();
  arrowGroup = new Group();
  //PLAYS SOUND
  forest.loop();
}

function draw() {
  //BACKGROUND COLOUR
  background(backgroundImg);
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE= " + score, monkey.x + 30, height / 15);
  //CALLS FNCS.
  spawnBanana();
  spawnStone();
  spawnArrow();
  
  //GAME STATES
  if (gameState === "tutorial") {
    stroke("white");
    textSize(20);
    fill("white");
    text("EAT THE BANANAS& avoid the obstacles", (width / 2) - 180, (height / 2) - 50);
    text("PRESS S TO START", (width / 2) - 100, height / 2);
    restart.hide();
    if (keyDown("s")) {
      gameState = "play";
    }
  } else if (gameState === "play") {

    
   restart.hide();
    
    monkey.velocityX = 5;
    ground.velocityX = 5;
    //camera.position.x=backgrnd.x;
    camera.position.x = monkey.x;

    if (keyDown("space") && monkey.y >= height / 1.3) {
      monkey.velocityY = -20;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      monkey.scale += 0.02;
      score += 2;
    }

    if (stoneGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
      stoneGroup.destroyEach();
      score -=2;
    }
    
    if (arrowGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
      arrowGroup.destroyEach();
      score --;
    }

    if (score < 0) {
      gameState = "end";
      
      bananaGroup.destroyEach();
stoneGroup.destroyEach();
arrowGroup.destroyEach();
    }
    
    drawSprites();



  } else if (gameState === "end") { 

    monkey.velocityX=0;
      ground.velocityX=0; 
    restart.show();
    
    
    
    
  }


}

//SPAWN BANANA FNC.
function spawnBanana() {
  var banana;
  if (frameCount % 200 === 0) {
    banana = createSprite(monkey.x + 350, random((height / 3.8, height / 2), 300), 10, 10);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.lifetime = width / 4;
    bananaGroup.add(banana);
  }

}

//SPAWN STONE FNC.
function spawnStone() {
  var stone;
  if (frameCount % 300 === 0) {
    stone = createSprite(monkey.x + 350, height - 30, 10, 10);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.lifetime = width / 4;
          stoneGroup.add(stone);
  }
}

function spawnArrow() {
   var arrow;
   if (frameCount % 250 === 0) {
     arrow = createSprite(monkey.x + 350, height - 35, 30, 10);
     arrow.addImage(arrowImg);
     arrow.scale=0.2;
    arrow.lifetime = width / 4;
          arrowGroup.add(arrow);
   }
}

function restartFnc(){
  gameState = "play";
      score = 0;
 
}
