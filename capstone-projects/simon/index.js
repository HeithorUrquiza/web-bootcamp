let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let click = 0 
let hasStarted = false

$(document).on("keydown", function(event){
    if(event.key === "a" && !hasStarted){
        hasStarted = true
        nextSequence()
    }
})


$(".button").on("click", handleButtonClick);

function handleButtonClick() {
    const userChosenColor = $(this).attr("id");
    
    if (isUserInputCorrect(userChosenColor)) {
        userClickedPattern.push(userChosenColor);
        playAudio(userChosenColor);
        animatePress(userChosenColor);
        click++;
        
        if (isUserPatternComplete()) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver()
        startOver()
    }
}

function isUserInputCorrect(userChosenColor) {
    return userChosenColor === gamePattern[click];
}

function isUserPatternComplete() {
    return userClickedPattern.length === gamePattern.length;
}

function resetUserPattern() {
    click = 0;
    userClickedPattern = [];
}

function gameOver(){
    const body = $("body")
    
    body.toggleClass("game-over")
    setTimeout(function(){
        body.toggleClass("game-over")
    }, 200)

    playAudio("wrong")
    $("#level-title").text("Game Over, Press A Key to Restart")
}

function startOver(){
    level = 0
    gamePattern = []
    hasStarted = false
}

function nextSequence(){
    resetUserPattern()
    level++
    $("h1").text("Level " + level)

    let randomNum = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNum]
    gamePattern.push(randomChosenColor)

    gamePattern.forEach(function(element, index){
        setTimeout(function(){
            $("#" + element).fadeOut(100).fadeIn(100)
            playAudio(element)
        }, (index * 1000) / 2)
    });
}


function playAudio(color){
    let audio = new Audio("./sounds/" +color+ ".mp3")  
    audio.play()  
}

function animatePress(currentColor){
    let btn = $("#" + currentColor)
    btn.toggleClass("pressed")
    setTimeout(() =>{
        btn.toggleClass("pressed")
    }, 100)
}