"use strict;";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".open-modal");

//Functions
const close = function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  console.log("modal closed");
};
const open = function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("modal open");
};

//query selector only selects first one when multiple elements have same class
// can use for loop to select individual buttons

//EvenListeners
btnOpenModal.addEventListener("click", open);
btnCloseModal.addEventListener("click", close);
overlay.addEventListener("click", close);
document.addEventListener("keydown", function (e) {
  //console.log(e);
  if (e.key == "Escape" && !modal.classList.contains("hidden")) {
    close();
  }
});
