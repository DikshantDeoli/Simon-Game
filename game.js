
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

$(document).ready(function () {
  $(document).on('keypress', function (e) {
    if (!started) {
      if (e.key === 'a') {
        started = true;
        console.log('jquery function is running ....')
        nextSequence()
      }
    }
  });
});




function nextSequence() {

  // answer the whole pattern again for rechecking every answer every time the user click the function
  userClickedPattern = [];


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('h1').html(`Level ${gamePattern.length}`);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);


}


$('.btn').click(() => {
  var userChosenColour = this.event.target.id;
  handler(userChosenColour);
});


function handler(userChosenColour) {

  // storing the value to the array for later evalution
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  // animation as well as the playing the sound 
  animatePress(userChosenColour);
  playSound(userChosenColour);

  //checking of the answer
  checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    startOver();
  }

}

function startOver() {
  $(" body").addClass('game-over');
  playSound("wrong");
  setTimeout(() => {
    $("body").removeClass('game-over');
  }, 300);

  $('h1').html("Game Over,Press A Key to Start");
  gamePattern = [];
  started = false;
}

function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(() => {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

