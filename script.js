const questions = [{
  question:"The global variables are ____________.",
  answers :[
    {text:"External", correct:true},
    {text:"Internal", correct:false},
    {text:"Both External and Internal", correct:false},
    {text:"None of the above", correct:false},
  ]
},
{
  question: 'What is a Variable in JavaScript?',
  answers: [
      { text: 'A section of the webpage', correct: false },
      { text: 'A container for storing data values', correct: true },
      { text: 'A type of JavaScript function', correct: false },
      { text: 'An operation in mathematics', correct: false }
  ]
},
{
  question: 'When interpreter encounters an empty statements, what it will do:',
  answers: [
      { text: 'Shows a warning', correct: false },
      { text: 'Throws an error', correct: false },
      { text: 'Ignores the statements', correct: true },
      { text: 'Prompts to complete the statement', correct: false }
  ]
},
{
  question: 'Which type of JavaScript language is ___',
  answers: [
      { text: 'Object-Oriented', correct: false },
      { text: 'High Level', correct: false },
      { text: 'Assembly-language', correct: false },
      { text: 'Object-based', correct: true }
  ]
},
{
  question: 'The "function" and " var" are known as:',
  answers: [
      { text: 'Declaration statements', correct: true },
      { text: 'Keywords', correct: false },
      { text: 'Prototypes', correct: false },
      { text: 'Prototypes', correct: false }
  ]
}
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerBtn");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
 score = 0;
 nextButton.innerHTML = "Next";
 showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML =  questionNo + ". "+ currentQuestion.question;

  currentQuestion.answers.forEach(answer=>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer)
  });
}

function resetState(){
  nextButton.style.display ="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
  selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct")
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML ="Play Again";
  nextButton.style.display = "block";
}

function handleNextBtn(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
  showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
     if(currentQuestionIndex < questions.length){
      handleNextBtn();
     }
     else{
      startQuiz();
     }
});


startQuiz();
