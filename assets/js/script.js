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

	finalScore = document.createElement('p');
	finalScore.textContent = "Your final score is " + score;
	choicesContainer.appendChild(finalScore); 

	saveScore = document.createElement('p');
	saveScore.textContent = "Enter initials: " ;
	choicesContainer.appendChild(saveScore); 
}




// When start button is clicked, present first question and start timer
buttonStart.addEventListener("click", function() {
	buttonStart.remove()
    createChoices(count)
	setInterval(timer, 1000); //1000 will  run it every 1 second
});



// Function for timer
var timerCount = 76;
	
function timer(){
	timerCount = timerCount-1;
	if (timerCount < 0){
		finalPage()
		return;
	}
	document.getElementById("timer").innerHTML= timerCount + " sec."; // watch for spelling
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
	answerContainer.innerHTML = '';
	if (targetButton.textContent == questions[count-1].answer) {
		createChoices(count)
		answerResult("Correct!")
		score++		

	}else{
		createChoices(count);
		timerCount = timerCount - 10; // Subtract time if answer is wrong
		answerResult("Wrong")	
	}
	
  };


choicesContainer.addEventListener("click", choiceHandler);

//   var taskButtonHandler = function (event) {
// 	// get target element from event
// 	var targetEl = event.target;
  
// 	if (targetEl.matches(".edit-btn")) {
// 	  console.log("edit", targetEl);
// 	  var taskId = targetEl.getAttribute("data-task-id");
// 	  editTask(taskId);
// 	} else if (targetEl.matches(".delete-btn")) {
// 	  console.log("delete", targetEl);
// 	  var taskId = targetEl.getAttribute("data-task-id");
// 	  deleteTask(taskId);
// 	}
//   };





