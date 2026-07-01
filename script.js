console.log("SCRIPT STARTED");

// ===== ELEMENTS =====
const loader = document.getElementById("loader");
const app = document.querySelector(".app");

// ⚠️ защита от null
if (!loader || !app) {
  console.error("Loader or App not found in HTML");
}

// ===== LOADER =====
let p = 0;

const interval = setInterval(() => {

  p += Math.floor(Math.random() * 8);

  if (p >= 100) {
    p = 100;

    clearInterval(interval);

    setTimeout(() => {

      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";

        if (app) {
          app.classList.add("show");
          console.log("APP SHOWN");
        }

      }, 500);

    }, 300);
  }

}, 80);

// ===== CANVAS SAFE INIT =====
const canvas = document.getElementById("fx");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  }

  draw();

} else {
  console.error("Canvas not found");
}
