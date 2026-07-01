console.log("START");

const loader = document.getElementById("loader");
const app = document.querySelector(".app");

let p = 0;

const interval = setInterval(() => {

  p += 5;

  if (p >= 100) {
    p = 100;
    clearInterval(interval);

    setTimeout(() => {

      loader.style.display = "none";

      app.classList.add("show");

      console.log("APP OPENED");

    }, 400);
  }

}, 60);
