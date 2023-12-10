var startScreen = document.getElementById("start-screen")
var endScreen = document.getElementById("end-screen");
var startButton = document.getElementById("start");
var questionsTitle = document.getElementById("question-title"); 
var questionChoices = document.getElementById("choices");
var timerElement = document.getElementById("time");
var feedback = document.getElementById("feedback");
var questionsElement = document.getElementById("questions");
var initalsInput = document.getElementById("initals");
var submitButton = document.getElementById("submit");
var finalScore= document.getElementById("final-score");


var currentQuestionI = 0;
var timer = 0;
var timeLeft = 60;


//starting the quiz

function startQuiz() {
    startScreen.style.display = "none";
    questionsElement.style.display = "block";
    questionsElement.setAttribute("class", "start");
    setTimer();
    displayQuestion(currentQuestionI);
   };

//ending the quiz

function endQuiz(){
  clearInterval(timer);
  timerElement.textContent = 0;
  questionsElement.style.display = "none";
  endScreen.setAttribute("class", "start");
  if (timeLeft <0) {
    timeLeft = 0; }
    finalScore.textContent = timeLeft;
}

// start button to start the quiz
startButton.addEventListener("click", startQuiz);

   //setting the timer
function setTimer() {
    timer = setInterval(function() { 
    timeLeft--; 
    timerElement.textContent = timeLeft; 
    if(timeLeft <= 0) {
    endQuiz();
    };
}, 1000);
}

// * Questions contain buttons for each answer.



function displayQuestion(currentQuestion) {
  if (currentQuestion < questions.length) {
    questionsTitle.textContent = questions [currentQuestion].question;

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) { 
      var button = document.createElement("button");
      button.setAttribute("data-state", i);
      button.textContent = questions[currentQuestion].choices[i];
      questionChoices.appendChild(button);
    }
  } else {
    endQuiz();
  }
}
// When the game ends, it should display their score and give the user the ability to save their initials and their score

function clearFeedback () {
  feedback.setAttribute("class", "feedback hide");
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (initalsInput.value === "") {
    alert("Please insert initals. Do not leave blank");
  } else {
    var initials = initalsInput.value.trim();}
})

//  * When answer is clicked, the next question appears
// * If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.
  questionChoices.addEventListener("click", function (event) {
    feedback.setAttribute("class", "feedback");
    var buttonClicked = event.target;
  if (buttonClicked.matches("button")) {
    var answers = buttonClicked.getAttribute("data-state");
    if (answers === questions[currentQuestionI].correct) {
      feedback.textContent = "Correct Answer!"
    } else {
      feedback.textContent = "Incorrect Answer!"
      timeLeft -= 10;
    }
    currentQuestionI++;
    questionChoices.textContent ="";
    displayQuestion(currentQuestionI);
    setTimeout(clearFeedback, 1500);
}
});





