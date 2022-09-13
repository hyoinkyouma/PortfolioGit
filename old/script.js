"use strict";
const modal = document.querySelectorAll(".modal");
const overlay = document.querySelector(".overlay");
const openModal = document.querySelectorAll(".open-modal");

for (let i = 0; i < openModal.length; i++) {
  openModal[i].addEventListener("click", function () {
    modal[i].classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
  const close = function close() {
    modal[i].classList.add("hidden");
    overlay.classList.add("hidden");
  };
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "Escape") {
      close();
    }
  });
}
