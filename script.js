let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;

$(".btn").click(function (e) {
	let userChosenColor = e.target.id;
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	//var userChosenColor = $(this).attr("id");
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
	if (gameStarted === false) {
		$("#level-title").text("Level" + level);
		nextSequence();
		gameStarted = true;
	}
});

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function nextSequence() {
	userClickedPattern = [];
	level++;

	$("#level-title").text("Level " + level);

	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("Correct button");

		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any Key to Restart");

		reset();
	}
}

function reset() {
	level = 0;
	gamePattern = [];
	gameStarted = false;
}
