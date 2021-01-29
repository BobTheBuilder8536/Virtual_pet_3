var dog, dogI, dogHI;
var bg;
var playing,washroom,sleeping,normal;
var database,food,time,gamestate,hourdata;
var foodLeft;
var currentState = 0;
var buttons;
var printTime;
var timeH,timeM, feedTime; 
var currentTime;
var databaseHour = 0;
var isClicked = false;

function preload(){
  dogI = loadImage("images/Dog.png");
  dogHI = loadImage("images/Happy.png");

  playing = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
  sleeping = loadImage("images/BedRoom.png");
  normal = loadImage("images/LivingRoom.png");
}

function setup() {  
	createCanvas(500,800);
  
  database = firebase.database();

  dog = createSprite(width - 260,460);
  dog.addImage("dogH",dogHI);
  dog.scale = 0.4;
  dog.mirrorX(-1);
  
  dog.addImage("dog",dogI);

  food = database.ref('food');
  time = database.ref('lastFed');
  gamestate = database.ref('gameState');
  hourdata = database.ref('hour');

  buttons = new Buttons();
}


function draw() {  
  changeBackground();
  background(bg);
  drawSprites();

  buttons.feedButton(20,760);
  buttons.refillButton(380,760);
  
  buttons.foodItems.getTime();
  
  fill("white");
  stroke("orange");
  strokeWeight(3);
  textSize(25);
  text("Last Feed : " + printTime,displayWidth/2 - 100,30);
  
  buttons.display();
}

function changeBackground(){
  getGameState();
  
  switch(currentState){
    case 0: bg = normal;
    dog.changeImage("dogH",dogHI);    
    isClicked = false;
    dog.visible = true;
    break;
    
    case 1: bg = playing;
    dog.visible = false;
    break;
    
    case 2: bg = washroom;
    dog.visible = false;
    break;  
    
    case 3: bg = sleeping;
    dog.visible = false;
    break;
    
    default: bg = normal;
    dog.changeImage("dog" , dogI);
    isClicked = true;
    dog.visible = true;
    break;
  }
}

function getGameState(){
  gamestate.on("value",(data)=>{
    currentState = data.val();
  })
}

function updateState(state){
  database.ref('/').update({
    gameState: state 
  })
}