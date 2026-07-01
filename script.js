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

let stars = [];

for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2
  });
}

function draw() {

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillRect(s.x, s.y, s.r, s.r);
  });

  requestAnimationFrame(draw);
}

draw();
// ===== CURSOR =====
const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
  }, 50);
});
document.addEventListener("mousemove", (e) => {

  const x = (window.innerWidth / 2 - e.clientX) * 0.01;
  const y = (window.innerHeight / 2 - e.clientY) * 0.01;

  const avatar = document.querySelector(".avatar");
  const title = document.querySelector("h1");

  if (avatar) avatar.style.transform = `translate(${x}px, ${y}px)`;
  if (title) title.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
});
setInterval(() => {

  const canvas = document.getElementById("fx");
  const ctx = canvas.getContext("2d");

  const x1 = Math.random() * canvas.width;
  const y1 = Math.random() * canvas.height;

  const x2 = Math.random() * canvas.width;
  const y2 = Math.random() * canvas.height;

  ctx.beginPath();
  ctx.moveTo(x1, y1);

  for (let i = 0; i < 6; i++) {
    const x = x1 + (x2 - x1) * (i / 6) + (Math.random() - 0.5) * 30;
    const y = y1 + (y2 - y1) * (i / 6) + (Math.random() - 0.5) * 30;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  ctx.stroke();

}, 2500);
