var Outside, OutsideIMG
var  Start1,Start2, StartIMG1,StartIMG2
var GameState = "Start"
var playbutton, Play
var bk
var burglarAnimation, burglar, buglarIMG
var trashIMG, obstacle
var cartIMG
var obstacleGroup
var gameOverIMG, gameOver
var restart, restartIMG
function preload(){
  OutsideIMG=loadImage("Images/outside.jpeg")
  cartIMG= loadImage("Images/Cart.png")
  trashIMG= loadImage("Images/TrashBin.png")
  StartIMG1=loadImage("Images/Store BG.jpeg")
  StartIMG2=loadImage("Images/OutsideBg.png")
  restartIMG=loadImage("Images/restart.png")
  gameOverIMG=loadImage("Images/gameover.png")
  playbutton=loadImage("Images/play button.jpeg")
  burglarAnimation=loadAnimation("Images/Burglar Animation/1.gif","Images/Burglar Animation/5.gif","Images/Burglar Animation/10.gif","Images/Burglar Animation/15.gif","Images/Burglar Animation/20.gif")
  burglarIMG = loadAnimation("Images/Burglar Animation/22.gif")
}

function setup() {
  createCanvas(2000,800);
  bk= createSprite(1000,400,2000,800)
  //bk.shapeColor="black"

  
  Start1=createSprite(400,400,1000,800)
  Start1.shapeColor="blue"
  Start1.addImage(StartIMG1)
  Start1.scale=1.69

  Start2=createSprite(3300,400,1000,800)
  Start2.shapeColor="red"
  Start2.addImage(StartIMG2)
  Start2.scale=3

  restart=createSprite(1000,600,10,10)
  restart.addImage(restartIMG)
  restart.scale=0.1
  
  gameOver=createSprite(1000,400,10,10)
  gameOver.addImage(gameOverIMG)
  gameOver.scale=0.5

  Play=createSprite(950,500,60,40)
  Play.addImage(playbutton)
  Play.scale=0.5
  Play.visible=true

  invisibleGround = createSprite(1000,850,2000,10);
  invisibleGround.visible = false;

  burglar=createSprite(950,300,10,10)
  burglar.addAnimation("standing", burglarIMG)
  burglar.addAnimation("running", burglarAnimation)
  burglar.scale=0.60
  burglar.setCollider("rectangle",0,0,200,545)
  burglar.debug= false

  obstacleGroup = new Group()

}

function draw() {
background("black")
burglar.collide(invisibleGround)
   drawSprites();
   if(GameState==="Start"){
    textSize(60)
    fill("Black")
     text("Press SPACE to play",700, 650)
     burglar.changeAnimation("standing",burglarIMG)
     restart.visible=false
      gameOver.visible=false
    if(keyDown("Space")){
      Play.visible=false
      
    
      GameState="Play"   
    }
   }
   if(GameState==="Play"){
    restart.visible=false
    gameOver.visible=false
     if(keyDown("Space" )){
       burglar.velocityY=-9
    }
    burglar.velocityY=burglar.velocityY+0.7
    burglar.changeAnimation("running",burglarAnimation)

     Start2.scale=3.5
      Start1.velocityX=-9
      Start2.velocityX=-9
     if(Start2.x< 0 ){
      Start2.x=Start2.width/2+100
      
     }
     spawnObstacles();
     if(burglar.isTouching(obstacleGroup)){
       GameState = "End"
     }
   }
   if(GameState === "End"){
     obstacleGroup.setVelocityXEach(0)
     Start1.velocityX=0
      Start2.velocityX=0
     restart.visible=true
     gameOver.visible=true
     burglar.changeAnimation("standing", burglarIMG)
     obstacleGroup.setLifetimeEach(-1)
   }
}

function spawnObstacles(){
if(frameCount%130 == 0){
  obstacle = createSprite (2000,700,10,10)
  obstacle.velocityX= -9
  obstacle.lifetime = 222
  var num = Math.round(random(1,2))
  switch(num){
    case 1: obstacle.addImage(trashIMG)
    obstacle.scale= 0.3
    break;
    case 2: obstacle.addImage(cartIMG)
    obstacle.scale= 0.05
    break;
    default: break;
  }
  obstacleGroup.add(obstacle)
  
}
}

