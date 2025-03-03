var buttonColours = ["red", "blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern =[];

// Tracking whether Game has started or not
var started = false;
var level = 0;

// Using jQuery Detecting when Keyboard has been pressed
$(document).keypress(function(){
  if(!started){

    // h1 starts saying "Press a Key to Start", whe game started changes to level 0
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Detecting button clicks
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Calling checkAnswer after user has clicked and choosen their currentColor
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  // Logs Success or Wrong.
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

   // If previous click is correct then Have to check another level with if stmt.
    if(userClickedPattern.length == gamePattern.length){

      // Call nextsequence after 1000 ms delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");

    // Playing the sound if user got one of the answer wrong.
    playSound("wrong");

    // Adding Some CSS styles and remove it after some 300 ms.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Says gameover And press any key to restart
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Generates random number and add randomNumber to array
function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);



  var randomNumber = Math.random();
  randomNumber = (randomNumber*4);
  randomNumber = Math.floor(randomNumber);
  //  console.log(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
};

// Adding sounds to button clicks
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

//1. Create a new function called animatePress().
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
