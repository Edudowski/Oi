//Escorpo Global

var groundImage;

var invisibleGround;

var GrupoNuvem,Nuvem;

var trex ,trex_running,trex_collided;

var Cacto;

var GrupoCacto,Cacto1,Cacto2,Cacto3,Cacto4,Cacto5,Cacto6;

var pontos = 0;

var PLAY =1;
var END =0;
var gameState = PLAY;

var GameOvo,GameOvoImagem;

var Restart,RestartImagem;

var dieSound, jumpSound,checkPointSound

var topEdge,leftEdge,rightEdge




function preload(){
  Nuvem=loadImage("cloud.png")
  
trex_running=loadAnimation ("trex1.png","trex3.png","trex4.png") 
trex_collided = loadAnimation("trex_collided.png");
groundImage =loadImage("ground2.png")
Cacto1=loadImage("obstacle1.png")
Cacto2=loadImage("obstacle2.png")
Cacto3=loadImage("obstacle3.png")
Cacto4=loadImage("obstacle4.png")
Cacto5=loadImage("obstacle5.png")
Cacto6=loadImage("obstacle6.png")
GameOvoImagem =loadImage("gameOver.png")
RestartImagem =loadImage("restart.png")

dieSound=loadSound("die.mp3")
jumpSound=loadSound("jump.mp3")
checkPointSound=loadSound("checkpoint.mp3")


}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crie um sprite de trex
trex=createSprite (120,160,20,20)
trex.scale = 0.7
ground=createSprite (0,185,400,50)
trex.addAnimation("running_trex",trex_running)
ground.addImage(groundImage);
trex.addAnimation("collided", trex_collided)
invisibleGround=createSprite (100,195,1550,5)
invisibleGround.visible= false
topEdge=createSprite(0,0,1500,10)
leftEdge=createSprite(0,invisibleGround.y-100,10,190)
rightEdge=createSprite(width,invisibleGround.y-100,10,190)


GrupoCacto = new Group();
GrupoNuvem = new Group ();

GameOvo=createSprite(300,100);
GameOvo.addImage(GameOvoImagem)
GameOvo.scale=0.8

Restart=createSprite(300,150);
Restart.addImage(RestartImagem)
Restart.scale=0.9


}


function draw(){
  background("220")
  drawSprites()
 
  
if (gameState==PLAY){
  ground.velocityX=-11
Restart.visible=false
GameOvo.visible=false
 pontos= Math. round(pontos+getFrameRate()/50)
 
 gerarNuvem()
 gerarCacto()
 
 if (pontos % 300 === 0 && pontos > 0){
  checkPointSound.play()
 }
 
 trex.collide(topEdge)
 trex.collide(rightEdge)
 trex.collide(leftEdge)

 if ((keyDown("space") || touches.lenght > 0) && trex.y >height-150 ) {
  trex.velocityY=-12
  trex.velocityY=trex.velocityY+ 0.8
  jumpSound.play()
touches =[];
}

 if (keyDown("p") ) {
 pontos=pontos+100 

 }

  
  if (keyDown("f") ) {
    trex.velocityY=trex.velocityY-1.5
    
    }
  
  

  if (keyDown("d")) {
  trex.x=trex.x+5
    
  }
  if (keyDown("a")) {
    trex.x=trex.x-5
      
    }
  
    if (pontos > 1000) {
      Cacto.velocityX=-12
      ground.velocityX=-12
      }
       
      if (pontos > 2000) {
        Cacto.velocityX=-13
        ground.velocityX=-13  
      }
      
      
        if (pontos > 3000) {
          Cacto.velocityX=-14
          ground.velocityX=-14  
        }
      
          if (pontos > 4000) {
            Cacto.velocityX=-15
            ground.velocityX=-15 
          }
            
            
            if (pontos > 10000) {
              Cacto.velocityX=-18
              ground.velocityX=-18
            }
      
            if (pontos > 20000) {
              Cacto.velocityX=-21
              ground.velocityX=-21
            }
            
            if (pontos > 50000) {
              Cacto.velocityX=-30
              ground.velocityX=-30
            }
      
            if (pontos > 60000) {
              Cacto.velocityX=-40
              ground.velocityX=-40
            }      
            
            if (pontos > 70000) {
              Cacto.velocityX=-50
              ground.velocityX=-50
            }
      
            if (pontos > 80000) {
              Cacto.velocityX=-75
              ground.velocityX=-75
            }
      
            if (pontos > 90000) {
              Cacto.velocityX=-90
              ground.velocityX=-90
            }
  
            if (pontos > 100000) {
              Cacto.velocityX=-100
              ground.velocityX=-100
            }


if (GrupoCacto.isTouching(trex)){
  gameState = END; 
  dieSound.play()
}
topEdge.visible=false
leftEdge.visible=false
rightEdge.visible=false
 
 if (keyDown("c")){
  Cacto.destroy ()
    }




}







 
 

  
  
  trex.velocityY = trex.velocityY + 0.5
  if (ground.x < 0){
    ground.x =ground.width/2; 
  }

else if(gameState==END){
  ground.velocityX=0;
trex.changeAnimation("collided", trex_collided)

  GrupoCacto.setVelocityXEach(0);
GrupoNuvem.setVelocityXEach(0);

Restart.visible=true
GameOvo.visible=true

if(mousePressedOver(Restart)){
  reset();
 }


}



fill("blue"); 
 textSize(19);
  text("Pontos: " +pontos, 400,50 );
  
  jumpSound.setVolume(0.9)
   
   

  


      
 



      console.log (ground.x)



trex.collide (invisibleGround)


    }
  


function reset(){
  gameState= PLAY;
  GrupoCacto.destroyEach();
  GrupoNuvem.destroyEach();
  trex.changeAnimation("running_trex",trex_running)
  pontos=0
}

  function gerarNuvem(){
    if (frameCount % 80 == 0 ){
   cloud=createSprite(600,100,20,20)
   cloud.velocityX= -3
   cloud.addImage(Nuvem)
   cloud.y = Math.round(random(10,70,100,140))
   trex.depth=cloud.depth +1;
   cloud.lifetime=220;
   
   GrupoNuvem.add(cloud);
   
   }
   } 

   function gerarCacto(){
   if (frameCount % 100 == 0 ){
   Cacto = createSprite (width,invisibleGround.y-25,20,50)
   Cacto.velocityX= -11   
   Cacto.scale=0.9
 Cacto.lifetime=300
 
 GrupoCacto.add(Cacto);
 


   var rand =Math.round(random(1,6));
   switch(rand){
   case 1:Cacto.addImage(Cacto1)
   break;
   case 2:Cacto.addImage(Cacto2)
   break;
   case 3:Cacto.addImage(Cacto3)
   break;
   case 4:Cacto.addImage(Cacto4)
   break;
   case 5:Cacto.addImage(Cacto5)
   break;
   case 6:Cacto.addImage(Cacto6)
   break;
   }
  }
}