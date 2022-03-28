// Data for questions, choices, and answers
const questions = [
	{
		question: "Commonly used data types do not include:",
		choices: [
			"strings",
			"booleans",
			"alerts",
			"numbers"
		],
		answer: "alerts",
	},
	{
		question: "The condition in an if/else statement is enclosed with _____.",
		choices: [
			"quotes",
			"curly brackets",
			"parenthesis",
			"square brackets"
		],
		answer: "parenthesis",
	},
	{
		question: "Arrays in JavaScript can be used to store _____.",
		choices: [
			"numbers and strings",
			"other arrays",
			"booleans",
			"all of the above"
		],
		answer: "all of the above",
	},
	{
		question: "String values must be enclosed within _____ when being assigned to variables.",
		choices: [
			"commas",
			"curly brackets",
			"quotes",
			"parenthesis",
		],
		answer: "quotes",
	},
	{
		question: "A very useful tool used during development and debugging for printing content to the debugger is:",
		choices: [
			"JavaScript",
			"terminal/bash",
			"for loops",
			"console.log"
		],
		answer: "console.log",
	}
];

// Selectors 
startPage = document.querySelector('#start-page');
buttonStart = document.querySelector('#button-start');
titleQuestion = document.querySelector('#title-question');
container = document.querySelector('#main-container');
choicesContainer = document.querySelector('#choices-container');
choicesButtons = document.querySelector('#choices-buttons');
answerContainer = document.querySelector('#answer-container');

// Variables for score and count, these get reset later 
score = 0;
count = 0;

// When start button is clicked, present first question and start timer
buttonStart.addEventListener("click", function () {
	startPage.style.display = "none";
	choicesContainer.style.display = "block";
	createChoices(count)
	pageTimer = setInterval(timer, 1000);
});

// Function for timer
timerCount = 76;
function timer() {
	timerCount = timerCount - 1;
	if (timerCount < 0) {
		clearInterval(pageTimer);
		finalPage()
		return;
	} else if (count == questions.length) {
		clearInterval(pageTimer);
		document.getElementById("timer").innerHTML = "0"; // watch for spelling
		return;
	} else {
		document.getElementById("timer").innerHTML = timerCount; // watch for spelling
	}

}

// Function creates buttons for choices for each question
function createChoices(count) {
	titleQuestion.textContent = questions[count].question;
	choicesButtons.innerHTML = '';
	for (i = 0; i < 4; i++) {
		buttonChoice = document.createElement('button');
		buttonChoice.textContent = questions[count].choices[i];
		buttonChoice.className = "button-choice";
		buttonChoice.setAttribute("id", "choice" + i);
		choicesButtons.appendChild(buttonChoice);
	}
}

// Function provides feedback on if answer was right or wrong
function answerResult(feedback) {
	answer = document.createElement('p');
	answer.textContent = "Previous answer: " + feedback
	answer.setAttribute("id", "answer");
	answerContainer.appendChild(answer);
}

// Function shows score when quiz ends 
function finalPage() {
	choicesContainer.style.display = "none";
	scoresFormContainer.style.display = "block";
	printScore.textContent = score;
}

// Function cycles through quiz questions and saves scores as user goes through quiz
var choiceHandler = function (event) {
	var targetButton = event.target;
	count++
	if (count < questions.length) {
		answerContainer.innerHTML = '';
		if (targetButton.textContent == questions[count - 1].answer) {
			createChoices(count);
			answerResult("Correct!");
			score++
		} else {
			createChoices(count);
			timerCount = timerCount - 10; // Subtract time if answer is wrong
			answerResult("Wrong");
		};
	} else {
		if (targetButton.textContent == questions[count - 1].answer) {
			answer.innerHTML = '';
			answerResult("Correct!");
			score++
		} else {
			answer.innerHTML = '';
			answerResult("Wrong")
		};
		finalPage();
	}
};

choicesButtons.addEventListener("click", choiceHandler);



// Selectors for #scores-form-container and #scores-container
scoresFormContainer = document.querySelector('#scores-form-container');
printScore = document.querySelector('#print-score');
scoresContainer = document.querySelector('#scores-container');
scoreForm = document.querySelector("#score-form");
scoresList = document.querySelector('#scores-list');

buttonGoBack = document.querySelector('#button-go-back')
buttonClearScores = document.querySelector('#button-clear-scores')

// Get name from user to store score
var scoreSaver = function (event) {
	event.preventDefault();
	scoreName = document.querySelector("input[name='task-name']").value;
    
	if (!scoreName) {
		alert("You need to fill out your name first!");
		return false;
	}

	var dataObj = {
		name: scoreName,
		score: score
	};

	scoresFormContainer.style.display = "none";
	answerContainer.style.display = "none";
	scoresContainer.style.display = "block";
	createScore(dataObj)
};

// Add saved score to list and save to local storage
scores = [];
var createScore = function (dataObj) {
	scores.push(dataObj); // push to scores array
	scores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)); // Sorts scores from highest to lowest
	saveScoresToStorage(); // save tasks to localStorage

	scoresList.innerHTML = "";
	for (i=0; i < scores.length; i++){
		scoreItem = document.createElement("li");
		scoreItem.className = "score-info";
		scoreItem.setAttribute("data-index", scores[i].score )
		scoreItem.innerHTML = "<p>" + scores[i].name + " - " + scores[i].score + "</p>";
		scoresList.appendChild(scoreItem); // creates element for score saved
	}

};

var saveScoresToStorage = function () {
	localStorage.setItem("scores", JSON.stringify(scores));
};

scoreForm.addEventListener("submit", scoreSaver);


// Functions for back button and clear score button
buttonGoBack.addEventListener("click", function () {
	startPage.style.display = "block";
	scoresContainer.style.display = "none";

	//reset score, count, timer, and input field
	score = 0;
	count = 0;
	timerCount = 76;
	document.querySelector("input[name='task-name']").value = "";
});
buttonClearScores.addEventListener("click", function () {
	scoresList.innerHTML = '';
	scores = [];
});

// When 'view high scores' is clicked
viewScores = document.querySelector('#view-scores');

viewScores.addEventListener("click", function () {
	scoresContainer.style.display = "block";
	startPage.style.display = "none";
	choicesContainer.style.display = "none";
	answerContainer.style.display = "none";
	scoresFormContainer.style.display = "none";

	//reset score, count and timer
	score = 0;
	count = 0;
	timerCount = 76;
	clearInterval(pageTimer);
	document.getElementById("timer").innerHTML = "0"; // watch for spelling
})
