  var tower, towerImg;
  var ghost, ghostImg;
  var door, doorImg;
  var climber, climberImg;
  var block;
  var spookySound;
  var doorG, climberG, blockG;
  var Gamestate= "play";


function preload(){
  
  towerImg=loadImage("tower.png");
  ghostImg=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600)

  tower=createSprite(300,300,20,20);
  tower.addImage(towerImg);
  tower.velocityY=3;

  ghost=createSprite(300,300,20,20);
  ghost.addAnimation("running",ghostImg);
  ghost.scale=0.4;


  doorG=new Group();
  climberG=new Group(); 
  blockG=new Group();
  
}

function draw(){
  background(0)
  
  if(Gamestate==="play"){
    
  if(keyDown("SPACE")){
    ghost.velocityY=-8;
  }
    
  ghost.velocityY= ghost.velocityY+0.8;

  if(tower.y>600){
    tower.y=300;
  }

  if(keyDown("LEFT_ARROW")){
   ghost.x=ghost.x-20; 
  }

  if(keyDown("RIGHT_ARROW")){
   ghost.x=ghost.x+20; 
  }
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY=0; 
    }
    
  if(blockG.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    Gamestate="end";
    }
  
  drawSprites();
  
  spawnDoor();
 }
  
  if(Gamestate==="end"){
    textSize(50);
    fill("Yellow");
    stroke("red");
    textFont("Captain Canaveral")
    text("GAME OVER", 150,50);
    
    
    }
}

function spawnDoor(){
  if(World.frameCount % 240 === 0){
    door = createSprite(200,100,20,20);
    door.addImage(doorImg);
    
    
    climber= createSprite(200,150,20,20);
    climber.addImage(climberImg);
    
    block= createSprite(200,160,climber.width,10);
    block.debug=true;
    
    door.velocityY=1;
    climber.velocityY=1;
    block.velocityY=1;
    
    door.x=Math.round(random(200,450));
    climber.x=door.x;
    block.x=door.x;
    
    climber.depth=door.depth;
    block.depth=door.depth;
    ghost.depth=door.depth+1;
    
    door.lifetime=600;
    climber.lifetime=door.lifetime;
    block.lifetime=600;
    
    doorG.add(door);
    climberG.add(climber);
    blockG.add(block);
    
  }
}