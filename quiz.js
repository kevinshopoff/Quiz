$(document).ready(function(){
	
	var questions = [{question: "What is the capital of the US", choices: ["Washington DC", "NYC", "Silicon Valley"], correct:0, image: "USA.jpg"}];
	var currentQuestion = 0;
	var numRight = 0;
	var btnContinue = false;

	questions.push({question: "What is the capital of France", choices: ["Chamonix", "Paris", "Lyon", "Marseille"], correct:1, image: "France.jpg"});
	questions.push({question: "What is the capital of the United Kingdom", choices: ["York", "Leeds", "Canterbury", "London"], correct:3,image: "UK.jpg"});
	questions.push({question: "What is the capital of Turkey", choices: ["Istanbul", "Izmir", "Ankara"], correct:2, image: "Turkey.jpg"});
	
	var totalQuestions = questions.length;

	function rightWord(num) {
		if (num == 1) {
			return "question"
		} else {
			return "questions"
		};
	};
	
	function nextQuestion() {
		if (currentQuestion >= questions.length) {
			$("#theQuestion").text("There are no more questions.");
			$("#flag").remove();
			$("#formContainer").remove();
			$("#xofy").remove();
			$("#myStats").text("You answered " + numRight + " out of " + totalQuestions + " " + rightWord(totalQuestions) + " correctly.");
		} else {
			$('#flag').css('background-image', 'url("images/' + questions[currentQuestion].image + '")');
			console.log("the image file is: " + questions[currentQuestion].image);
			$("#theAnswers").empty();
			$("#theQuestion").text(questions[currentQuestion].question + "?");
			for (i=0; i<questions[currentQuestion].choices.length; i++) {
				$('#theAnswers').append('<input type=\'radio\' name=\'choice\' value=' + i + ' class=\'theAnswers\' id=' + i + '>' + questions[currentQuestion].choices[i] + '<br>');
			}	
			$('#0').focus();
		$('#xofy').text('Question ' + (currentQuestion + 1) + ' of ' + totalQuestions + '.');
		}
		
	};

		
		
	function checkAnswer(myAnswer) {
		$("#theAnswers").empty();
		var answerText = questions[currentQuestion].choices[questions[currentQuestion].correct] + " is the answer."	
		if (myAnswer == questions[currentQuestion].correct) {
			console.log(questions[currentQuestion].choices[myAnswer] + " is right!");
			numRight++;
			$("#theQuestion").text("That's right.  " + answerText);
			$('#myStats').text('You have answered ' + numRight + ' ' + rightWord(numRight) + ' correctly.');
		} else {
			console.log(questions[currentQuestion].choices[myAnswer] + " is wrong.");
			$("#theQuestion").text("Too bad.  " + answerText);
			if (numRight == 0) {
				$('#myStats').text('You have answered ' + numRight + ' ' + rightWord(numRight) + ' correctly.');
			}
		}
		currentQuestion++;
		$('#actualButton').focus();
		$("#btn").text("Continue");
		btnContinue = true;
	};

		
	$("#btn").click(function(){
		console.log("The button was clicked");
		if (btnContinue) {
			$("#btn").text("Answer");
			btnContinue = false;	
			nextQuestion();
		} else {
			var currentAnswer = $('input[name="choice"]:checked').val();
			console.log(currentAnswer + " was your answer");
			checkAnswer(currentAnswer);
		}
		return false;
    });
	
	$("#myChoices").submit(function(){
		console.log("Enter was pressed");
		if (btnContinue) {
			$("#btn").text("Answer");
			btnContinue = false;	
			nextQuestion();
		} else {
			var currentAnswer = $('input[name="choice"]:checked').val();
			console.log(currentAnswer + " was your answer");
			checkAnswer(currentAnswer);
		}
		
		return false;
    });
	
	nextQuestion();
	
});
	
	
	
	
	
	
