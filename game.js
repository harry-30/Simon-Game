var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on('keypress',function() {
    if (!started) {
      nextSequence();
      started = true;
    }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer((userClickedPattern.length) - 1);
})

function nextSequence() {
  userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChosen);

    level++;

    $("#level-title").text("Level " + level);

    $("#" + randomColourChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColourChosen);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
