"use strict";
/*DOM Manipulation
console.log(document.querySelector(".message").textContent);
Document Object Model, DOM allows access of html and css to javascript
DOM is automatically created by browser
DOM tree also has nodes for text itself and even comments
DOM != javaScript DOM is a web API also written in jS
document.querySelector(".message").textContent = "Correct Number! 🎉";
document.querySelector(".number").textContent = 60;
document.querySelector(".score").textContent = 50;
document.querySelector(".guess").value;
document.querySelector(".guess").value = 23;
Even listner*/
let number = Math.trunc(Math.random() * 20) + 1;
console.log(number);
let score = 9;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  //No input
  if (!guess) {
    document.querySelector(".message").textContent = "Enter a number! 🤔";
  } //player wins
  else if (guess === number) {
    document.querySelector(".message").textContent = "Correct Number! 🎉";
    document.querySelector(".number").textContent = number;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    var highscore = score > highscore ? (highscore = score) : (score = score);
    document.querySelector(".highscore").textContent = highscore + 1;
  } //Guess too high
  else if (guess > number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "Too High! 📈";
      document.querySelector(".score").textContent = score--;
    } else {
      document.querySelector(".message").textContent = "You Lost 😓";
      document.querySelector(".score").textContent = 0;
    }
    //Guess too low
  } else if (guess < number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "Too Low! 📉";
      document.querySelector(".score").textContent = score--;
    } else {
      document.querySelector(".message").textContent = "You Lost 😓";
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  number = Math.trunc(Math.random() * 20) + 1;
  console.log(number);
  document.querySelector(".message").textContent = "Here we go again...";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").textContent = "0";
});
