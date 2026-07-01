const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

let p = 0;

const load = setInterval(() => {

  p += Math.random() * 10;

  percent.textContent = Math.floor(p) + "%";

  if (p >= 100) {
    p = 100;
    clearInterval(load);

    setTimeout(() => {
      loader.style.display = "none";
      app.classList.add("show");
    }, 400);
  }

}, 60);

// simple canvas background (safe)
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw(){
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1,1);

  requestAnimationFrame(draw);
}

draw();
