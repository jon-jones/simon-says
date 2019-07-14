
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var highscore = 0;

var started = false;
var level = 0;

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    showSequence();
    nextLevel();
}

function showSequence() {
    
    gamePattern.forEach(function(currentColour, index) {
        setTimeout(function() {
            animatePress(currentColour);
            playSound(currentColour);
        }, 800 * index);
    });
}

function nextLevel() {
    level++;
    $("#level-title").text("Level " + level);
}

function animatePress(currentColour) {

    var element = "#" + currentColour;
    
    $(element).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var pressedClass = "pressed" + currentColour.slice(0, 1).toUpperCase() + currentColour.slice(1, currentColour.length);
    
    $(element).addClass(pressedClass);
    
    setTimeout(function() {
        $(element).removeClass(pressedClass);
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function playerPicked() {
    $(".btn").click(function(evt) {

        var userChosenColour = evt.target.id;
        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playSound(userChosenColour);
        if(started) {
            checkAnswer();
        }
        
    });
}

function gameOver(){
    playSound("wrong");
    $("body"). addClass("game-over");
    $(".container").addClass("displayHidden");

    setTimeout(function() {
        $("body").removeClass("game-over");
        $(".container").removeClass("displayHidden");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("h2").text("Highscore: " + highscore);
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer() {
    var index = userClickedPattern.length-1;

    if (userClickedPattern[index] === gamePattern[index]) {
        if (userClickedPattern.length === gamePattern.length){
            
            console.log("success")
            userClickedPattern = [];
            checkHighScore();

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}


function main() {
    $("body").keypress(function() {
        while (!started) {
            userClickedPattern = [];
            nextSequence();
            started = true;
        }
    });
    playerPicked();
}

function checkHighScore() {
    if (level > highscore){
        highscore = level;
        $("#highscore").text("Highscore: " + highscore);
    }
}

main();
