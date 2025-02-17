var level = 1;
var arr = [];
var answerArr = [];
var gameRunning = false; 
var patternRunning = false;

$(document).keypress(function(event){
    if (gameRunning) return;
    gameRunning = true;
    $("body").removeClass("game-over");
    $("h1").text("Level " + level);
    console.log(event.key);
    setTimeout(function () {
        pushRandomNum();
        showPattern();
    }, 1000); 

})


$(".btn").click(function(event){
    if (patternRunning) return;
    var userChosenColor = event.target.id;
    setTimeout(function(){
        $("."+userChosenColor).addClass("pressed");
        var audio = new Audio("./sounds/"+userChosenColor.slice(0, userChosenColor.length)+".mp3");
        audio.play();
        setTimeout(function(){
            $("."+userChosenColor).removeClass("pressed");
        }, 300);
    })
    console.log(userChosenColor);
    var colorID ;
    switch(userChosenColor){
            case "green":
                colorID =0;
                break;
            case "red":
                colorID = 1;
                break;
            case "yellow":
                colorID = 2;
                break;
            case "blue":
                colorID = 3;
                break;
    }
    console.log(colorID);
    answerArr.push(colorID);
    
    if (answerArr.length === level){
        if (answerArr.join("") === arr.join("")){
            var win = new Audio("./sounds/win.mp3");
            win.play();
            level++;
            setTimeout(function () {
                $("h1").text("Level " + level);
            },1000);
            arr = [];
            answerArr = [];
            setTimeout(function () {
                pushRandomNum();
                showPattern();
            }, 2000); 
            
        }else{
            var lost = new Audio("./sounds/wrong.mp3");
            lost.play();
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            level = 1;
            arr = [];
            answerArr = [];
            gameRunning = false;
        }
    }
})

function pushRandomNum(){
    arr = [];
    for(var i = 0;i<level;i++){
        var randomNum = Math.floor(Math.random()*4) ;
        arr.push(randomNum);
    }
    console.log(arr);
}


function showPattern() {
    patternRunning = true;
    for (let i = 0; i < level; i++) {
        setTimeout(function () {
            var color;
            switch (arr[i]) {
                case 0:
                    color = "#green";
                    break;
                case 1:
                    color = "#red";
                    break;
                case 2:
                    color = "#yellow";
                    break;
                case 3:
                    color = "#blue";
                    break;
            }
            $(color).addClass("pressed");
            var audio = new Audio("./sounds/"+color.slice(1, color.length)+".mp3");
            audio.play();
            setTimeout(function () {
                $(color).removeClass("pressed");
                if (i === level - 1) {
                    patternRunning = false;
                }
            }, 300); // Remove class after 300ms
        }, i * 600); // Delay each step to show pattern sequentially
    }
   
}


