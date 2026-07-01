console.log("SCRIPT OK");

// ===== LOADER =====
const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

let p = 0;

const load = setInterval(() => {

  p += 5;

  if (percent) percent.textContent = p + "%";

  if (p >= 100) {
    clearInterval(load);

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      if (app) app.classList.add("show");
    }, 300);
  }

}, 50);

// ===== SAFE CANVAS INIT (НЕ УПАДЁТ НИКОГДА) =====
const canvas = document.getElementById("fx");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
  }

  animate();

} else {
  console.log("NO CANVAS FOUND");
}
