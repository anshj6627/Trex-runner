var trex_running, groundImage, cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, trexCollideImage, gameOverImage, restartImage;
var trex, ground, invisibleGround, cloud, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, gameOver, restart, cloudGroup, obstacleGroup;
var gameState = "play";
var invisibleGround;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexCollideImage = loadImage("trexCollide.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 400);
  trex = createSprite(50, 360, 20, 20);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.45;
  ground = createSprite(300, 380, 20, 20);
  ground.addImage("gr", groundImage);
  invisibleGround = createSprite(300, 385, 600, 5);
  invisibleGround.visible = false;
  ground.x = ground.width / 2;
  restart = createSprite(200, 200, 10, 10);
  restart.addImage("res", restartImage);
  restart.scale=0.5;
  gameOver = createSprite(200, 300, 20, 20);
  gameOver.addImage("game", gameOverImage);
  gameOver.scale=0.6;
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");

  if (gameState == "play") {
      

    ground.velocityX = -3;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    spawnClouds();
    obstacle();
    if (keyDown("space") && trex.y > 320) {
      trex.velocityY = -12;
    }
    trex.velocityY = trex.velocityY + 1;
    gameOver.visible=false;
    restart.visible=false;
  }
  if(trex.isTouching(obstacleGroup)){
  gameState="end";
  }
  trex.collide(invisibleGround);
if(gameState=="end"){
  trex.addImage("running",trexCollideImage);

cloudGroup.destroyEach();
obstacleGroup.destroyEach();
gameOver.visible=true;
restart.visible=true;
  ground.velocityX=0;
} 
  if(mousePressedOver(restart)){
  gameState="play";
    trex.addAnimation("running",trex_running);
  }
  drawSprites();

}

function spawnClouds() {
  if (World.frameCount % 80 == 0) {
    cloud = createSprite(595, Math.round(random(180, 250)), 20, 20);
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.6;
    cloud.lifetime = 600 / 3;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.velocityX = -3;
    cloudGroup.add(cloud);
  }
}

function obstacle() {
  if (World.frameCount % 80 == 0) {
    var obstacle;
    obstacle = createSprite(595, 355, 20, 20);
    var rand = Math.round(random(1, 6));
    if (rand == 1) {
      obstacle.addImage("a", obstacle1);
    } else if (rand == 2) {
      obstacle.addImage("a", obstacle2);
    } else if (rand == 3) {
      obstacle.addImage("a", obstacle3);
    } else if (rand == 4) {
      obstacle.addImage("a", obstacle4);
    } else if (rand == 5) {
      obstacle.addImage("a", obstacle5);
    } else if (rand == 6) {
      obstacle.addImage("a", obstacle6);
    }
    obstacle.lifetime = 200;
    obstacle.velocityX = -3;
    obstacle.scale = 0.5;
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    obstacleGroup.add(obstacle);
  }

}