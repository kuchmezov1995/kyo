alert("JS WORKS");
const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

// ===== LOADER =====
const loader = document.getElementById("loader");
const app = document.querySelector(".app");
const percent = document.getElementById("percent");

let p = 0;

const load = setInterval(() => {
  p += Math.random() * 10;

  if (p >= 100) {
    p = 100;
    percent.textContent = "100%";

    clearInterval(load);

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
        app.classList.add("show");
      }, 600);

    }, 300);
  }

  percent.textContent = Math.floor(p) + "%";
}, 80);
// ===== SIMPLE PARTICLES / LIGHT FX =====
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px sans-serif";
  ctx.fillText("CANVAS WORKS", 100, 100);
}

draw();
// ===== CUSTOM CURSOR =====

const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {

  const x = e.clientX;
  const y = e.clientY;

  // основной курсор
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";

  // хвост с задержкой
  setTimeout(() => {
    trail.style.left = x + "px";
    trail.style.top = y + "px";
  }, 60);

});
function randomLightning() {

  const x1 = Math.random() * window.innerWidth;
  const y1 = Math.random() * window.innerHeight;

  const x2 = Math.random() * window.innerWidth;
  const y2 = Math.random() * window.innerHeight;

  drawLightning(x1, y1, x2, y2);

}

setInterval(randomLightning, 4000);
function flash() {
  const f = document.createElement("div");

  f.style.position = "fixed";
  f.style.inset = 0;
  f.style.background = "white";
  f.style.opacity = "0.08";
  f.style.pointerEvents = "none";
  f.style.zIndex = 9999;

  document.body.appendChild(f);

  setTimeout(() => {
    f.remove();
  }, 120);
}

setTimeout(() => {
  flash();
}, 1200);
