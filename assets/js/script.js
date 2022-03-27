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

// Variables for selector
buttonStart = document.querySelector('#button-start');
title = document.querySelector('#title');
container = document.querySelector('#main-container');
choicesContainer = document.querySelector('#choices-container');
answerContainer = document.querySelector('#answer-container');
scoresFormContainer = document.querySelector('#scores-form-container');
printScore = document.querySelector('#print-score');
scoresContainer = document.querySelector('#scores-container');
scoresList = document.querySelector('#scores-list');
scoreForm = document.querySelector("#score-form");

score = 0;
count = 0;


// Create buttons for choices for each question
function createChoices(count){
  title.textContent = questions[count].question;
  choicesContainer.innerHTML = '';
  for (i=0; i<4; i++) {
    buttonChoice = document.createElement('button');
    buttonChoice.textContent = questions[count].choices[i];
    buttonChoice.className = "button-choice";
    buttonChoice.setAttribute("id", "choice"+ i);
    choicesContainer.appendChild(buttonChoice); 
  }
}

// Show final page when quiz end
function finalPage(){
	choicesContainer.innerHTML = '';
	title.textContent = "All done!";
	printScore.textContent = score;
	scoresFormContainer.style.display = "block";
}

// When start button is clicked, present first question and start timer
buttonStart.addEventListener("click", function() {
	buttonStart.remove()
    createChoices(count)
	setInterval(timer, 1000); //1000 will  run it every 1 second
});

// Sets up timer
var timerCount = 76;
	
function timer(){
	timerCount = timerCount-1;
	if (timerCount < 0){
		finalPage()
		return;
	} else if (count == questions.length){
		clearInterval(timer);
		document.getElementById("timer").innerHTML= "0 sec."; // watch for spelling
		return;
	}
	document.getElementById("timer").innerHTML = timerCount + " sec."; // watch for spelling
}

// Gives answer result
function answerResult(feedback){
	answer = document.createElement('p');
	answer.textContent = "Previous answer: " + feedback
	answer.setAttribute("id", "answer");
	answerContainer.appendChild(answer); 
}

var choiceHandler = function(event) {
	var targetButton = event.target;
	count++
	console.log(count)
	if (count < questions.length){
		answerContainer.innerHTML = '';
		if (targetButton.textContent == questions[count-1].answer) {
			createChoices(count);
			answerResult("Correct!");
			score++			
		}else{
			createChoices(count);
			timerCount = timerCount - 10; // Subtract time if answer is wrong
			answerResult("Wrong");
		};
	}else{
		if (targetButton.textContent == questions[count-1].answer) {
			answer.innerHTML = '';
			answerResult("Correct!");
			score++		
		}else{
			answer.innerHTML = '';
			answerResult("Wrong")	
		};
		finalPage();
	}
  };


choicesContainer.addEventListener("click", choiceHandler);

///

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

  title.textContent = "High scores"
  scoresFormContainer.style.display = "none";
  answerContainer.style.display = "none";
  scoresContainer.style.display = "block";
  
  createScore(dataObj)
};

var scores = [];

var createScore = function(dataObj) {
	var scoreItem = document.createElement("li");
	scoreItem.className = "score-info";
	scoreItem.innerHTML = "<p>" + dataObj.name + " - " + dataObj.score + "</p>";
	scoresList.appendChild(scoreItem);

	scores.push(dataObj);
  
	// save tasks to localStorage
	saveScoresToStorage();
  };

  var saveScoresToStorage = function() {
	localStorage.setItem("scores", JSON.stringify(scores));
  };
  

scoreForm.addEventListener("submit", scoreSaver);

