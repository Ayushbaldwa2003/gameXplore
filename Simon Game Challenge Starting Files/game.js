var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
function nextSequence(){
    $("h1").text("Level =" + level);
    level++;
    var randomnumber=Math.random();
    randomnumber=randomnumber*3+1;
    randomnumber=Math.floor(randomnumber);
    randomChosenColour=buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
$(document).on('click', function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    if(userClickedPattern.length<=gamePattern.length){
        if(userClickedPattern[userClickedPattern.length-1]!=gamePattern[userClickedPattern.length-1]){
            $("h1").text("Game over Press any key to start the game");
            level=0;
            gamePattern=[];
            userClickedPattern=[];
        }
        if(userClickedPattern.length==gamePattern.length){
            nextSequence();
            userClickedPattern = [];
        }
}
})
$(document).keypress(function(event) {
    nextSequence();
});