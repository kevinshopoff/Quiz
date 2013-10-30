$(document).ready(function() {
	/*initialize variables*/
	var questions = [{
		question: "What is the capital of the US",
		choices: ["Washington DC", "NYC", "Silicon Valley"],
		correct: 0,
		image: "USA.jpg"
	}];
	var currentQuestion = 0;
	var numRight = 0;
	var btnContinue = false;

	/*add questions*/
	questions.push({
		question: "What is the capital of France",
		choices: ["Chamonix", "Paris", "Lyon", "Marseille"],
		correct: 1,
		image: "France.jpg"
	});
	questions.push({
		question: "What is the capital of the United Kingdom",
		choices: ["York", "Leeds", "Canterbury", "London"],
		correct: 3,
		image: "UK.jpg"
	});
	questions.push({
		question: "What is the capital of Turkey",
		choices: ["Istanbul", "Izmir", "Ankara"],
		correct: 2,
		image: "Turkey.jpg"
	});

	var totalQuestions = questions.length;

	/*determine whether "question" or "questions" should be used*/

	function rightWord(num) {
		if (num == 1) {
			return "question"
		} else {
			return "questions"
		};
	};

	/*display the nextQuestion*/

	function nextQuestion() {
		if (currentQuestion >= questions.length) { /*if the last question has been answered, remove the form and provide the final score*/
			$("#theQuestion").text("There are no more questions.");
			$("#flag").remove();
			$("#formContainer").remove();
			$("#xofy").remove();
			$("#myStats").text("You answered " + numRight + " out of " + totalQuestions + " " + rightWord(totalQuestions) + " correctly.");
		} else { /*if there are more questions to answer, update the flag, theQuestions and theAnswers*/
			$('#flag').css('background-image', 'url("images/' + questions[currentQuestion].image + '")');
			$("#theAnswers").empty();
			$("#theQuestion").text(questions[currentQuestion].question + "?");
			for (i = 0; i < questions[currentQuestion].choices.length; i++) {
				$('#theAnswers').append('<input type=\'radio\' name=\'choice\' value=' + i + ' class=\'theAnswers\' id=' + i + '>' + questions[currentQuestion].choices[i] + '<br>');
			}
			$('#0').focus(); /*set focus on the first radio button*/
			$('#xofy').text('Question ' + (currentQuestion + 1) + ' of ' + totalQuestions + '.');
		}
	};


	/*see if the answer was correct*/

	function checkAnswer(myAnswer) {
		$("#theAnswers").empty();
		var answerText = questions[currentQuestion].choices[questions[currentQuestion].correct] + " is the answer."
		if (myAnswer == questions[currentQuestion].correct) { /*let the user know they were correct*/
			numRight++;
			$("#theQuestion").text("That's right.  " + answerText);
			$('#myStats').text('You have answered ' + numRight + ' ' + rightWord(numRight) + ' correctly.');
		} else {
			$("#theQuestion").text("Too bad.  " + answerText); /*let the user know they were wrong*/
			if (numRight == 0) {
				$('#myStats').text('You have answered ' + numRight + ' ' + rightWord(numRight) + ' correctly.');
			}
		}
		currentQuestion++; /*increment the question counter*/
		$("#btn").text("Continue"); /*update the text displayed on the css button*/
		btnContinue = true;
	};

	/*when the button is clicked*/
	$("#btn").on("click", function() {
		if (btnContinue) { /*this will load the next question*/ /*yes, this should be a function*/
			$("#btn").text("Answer");
			btnContinue = false;
			nextQuestion();
		} else { /*this will submit the answer*/
			var currentAnswer = $('input[name="choice"]:checked').val();
			checkAnswer(currentAnswer);
		}
		return false;
	});

	/*when Enter is pressed*/
	$('body').on("keypress", function(event) {
		if (event.which === 13) {
		if (btnContinue) { /*this will load the next question*/ /*yes, this should be a function*/
			$("#btn").text("Answer");
				btnContinue = false;
				nextQuestion();
			} else { /*this will submit the answer*/
				var currentAnswer = $('input[name="choice"]:checked').val();
				checkAnswer(currentAnswer);
			}
			return false;
		}
	});

	nextQuestion(); /*load the first question*/

});