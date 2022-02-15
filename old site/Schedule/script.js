"strict";

const modal = document.querySelectorAll(".modal");

//day
const d = new Date();
let day = d.getDay();
let dayToday = "";
switch (day) {
  case 0:
    dayToday = "Sunday";
    break;
  case 1:
    dayToday = "Monday";
    break;
  case 2:
    dayToday = "Tuesday";
    break;
  case 3:
    dayToday = "Wednesday";
    break;
  case 4:
    dayToday = "Thursday";
    break;
  case 5:
    dayToday = "Friday";
    break;
  case 6:
    dayToday = "Saturday";
    break;
}
document.querySelector(".day").textContent = dayToday;

if (dayToday == "Monday" || dayToday == "Wednesday" || dayToday == "Friday") {
  modal[0].classList.remove("hidden");
} else {
  modal[1].classList.remove("hidden");
}

//clock
let session = "";
let hh = 0;
function currentTime() {
  let date = new Date();
  hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();
console.log(session);
console.log(hh);

if (session == "AM" && hh < 12 && hh > 06) {
  document.querySelector(".ph-sun").classList.remove("hidden");
} else if (session == "PM" && hh < 6) {
  document.querySelector(".ph-sun-dim").classList.remove("hidden");
} else if (session == "PM" && hh > 6 && hh < 12) {
  document.querySelector(".ph-moon").classList.remove("hidden");
} else {
  document.querySelector(".ph-sun-horizon").classList.remove("hidden");
}
console.log(session);
console.log(hh);
