
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0
var started = false;



/** $(".btn").keypress(nextSequence);

function colorSound(){
    alert("just clicked");
} **/

$(document).keypress(function(){
    if (!started){
    $("#level-title").text("Level " + level)
    nextSequence();
    started = true;
    }
})

function nextSequence (){

    level = level + 1;

    $("#level-title").text("Level " + level)

   var randomNumber = Math.floor((Math.random()* 4));
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);

}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
 
})

function playSound(name){
    var colorAudio = new Audio ("./sounds/" + name + ".mp3");
   colorAudio.play();
}

function  animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).delay(100).removeClass("pressed") 
    }, 100);
}

function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
           if (gamePattern.length === userClickedPattern.length){
             setTimeout (function(){
                nextSequence();
                userClickedPattern = [];
             }, 1000);
           }
        } else {
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout (function (){
                $("body").removeClass("game-over");  
            },200)
            var audio = new Audio("./sounds/wrong.mp3")
            audio.play();
            startOver();
        }
    }

function startOver(){
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}