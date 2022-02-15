"use strict";
/*DOM Manipulation
console.log(document.querySelector(".message").textContent);
Document Object Model, DOM allows access of html and css to javascript
DOM is automatically created by browser
DOM tree also has nodes for text itself and even comments
DOM != javaScript DOM is a web API also written in jS
*/
//Refactoring code
let number = Math.trunc(Math.random() * 20) + 1;
console.log(number);
let score = 5;
let highscore = 0;
document.querySelector(".score").textContent = score;

//Message on right side
function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}
function enterGuess() {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);
  //No input
  if (!guess) {
    displayMessage("Enter a number! 🤔");
  }

  //player wins
  else if (guess === number) {
    displayMessage("Correct Number! 🎉");
    document.querySelector(".number").textContent = number;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    //Highscore
    if (score > highscore) {
      highscore = score;
    }
    document.querySelector(".highscore").textContent = highscore * 100;
  }

  //Guess too high or low
  else if (guess !== number) {
    if (score > 1) {
      displayMessage(guess > number ? "Too High! 📈" : "Too Low! 📉");
      document.querySelector(".score").textContent = score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You Lost 😓");
      document.querySelector(".score").textContent = 0;
    }
  }
}
//reset
function again() {
  number = Math.trunc(Math.random() * 20) + 1;
  console.log(number);
  score = 5;
  document.querySelector(".score").textContent = score;
  displayMessage("Here we go again...");
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").textContent = "0";
}
//on Click
document.querySelector(".check").addEventListener("click", function () {
  enterGuess();
});

//again
document.querySelector(".again").addEventListener("click", function () {
  again();
});

document.addEventListener("keydown", function (r) {
  if (r.key === "r" || r.key === "Escape") {
    again();
  }
});
//on keypress enter
document.querySelector(".guess").addEventListener("keypress", function (e) {
  if (e.key === "Enter" || e.key === "f") {
    enterGuess();
  }
});
