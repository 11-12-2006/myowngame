var PLAY = 1;
var END = 0;
var Over=2;
var gameState = PLAY;


var girl, girlRunning, girlCollided;
var ground;

var obstaclesGroup;

var score = 0;
var gameOverImg,restartImg,endImage,end,flag,flagImage, sweetImg, treeImg, fortImg, obstacle2Img;
var jumpSound , checkPointSound, dieSound, bgSound;

function preload(){
  //loading animations for girl
  girlRunning = loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png","girl5.png","girl6.png","girl7.png","girl8.png","girl9.png");
  girlCollided = loadAnimation("girl13col.png","girl14col.png");
  
  treeImg= loadImage('image/tree.png')
  bgImg= loadImage("bg.jpg")
  
  obstacle1Img = loadAnimation("obstacle1.png");
  obstacle2Img=loadAnimation("obstacle2.png");
  obstacle3Img=loadAnimation("obstacle3.png");

  restartImg = loadImage("image/reset.png");
  gameOverImg = loadAnimation("image/over.gif");
  endImage=loadAnimation("image/end.gif");
  fortImage = loadImage("image/fort.png")
  sweet1Img= loadImage("s1.png")
  sweet2Img= loadImage("s2.png")
  sweet3Img= loadImage("s3.png")
  sweet4Img= loadImage("s4.png")
  sweet5Img= loadImage("s5.png")
  sweet6Img= loadImage("s6.png")
  sweet7Img= loadImage("s7.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("gameover.mp3")
  checkPointSound = loadSound("gamend.mp3")
  bgSound= loadSound("bgSound.mp3")

}

function setup() {
  createCanvas(1280,575);
  // creating girl 
  girl = createSprite(100,220,10,10);
  girl.addAnimation("running", girlRunning);
  girl.addAnimation("collided", girlCollided);
  girl.setCollider("rectangle",0,0,150,250);
  girl.scale =1;
 

  ground = createSprite(width/2,height-20,width*100,10);
  ground.visible= false;
  
  gameOver = createSprite(width/2-50,height/2,200,200);
  gameOver.addAnimation("Over",gameOverImg);
  gameOver.scale = 1;
  
  restart = createSprite(camera.position.x -100,100);
  restart.addImage(restartImg);
  restart.debug = false;
  restart.scale = 0.5;
  
  end = createSprite(600,200);
  end.addAnimation("the end",endImage);
  end.scale=1.5;

  fort = createSprite(10000,250);
  fort.addImage(fortImage);
  fort.scale=1;
  
  bgSound.loop()


  obstaclesGroup = createGroup();
 sweetGroup = createGroup();
  
  score = 0;

 
}

function draw() {
  
  background(bgImg);  

  camera.position.x = girl.x;

  console.log(girl.x);

 ground.x=camera.position.x;
  ground.x=camera.position.x;



  end.x=camera.position.x;
  restart.x=camera.position.x-500;
  gameOver.x=camera.position.x-25;

  //displaying score
  fill("white")
  textFont("copperplate gothic");
  textSize(25);
  text("YOUR SCORE: "+ score,camera.position.x-350,28);

  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    end.visible=false;

    //scoring
    score = score + Math.round(getFrameRate()/160);
    
  
    

    //jump when the space key is pressed
    if(keyDown("UP_ARROW")) {
      girl.velocityY = -20;
        jumpSound.play();
    }

    if(keyDown("RIGHT_ARROW")){
      girl.x= girl.x+20;
     
     
    }
    camera.x=girl.x
    //add gravity
    girl.velocityY = girl.velocityY + 1.5
  
    //spawn the sweet
    spawnsweet();
  
    if(sweetGroup.isTouching(girl)){
      score=score+5
      sweetGroup.destroyEach()
    }

    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(girl)){
        
        gameState = END;
        dieSound.play();
    }

    if(girl.x>9990){
      gameState=Over;
      checkPointSound.play()
    }

  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     girl.changeAnimation("collided", girlCollided);
    girl.scale=0.5
     girl.velocityY = 0
     girl.velocityX=0;
      ground.velocityX=0;
     
    
    obstaclesGroup.setLifetimeEach(-1);
    sweetGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     sweetGroup.setVelocityXEach(0); 

   }else if(gameState===Over){
   
    obstaclesGroup.destroyEach();
    sweetGroup.destroyEach();
    girl.destroy();
    fort.destroy();
    end.visible=true;
    bgSound.stop()
   }

   

  girl.collide(ground);
  
  if(mousePressedOver(restart)) {
      reset();
    }


    drawSprites();    
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  sweetGroup.destroyEach();
  girl.changeAnimation("running",girlRunning);
  score=0;
  girl.x=0;
  girl.scale=0.5

}


function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(camera.position.x +800,410,10,40);
   obstacle.velocityX =0;
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("obstacle1f",obstacle1Img);
              obstacle.scale = 0.4;
              break;
      case 2: obstacle.addAnimation("obstacle21",obstacle2Img);
              obstacle.scale=1.5
              break;
      
      default: break;
    }
   
         
    
    obstacle.lifetime = 800;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnsweet() {
  //write code here to spawn the sweet and trees
  if (frameCount % 160 === 0) {
    var sweet = createSprite(camera.position.x+Math.round(random(850,1000)),350,40,10);
   
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: sweet.addImage(sweet1Img);
              sweet.scale = 0.5;
              break;
      case 2: sweet.addImage(sweet2Img)
             sweet.scale= 0.93
              break;
      case 3: sweet.addImage(sweet3Img);
              sweet.scale = 0.5;
              break;
      case 4: sweet.addImage(sweet4Img);
              sweet.scale = 0.5;
              break;
      case 5: sweet.addImage(sweet5Img);
              sweet.scale = 0.5;
              break;
      case 6: sweet.addImage(sweet6Img);
              sweet.scale = 0.5;
              break;
      case 7: sweet.addImage(sweet7Img);
              sweet.scale = 0.5;
              break;
      
      default: break;
    }
    
    sweet.velocityX = 0;
    
    
    //adjust the depth
    sweet.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group
    sweetGroup.add(sweet);
  }
}

