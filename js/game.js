const question = document.querySelector(".questionBody");
const questionProgress = document.querySelector(".questionHeader");

const choices = Array.from(document.getElementsByClassName("choice"));
const quizParams = [];
const params = new URLSearchParams(window.location.search).values();
for (param of params) {
  quizParams.push(param);
}

let currentQuestion = {};
let acceptingAnswers = false;
let correctQuestions = 0;
let questionCounter = 0;
let availableQuestions = [];
const MAX_QUESTIONS = quizParams[2];

let questions = [];

fetch(
  `https://opentdb.com/api.php?amount=${quizParams[2]}&category=${quizParams[0]}&difficulty=${quizParams[1]}&type=multiple`
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

startGame = () => {
  questionCounter = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS) {
    window.sessionStorage.setItem("correctQuestions", correctQuestions);
    window.sessionStorage.setItem("totalQuestions", MAX_QUESTIONS);
    window.location.assign("/html/end.html");
  }
  questionCounter++;
  questionProgress.innerText = `Question ${questionCounter}/${quizParams[2]}`;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

    if (selectedAnswer == currentQuestion.answer) {
      correctQuestions++;
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 2000);
  });
});
