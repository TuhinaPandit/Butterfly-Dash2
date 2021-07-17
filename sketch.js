/*
Butterfly Dash εϊз
~by Tuhina Pandit 

✩࿐

10/07/21
*/

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var butterfly, butterfly_flying, butterfly_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var bgImg;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  butterfly_flying =   loadAnimation("butterfly1.png","butterfly2.png","butterfly3.png");
  butterfly_collided = loadAnimation("butterfly_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  bgImg = loadImage("backgroundImg.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  
  butterfly = createSprite(50,180,20,50);
  
  butterfly.addAnimation("flying", butterfly_flying);
  butterfly.addAnimation("collided", butterfly_collided);
  butterfly.scale = 0.2;
  
  ground = createSprite(200,50,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.2;
  restart.scale = 0.015;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
    
  score = 0;
}

function draw() {
  //butterfly.debug = true;
  background(bgImg);
  
  text("Score: "+ score, 500,50);
  
  text("εϊз Butterfly Dash by Tuhina", 150,20);
  text("Use space to avoid obstacles ✩࿐", 150,40);
  text("have fun ❀", 150,60);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && butterfly.y >= 159) {
      butterfly.velocityY = -15;
    }
  
    butterfly.velocityY = butterfly.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    butterfly.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(butterfly)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    butterfly.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the butterfly animation
    butterfly.changeAnimation("collided",butterfly_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //code to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.06;
    cloud.velocityX = -3;
    
     //assigning lifetime to the variable
    cloud.lifetime = 200;
    
    //adjusting the depth
    cloud.depth = butterfly.depth;
    butterfly.depth = butterfly.depth + 1;
    
    //adding each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.08 ;
    obstacle.lifetime = 300;
    //adding obstacles to group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  butterfly.changeAnimation("flying",butterfly);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

//  ✩࿐