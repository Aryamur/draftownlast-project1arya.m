var nightImg, night;
var doorImg, door, doorsGroup;
var astroid,astroidImg,astroidG;
var climberImg, climber, climbersGroup;
var iron, ironImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  nightImg = loadImage("night.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ironImg = loadImage("iron.png");
  spookySound = loadSound("spooky.wav");
  astroidImg = loadImage("astroid.png");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  night = createSprite(300,300);
  night.addImage("night",nightImg);
  night.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  rockG=new Group(); 
  
  iron = createSprite(200,200,50,50);
  iron.scale = 0.3;
  iron.addImage("iron", ironImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      iron.x = iron.x - 3;
    }
    
    if(keyDown("right_arrow")){
      iron.x = iron.x + 3;
    }
    
    if(keyDown("space")){
      iron.velocityY = -10;
    }
    
    iron.velocityY = iron.velocityY + 0.8
    
    if(night.y > 400){
      night.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(iron)){
      iron.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(iron) || iron.y > 600){
      iron.destroy();
      gameState = "end"
    }


  

  
  
 

 spawnAstroid();
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    iron.depth = door.depth;
    iron.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);


    function spawnAstroid() {
      
      if (frameCount % 240 === 0) {
        var astroid = createSprite(200, -50);

        if(astroid.isTouching(iron)){
          iron.velocityY = 0|| iron.y > 600
          iron.destroy();
          gameState = "end"}
        
        
        
        astroid.x = Math.round(random(120,400));
        
        
        astroid.addImage(astroid);
        astroid.scale=0.2
        
        astroid.velocityY = 1;
        
        
       
       
        //assign lifetime to the variable
        astroid.lifetime = 800;
        
    
        
        
        astroidG.add(astroid);


  }
}
  }
}
