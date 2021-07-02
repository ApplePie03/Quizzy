const domainInput = document.querySelector("#domain");
const difficultyInput = document.querySelector("#difficulty");
const numberOfQuestionsInput = document.querySelector("#questions");
const form = document.querySelector("form");
const inputs = [domainInput, difficultyInput, numberOfQuestionsInput];

form.addEventListener("submit", (e) => {
  for (const input of inputs) {
    if (input.value === "") {
      input.classList.add("empty");
      e.preventDefault();
    } else {
      // input.classList.add("filled");
      input.classList.remove("empty");
    }
  }
});
