class Buttons{
    constructor(){
        this.feed = createButton('Feed The Doggo');
        this.refill = createButton('Restock Food');

        this.foodItems = new Food();

        this.foodItems.getFood();
    }
    
    feedButton(x,y){
        
        this.feed.position(x,y);
        
        this.feed.mousePressed(()=>{
            this.foodItems.useFood();

            timeH = hour();
            timeM = minute();

            if(timeH > 12){
                feedTime = timeH + ":" + timeM + "PM";
            } else if(timeH <= 12){
                feedTime = timeH + ":" + timeM + "PM";
            }

            this.foodItems.updateTime();

            database.ref('/').update({
                hour: timeH 
              })

            updateState(4);
        });
    }
    
    refillButton(x,y){
        
        this.refill.position(x,y);
        
        this.refill.mousePressed(()=>{
            this.foodItems.refillFood();
        });
    }
    
    stateCheck(){
        currentTime = hour();
        hourdata.on("value",(data)=>{
            databaseHour = data.val();
        });
    
        if(currentTime - databaseHour >= 1 && currentTime - databaseHour <= 2){
            updateState(1);   
        }
        if(currentTime - databaseHour >= 2 && currentTime - databaseHour <= 3){
            updateState(2);   
        }
        if(currentTime - databaseHour >= 3 && currentTime - databaseHour <= 4){
            updateState(3);   
        }
        if(currentTime - databaseHour >= 4){
            updateState(0);   
        }
    }

    display(){
        this.foodItems.display();
        this.stateCheck();

        if(isClicked === true){
            this.feed.hide();
        }
        if(isClicked === false){
            this.feed.show();
        }
    }
}