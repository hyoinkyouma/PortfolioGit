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
const number = Math.trunc(Math.random() * 20) + 1;
console.log(number);
let score = 9;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector(".message").textContent = "Enter a number! 🤔";
  } else if (guess === number) {
    document.querySelector(".message").textContent = "Correct Number! 🎉";
    document.querySelector(".number").textContent = number;
  } else if (guess > number) {
    if (score > 0) {
      document.querySelector(".message").textContent = "Too High! 📈";
      document.querySelector(".score").textContent = score--;
    } else {
      document.querySelector(".message").textContent = "You Lost 😓";
      document.querySelector(".score").textContent = 0;
    }
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
