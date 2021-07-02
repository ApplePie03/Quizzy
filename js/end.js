const congratsHeader = document.querySelector(".header");
const resultHeader = document.querySelector(".testResults");
const button = document.querySelector("button");
const totalQuestions = window.sessionStorage.getItem("totalQuestions");
const correctQuestions = window.sessionStorage.getItem("correctQuestions");
const result = (correctQuestions / totalQuestions) * 100;
button.addEventListener("click", () => {
  window.location.assign("/index.html");
});

if (result <= 30) {
  congratsHeader.innerText = "You could do better!";
} else if (result >= 31 && result <= 60) {
  congratsHeader.innerText = "Good job!";
} else {
  congratsHeader.innerText = "Congratulations!";
}

if (correctQuestions === 1) {
  resultHeader.innerText = `You got only 1 of ${totalQuestions} right!`;
}
resultHeader.innerText = `You got ${correctQuestions} of ${totalQuestions} questions right!`;
