class Food{
    constructor(){
        this.foodLeft;
        this.lastFed;
        
        this.image = loadImage("images/Milk.png");
    }

    getFood(){
        food.on("value",(data)=>{
            this.foodLeft = data.val();
        });
    }

    useFood(){
        this.foodLeft -= 1;
    }

    refillFood(){
        this.foodLeft += 1;
    }
    
    getTime(){
        time.on("value",(data)=>{
            printTime = data.val();
        })
    }

    updateTime(){
        database.ref('/').update({
            lastFed : feedTime
        })
    }

    display(){
        var xPos = 80;
        if(this.foodLeft != 0){
            for(var i = 0;i <= this.foodLeft; i++){
                if(i < 10){
                    image(this.image,xPos,10,60,60);
                    xPos += 30;
                } else if(i == 10){
                    xPos = 80
                }else if(i >= 11){
                    image(this.image,xPos,60,60,60);
                    xPos += 30;
                }
            }
        }
        
        if(this.foodLeft > 20){
            this.foodLeft = 20;
        }

        if(this.foodLeft){
            database.ref('/').update({
                food: this.foodLeft
            });
        }
    }
}