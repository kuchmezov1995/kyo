console.log("SYSTEM START");

// ===== LOADER =====
const loader = document.getElementById("loader");
const percent = document.getElementById("percent");
const app = document.querySelector(".app");

let p = 0;

const load = setInterval(() => {

  p += Math.random() * 8;

  if (percent) percent.textContent = Math.floor(p) + "%";

  if (p >= 100) {
    clearInterval(load);

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      if (app) app.classList.add("show");
    }, 300);
  }

}, 60);

// ===== CURSOR =====
const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".trail");

document.addEventListener("mousemove", (e) => {

  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  if (trail) {
    setTimeout(() => {
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    }, 40);
  }

});

// ===== PARALLAX =====
document.addEventListener("mousemove", (e) => {

  const x = (window.innerWidth / 2 - e.clientX) * 0.01;
  const y = (window.innerHeight / 2 - e.clientY) * 0.01;

  const avatar = document.querySelector(".avatar");

  if (avatar) {
    avatar.style.transform = `translate(${x}px, ${y}px)`;
  }

});

// ===== CANVAS =====
const canvas = document.getElementById("fx");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function lightning() {

    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    for (let i = 0; i < 6; i++) {
      const x = x1 + (x2 - x1) * (i / 6) + (Math.random() - 0.5) * 40;
      const y = y1 + (y2 - y1) * (i / 6) + (Math.random() - 0.5) * 40;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "white";
    ctx.shadowBlur = 20;
    ctx.stroke();
  }

  setInterval(lightning, 2500);

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  }

  animate();
}
