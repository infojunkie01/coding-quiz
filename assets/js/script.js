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
		question: "A very useful tool used during development and debuggin for printing content to the debugger is:",
		choices: [
			"JavaScript",
			"terminal/bash",
			"for loops",
			"console.log"
		],
		answer: "console.log",
	}
];

buttonStart = document.querySelector('#button-start');

title = document.querySelector('#title');
container = document.querySelector('#main-container');
choicesContainer = document.querySelector('#choices-container');


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

count = 0;
// if start clicked, move onto next question
buttonStart.addEventListener("click", function() {
	buttonStart.remove()
    createChoices(count)

  // if (count < questions.length){
  //   title.textContent = questions[count].question;
  //   createChoices(count)

  //   //if one of choices selected, change to next (use if child selected)
  // }

});


answerContainer = document.querySelector('#answer-container');

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

	}else{
		createChoices(count)
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


function myFunc(){
	choices = document.getElementById('main-container').children;
	
	console.log(choices)
  
	for(choice in choices){
		console.log(choice)
		choice.addEventListener("click", function() { console.log("hi")});
	}

	// for (i = 0; i < choices.length; i++) {
	// 	choices[i].addEventListener("click", function() {
	// 	console.log(i)
	// 	if(choices[i].textContent == questions[count].answer) {
	// 		console.log("true")
	// 		//switch to next count
	// 		// if it's right do X, if wrong do Y
	// 	} else{
	// 		console.log("wrong")
	// 	}
	// 	});
	// };
  }
  

// function myFunc(){
//   //var choices = document.getElementsByClassName('button-choice');
//   choices = document.querySelector('#choice0');
// 	console.log(choices.textContent)

//   if(choices.textContent == questions[count].answer) {
//     console.log("true")
//     //switch to next count
//     // if it's right do X, if wrong do Y
//   }
// }



// choices[0].addEventListener("click", function() {
//   console.log(0)
//   if(choices[0].textContent == questions[count].answer) {
//     console.log("true")
//     //switch to next count
//     // if it's right do X, if wrong do Y
//   } else{
//     console.log("wrong")
//   }
// });

// for (i = 0; i < choices.length; i++) {
//   console.log(choices[i])
//   choices[i].addEventListener('click', function() {
//     console.log(i)
//     if(choices[i].textContent == questions[count].answer) {
//       console.log("true")
//       //switch to next count
//       // if it's right do X, if wrong do Y
//     } else{
//       console.log("wrong")
//     }
// });
 
// };

// (
// 	function(){
// 		const main = document.querySelector('main'),
// 					container = document.querySelector('#container-question'),
// 					pMsg = document.querySelector('#p-msg'),
// 					play = document.querySelector('#btn-play');
// 		let point;
// 		let count;
// 		point = 0;
// 		count = 0;
		
// 		main.addEventListener('click', (e) => {
// 			printQuestion(e);
// 			confirmAlternative(e);
// 			checked(e)
// 		});
		
// 		function printQuestion (e) {
// 			if(e.target.id === 'btn-play' || e.target.id === 'next-question'){
// 				if(questions.length === count){
// 				pMsg.textContent = 'Sua Pontuação: ';
// 				container.innerHTML = '';
				
// 				let p = document.createElement('p');
// 						p.textContent = point;
// 				container.appendChild(p)
// 			}	
// 				newQuestion();
// 			}
// 		}
		
// 		function confirmAlternative (e) {
// 			if(e.target.id === 'btn-confirm'){
// 				showAlternative();
// 			}
// 		}
		
// 		function checked (e) {
// 			if(e.target.nodeName === "LABEL"){
// 				document.querySelector('#btn-confirm').disabled = false;
// 			}
// 		} 
		
// 		function newQuestion () {
// 			pMsg.textContent = questions[count].question;
// 			container.innerHTML = '';

// 			questions[count].choices.forEach((item, index) => {
// 				for(let key in item){
// 					let input = document.createElement('input');
// 						input.id = key
// 						input.setAttribute('type', 'radio');
// 						input.setAttribute('name', 'question');
// 						container.appendChild(input);
// 					let label = document.createElement('label');
// 						label.innerHTML = item[key];
// 						label.setAttribute('for', key);
// 						container.appendChild(label);
// 				}
// 			});
			
// 			let button = document.createElement('button');
// 					button.textContent = 'Confirmar';
// 					button.id = 'btn-confirm';
// 					button.disabled = true;
// 					container.appendChild(button);
// 			count += 1;
// 		}
		
// 		function addPoint () {
// 			point += 1;
// 		}
		
// 		function showAlternative () {
// 			let choices = document.querySelectorAll('input[type="radio"]');
// 			let checked = choices.forEach(item => {
// 				if(item.checked === true){
// 					container.innerText = '';
// 					let p = document.createElement('p')
// 					if(item.id === questions[count - 1].answer){
// 						addPoint();
// 						pMsg.innerHTML  = 'Parabens você acertou!'
// 						p.innerHTML = `Resposta Correta: ${questions[count - 1].answer.toUpperCase()} <br><br>
// 						${questions[count - 1].info}`					
// 					} else {
// 						pMsg.innerHTML  = 'Que pena você errou!'
// 						p.innerHTML = `Resposta Correta: ${questions[count - 1].answer.toUpperCase()} <br><br>
// 						${questions[count - 1].info}`
// 					}
// 					container.appendChild(p);
					
// 					let button = document.createElement('button');
// 							button.textContent = 'Próxima Questão';
// 							button.id = 'next-question';
// 					container.appendChild(button);
// 				}
// 			});
// 		}
// 	}
// )()



