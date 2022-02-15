"use strict";
const modal = document.querySelectorAll(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".close-modal");
const btnOpenModal = document.querySelectorAll(".open-modal");

//Functions
//EvenListeners
//loops between modals
for (let i = 0; i < btnOpenModal.length; i++) {
  //Declare close function
  const close = function close() {
    modal[i].classList.add("hidden");
    overlay.classList.add("hidden");
    console.log("modal closed");
  };

  //Don't bother to declare you use it like once
  btnOpenModal[i].addEventListener("click", function open() {
    modal[i].classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log("modal open");
  });

  //close button
  btnCloseModal[i].addEventListener("click", close);

  //click overlay
  overlay.addEventListener("click", close);

  //esc key
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "Escape") {
      close();
    }
  });
}
