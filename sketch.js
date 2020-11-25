const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
 
var particles = [];
var plinkos = [];
var divisions = [];

var particle;

var divisionHeight=300;
var score =0;
var gameState = "start";
var turn = 0;


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50){    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50){    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50){    
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background("black");
  textSize(20);
  fill("white");
  text("Score : " +score,20,30);

  textSize(35);
  text("500", 10,530);
  text("500", 90,530);
  text("500", 170,530);
  text("500", 250,530);
  text("100", 330,530);
  text("100", 410,530);
  text("100", 490,530);
  text("200", 570,530);
  text("200", 650,530);
  text("200", 730,530);
  Engine.update(engine);

  if(gameState === "end"){
    fill("yellow");
    textSize(90);
    text("GameOver", 150, 250);
  }

  for (var i = 0; i < plinkos.length; i++) {     
     plinkos[i].display();
     
   }
    
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>760)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  if ( turn>= 5) gameState ="end";                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;
                    particle=null;
                    if ( turn>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    if ( turn>= 5)  gameState ="end";

              }      
              
        }
  
      }


  }

function mousePressed() {
  if (gameState !== "end"){
     turn++;
     particle = new Particle(mouseX ,10, 10, 10);
  }
}