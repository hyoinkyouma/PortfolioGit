"use strict";
//frontend js
//Responsive Nav

const submitAnimation = () => {
  const submitBtn = document.querySelector(".btn-submit");
  const form = document.querySelector("form");

  submitBtn.addEventListener("click", () => {
    form.submit();
    submitBtn.style.animation = "btn-animation 1s ease";
    submitBtn.textContent = "✔";
  });
};

const orderBtns = () => {
  const orderBtn = document.querySelectorAll(".btn-order");
  const orderVal = document.getElementById("cars");
  for (let i = 0; i < orderBtn.length; i++) {
    orderBtn[i].addEventListener("click", () => {
      switch (i) {
        default:
          orderVal.value = "RWD";
          break;
        case 0:
          orderVal.value = "RWD";
          break;
        case 1:
          orderVal.value = "2AWD";
          break;
        case 2:
          orderVal.value = "3AWD";
          break;
      }
    });
  }
};

const navBgOnScroll = () => {
  const nav = document.querySelector(".nav");
  document.addEventListener("scroll", () => {
    if (window.scrollY >= 1920) {
      nav.style.animation = `navSwitch 1s forwards`;
    }
    if (window.scrollY == 0) {
      nav.style.animation = "navSwitch 1s reverse";
    }
  });
};

const navSlide = () => {
  const nav = document.querySelector(".nav-items");
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelectorAll(".nav-items li");
  const logo = document.querySelector(".logo");
  //toggle nav
  const navOpen = () => {
    nav.classList.toggle("nav-active");
    logo.classList.toggle("display-none");
  };

  burger.addEventListener("click", navOpen);

  //animate links
  navLinks.forEach((link, index) => {
    link.style.animation = `navFadeIn .5s ease forwards ${index / 7}s`;
  });
};

const navClose = () => {
  const logo = document.querySelector(".logo");
  const nav = document.querySelector(".nav-items");

  nav.classList.remove("nav-active");
  logo.classList.remove("display-none");
};

const fadeOnScroll = () => {
  const div = document.getElementById("fadeInScroll");
  const image1 = 1000;
  const image2 = 1020;
  const image3 = 1030;
  window.addEventListener("scroll", () => {
    let currentPos = window.pageYOffset;

    for (let i = 0; i < div.children.length; i++) {
      if (currentPos < image1) {
        div.children[0].style.animation = "fadeToLeft 1s ease forwards";
        div.children[1].style.animation = "fadeToLeft 1s ease forwards";
      } else if (currentPos < image2) {
        div.children[3].style.animation = "fadeToRight 1s ease forwards";
        div.children[2].style.animation = "fadeToRight 1s ease forwards";
      } else if (currentPos > image3) {
        div.children[4].style.animation = "fadeUp 1s ease forwards";
      }
    }
  });
};

const app = () => {
  submitAnimation();
  orderBtns();
  navBgOnScroll();
  fadeOnScroll();

  navSlide();
  const div = document.querySelectorAll(".container");
  for (let i = 0; i < div.length; i++) {
    div[i].addEventListener("click", () => {
      navClose();
    });
  }
};

app();
