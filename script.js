"use strict";
const modal = document.querySelectorAll(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".close-modal");
const btnOpenModal = document.querySelectorAll(".open-modal");

//Functions

//query selector only selects first one when multiple elements have same class
// can use for loop to select individual buttons

//EvenListeners
for (let i = 0; i < btnOpenModal.length; i++) {
  const close = function close() {
    modal[i].classList.add("hidden");
    overlay.classList.add("hidden");
    console.log("modal closed");
  };
  btnOpenModal[i].addEventListener("click", function open() {
    modal[i].classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log("modal open");
  });

  btnCloseModal[i].addEventListener("click", close);

  overlay.addEventListener("click", close);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "Escape") {
      close();
    }
  });
}
